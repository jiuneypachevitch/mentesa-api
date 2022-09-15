import { Router, Request } from 'express';
import { CreateResourceDto, UpdateResourceDto } from '@dtos/resource.dto';
import { ResourceController } from '@/controllers/resource.controller';
import { Routes } from '@/interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class ResourceRoute implements Routes {
  public path = '/resources';
  public router = Router();
  public resourceController = new ResourceController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.route(`${this.path}`)
        .get(this.resourceController.list)
        .post(
            validationMiddleware(CreateResourceDto, 'body'),
            this.resourceController.create
        );
    this.router.route(`${this.path}/:resourceId`)
        .get(this.resourceController.get)
        .patch(
            validationMiddleware(UpdateResourceDto, 'body'),
            this.resourceController.update
        )
        .delete(this.resourceController.delete);
  }
}

export { ResourceRoute };
