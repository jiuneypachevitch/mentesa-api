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
    /* POST /resources */
    this.router.route(`${this.path}`).post(
        validationMiddleware(CreateResourceDto, 'body'),
        this.resourceController.create
    );
    /* GET /resources/list */    
    this.router.route(`${this.path}/list`).get(this.resourceController.listAll);
    /* PATCH /resources/update/{id} */    
    this.router.route(`${this.path}/update/:id(\\d+)`).patch(
        validationMiddleware(UpdateResourceDto, 'body'),
        this.resourceController.update
    )
    /* PATCH /resources/get/{id} */    
    this.router.route(`${this.path}/get/:id(\\d+)`).get(this.resourceController.getOne);
    /* PATCH /resources/remove/{id} */    
    this.router.route(`${this.path}/remove/:id(\\d+)`).delete(this.resourceController.delete);
  }
}

export { ResourceRoute };
