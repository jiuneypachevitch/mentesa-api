import { hash } from 'bcrypt';
import { CreateResourceDto, UpdateResourceIdDto, DeleteResourceIdDto, GetResourceIdDto }from '@dtos/resource.dto';
import { HttpException } from '@exceptions/HttpException';
import { PrismaException } from '@exceptions/PrismaException';
import { isEmpty } from '@utils/util';
import client from '@/prisma/client';
import { omit } from 'lodash';

class ResourceService {
  private resource = client.resource;  
  public create = async (resourceData: CreateResourceDto) => {
    if (isEmpty(resourceData))
        throw new HttpException(400, 'Nenhum dado foi informado');
    try {
        const createResourceData = await this.resource.create({
            data: {
                title: resourceData.title,
                category: resourceData.category,
            },
        });
        return createResourceData;
    } catch (error) {
        throw new PrismaException(error, 'Recurso');
    }
  };

  public update = async (resourceData: UpdateResourceIdDto) => {
    if (isEmpty(resourceData))
        throw new HttpException(400, 'Nenhum dado foi informado');
    
    const updateFields = omit(resourceData, 'id');
    try {
        const updateResourceData = await this.resource.update({
            data: {
                ...updateFields
            },
            where: {
                id: resourceData.id
            }
        });

        return updateResourceData;
    } catch (error) {
        throw new PrismaException(error, 'Recurso');
    }
  };

  public list = async () => {
    try {
        const listResourceData = await this.resource.findMany({
            select: {
                id: true,
                title: true,
                category: true,
            }
        });

        return listResourceData;
    } catch (error) {
        throw new PrismaException(error, 'Recurso');
    }
  };

  public get = async (resourceId: GetResourceIdDto) => {
    try {
        const resourceData = await this.resource.findUnique({
            where: {
                id: resourceId.id
            },
            select: {
                id: true,
                title: true,
                category: true,
            }
        });

        return resourceData;
    } catch (error) {
        throw new PrismaException(error, 'Recurso');
    }
  };

  public delete = async (resourceId: DeleteResourceIdDto) => {
    try {
        const updateResourceData = await this.resource.delete({
            where: {
                id: resourceId.id
            }
        });
    } catch (error) {
        throw new PrismaException(error, 'Recurso');
    }
  };
}

export { ResourceService };
