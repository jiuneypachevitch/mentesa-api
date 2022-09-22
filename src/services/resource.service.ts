import { CreateResourceDto, UpdateResourceDto } from "@dtos/resource.dto";
import { HttpException } from "@exceptions/HttpException";
import { PrismaException } from "@exceptions/PrismaException";
import { isEmpty } from "@utils/util";
import client from "@/prisma/client";
import { Resource } from "@prisma/client";

class ResourceService {
  private resource = client.resource;

  public create = async (
    resourceData: CreateResourceDto,
    professionalId: number
  ): Promise<Resource> => {
    if (isEmpty(resourceData))
      throw new HttpException(400, "Nenhum dado foi informado");
    try {
      const createResourceData = await this.resource.create({
        data: {
          title: resourceData.title,
          category: resourceData.category,
          professionalId,
        },
      });
      return createResourceData;
    } catch (error) {
      throw new PrismaException(error, "Recurso");
    }
  };

  public update = async (
    resourceData: UpdateResourceDto,
    id: number,
    professionalId: number
  ): Promise<number> => {
    if (isEmpty(resourceData))
      throw new HttpException(400, "Nenhum dado foi informado");

    try {
      const updateResourceData = await this.resource.update({
        where: {
          id_professionalId: {
            id,
            professionalId,
          },
        },
        data: {
          ...resourceData,
        },
      });
      return updateResourceData;
    } catch (error) {
      throw new PrismaException(error, "Recurso");
    }
  };

  public listAll = async (professionalId: number): Promise<Resource>[] => {
    try {
      const listResourceData = await this.resource.findMany({
        where: {
          professionalId,
        },
      });
      return listResourceData;
    } catch (error) {
      throw new PrismaException(error, "Recurso");
    }
  };

  public getOne = async (
    id: number,
    professionalId: number
  ): Promise<Resource> => {
    try {
      const resourceData = await this.resource.findUnique({
        where: {
          id_professionalId: {
            id,
            professionalId,
          },
        },
      });

      return resourceData;
    } catch (error) {
      throw new PrismaException(error, "Recurso");
    }
  };

  public delete = async (
    id: number,
    professionalId: number
  ): Promise<Resource> => {
    try {
      const resourceData = await this.resource.delete({
        where: {
          id_professionalId: {
            id,
            professionalId,
          },
        },
      });
      return resourceData;
    } catch (error) {
      throw new PrismaException(error, "Recurso");
    }
  };
}

export { ResourceService };
