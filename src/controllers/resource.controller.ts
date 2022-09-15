import { NextFunction, Request, Response } from 'express';
import { CreateResourceDto, UpdateResourceDto } from '@dtos/resource.dto';
import { ResourceService } from '@services/resource.service';
import { HttpException } from '@exceptions/HttpException';

class ResourceController {
    public resourceService = new ResourceService();

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const resourceData: CreateResourceDto = req.body;
      const resource = await this.resourceService.create(resourceData);

      res.status(201).json({
        data: {
          ...resource,
        },
        message: 'created',
      });
    } catch (error) {
      next(error);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const resourceData: UpdateResourceDto = req.body;
      const { resourceId } = req.params;
      const resource = await this.resourceService.update({ ...resourceData, id: +resourceId });

      res.status(202).json({
        data: {
          ...resource,
        },
        message: 'updated',
      });
    } catch (error) {
      next(error);
    }
  };

  public list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const resourceList = await this.resourceService.list();

      res.status(200).json({
        data: {
          ...resourceList,
        },
        message: 'listed',
      });
    } catch (error) {
      next(error);
    }
  };

  public get = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { resourceId } = req.params;
      const resource = await this.resourceService.get({ id: +resourceId });
      const result = resource ? { data: { ...resource }, message: 'listed'} : { message: 'Recurso não encontrado'};
      res.status(200).json(result);
      /*res.status(200).json({
        data: {
          resource,
        },
        message: 'listed',
      });*/
    } catch (error) {
      next(error);
    }
  };

  public delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { resourceId } = req.params;
      const resource = await this.resourceService.delete({ id: +resourceId });

      res.status(202).json({
          message: 'deleted'
      });
    } catch (error) {
      next(error);
    }
  };
}

export { ResourceController };
