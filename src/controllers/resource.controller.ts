import { NextFunction, Request, Response } from 'express';
import { CreateResourceDto, UpdateResourceDto, UpdateResourceIdDto } from '@dtos/resource.dto';
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
          resource,
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

      console.log('req', req);
      const resource = await this.resourceService.update({ ...resourceData, id: +resourceId });

      res.status(201).json({
        data: {
          resource,
        },
        message: 'updated',
      });
    } catch (error) {
      next(error);
    }
  };
}

export { ResourceController };
