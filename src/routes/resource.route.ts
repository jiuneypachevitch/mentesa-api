import { Router, Request } from 'express';
import { CreateResourceDto, UpdateResourceDto } from '@dtos/resource.dto';
import { ResourceController } from '@/controllers/resource.controller';
import { Routes } from '@/interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import authMiddleware from '@/middlewares/auth.middleware';

class ResourceRoute implements Routes {
  public path = '/resources';
  public router = Router();
  public resourceController = new ResourceController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.route(`${this.path}`)
        .post(
            authMiddleware,
            validationMiddleware(CreateResourceDto, 'body'),
            this.resourceController.create
        )
        .get(
            authMiddleware,
            this.resourceController.listAll
        );
    this.router.route(`${this.path}/:id(\\d+)`)
        .patch(
            authMiddleware,
            validationMiddleware(UpdateResourceDto, 'body'),
            this.resourceController.update
        )
        .get(
            authMiddleware,
            this.resourceController.getOne
        )
        .delete(
            authMiddleware,
            this.resourceController.delete
        );
  }
}

export { ResourceRoute };
