import { NextFunction, Request, Response } from 'express';
import { CreateResourceDto, UpdateResourceDto } from '@dtos/resource.dto';
import { ResourceService } from '@services/resource.service';
import { HttpException } from '@exceptions/HttpException';

class ResourceController {
    public resourceService = new ResourceService();

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const resourceData: CreateResourceDto = req.body;
      const resource = await this.resourceService.create(resourceData, req.professional.id);

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
      const { id } = req.params;
      const resource = await this.resourceService.update(resourceData, +id, req.professional.id);

      res.status(200).json(
        { data: { ...resource }, message: 'updated' }
      );
    } catch (error) {
      next(error);
    }
  };

  public listAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const resourceList = await this.resourceService.listAll(req.professional.id);

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

  public getOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const resource = await this.resourceService.getOne(+id, req.professional.id);
      
      res.status(200).json(resource ? { data: { ...resource }, message: 'listed'} : { message: 'Recurso não encontrado'});
    } catch (error) {
      next(error);
    }
  };

  public delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const resource = await this.resourceService.delete(+id, req.professional.id);

      res.status(200).json(resource ? { message: 'deleted' } : { message: 'Recurso não encontrado' });
    } catch (error) {
      next(error);
    }
  };
}

export { ResourceController };
