import { hash } from 'bcrypt';
import { CreateResourceDto, UpdateResourceIdDto } from '@dtos/resource.dto';
import { HttpException } from '@exceptions/HttpException';
import { PrismaException } from '@exceptions/PrismaException';
import { isEmpty } from '@utils/util';
import client from '@/prisma/client';
import { omit } from 'lodash';

class ResourceService {
  public create = async (resourceData: CreateResourceDto) => {
    if (isEmpty(resourceData))
        throw new HttpException(400, 'Nenhum dado foi informado');
    const findResource = await client.resource.findFirst({ where: { AND: [{title: resourceData.title }, { category: resourceData.category }] } });
    if (findResource) throw new HttpException(409, `O recurso '${resourceData.title}' da categoria '${resourceData.category}' já está cadastrado`);
    try {
        const createResourceData = await client.resource.create({
            data: {
                title: resourceData.title,
                category: resourceData.category,
            },
        });
        return createResourceData;
    } catch (error) {
        throw new HttpException(error, 'recursoss');
    }

  };

  public update = async (resourceData: UpdateResourceIdDto) => {
    if (isEmpty(resourceData))
        throw new HttpException(400, 'Nenhum dado foi informado');
    
    const updateFields = omit(resourceData, 'id');
    const findResource = await client.resource.findUnique({ where: { id: resourceData.id } });
    const { title, category } = updateFields;

    if (findResource) throw new HttpException(409, `O recurso '${resourceData.title}' da categoria '${resourceData.category}' já está cadastrado`);
    
    const updateResourceData = await client.resource.update({
        data: {
            ...updateFields
        },
        where: {
            id: resourceData.id
        }
    });

    return updateResourceData;
  };
}

export { ResourceService };
