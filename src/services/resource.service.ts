import { hash } from 'bcrypt';
import { CreateResourceDto, UpdateResourceIdDto, DeleteResourceIdDto, GetResourceIdDto, ListResourceProfessionalIdDto }from '@dtos/resource.dto';
import { HttpException } from '@exceptions/HttpException';
import { PrismaException } from '@exceptions/PrismaException';
import { isEmpty } from '@utils/util';
import client from '@/prisma/client';
import { omit } from 'lodash';

class ResourceService {
  private resource = client.resource;  

  public create = async (resourceData: CreateResourceDto, professionalId: number) => {
    if (isEmpty(resourceData))
        throw new HttpException(400, 'Nenhum dado foi informado');
    try {
        const createResourceData = await this.resource.create({
            data: {
                title: resourceData.title,
                category: resourceData.category,
                professionalId
            },
        });
        return createResourceData;
    } catch (error) {
        throw new PrismaException(error, 'Recurso');
    }
  };

  public update = async (resourceData: UpdateResourceIdDto, professionalId: number) => {
    if (isEmpty(resourceData))
        throw new HttpException(400, 'Nenhum dado foi informado');
    
    const updateFields = omit(resourceData, 'id');
    try {
        const updateResourceData = await this.resource.updateMany({
            data: {
                ...updateFields
            },
            where: {
                AND: [
                    { id: resourceData.id },
                    { professionalId },
                ],
            }
        });

        return updateResourceData;
    } catch (error) {
        throw new PrismaException(error, 'Recurso');
    }
  };

  public listAll = async (professionalId: number) => {
    try {
        const listResourceData = await this.resource.findMany({
            where: {
                professionalId
            },
            select: {
                id: true,
                title: true,
                category: true,
            }
        });
        return listResourceData;
    } catch (error) {
        console.log(error);
        throw new PrismaException(error, 'Recurso');
    }
  };

  public getOne = async (resourceId: GetResourceIdDto, professionalId: number) => {
    try {
        const resourceData = await this.resource.findFirst({
            where: {
                AND: [
                    { id: resourceId.id },
                    { professionalId },
                ],
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

  public delete = async (resourceId: DeleteResourceIdDto, professionalId: number) => {
    try {
        const updateResourceData = await this.resource.deleteMany({
            where: {
                AND: [
                    { id: resourceId.id },
                    { professionalId },
                ],
            }
        });
    } catch (error) {
        throw new PrismaException(error, 'Recurso');
    }
  };
}

export { ResourceService };
