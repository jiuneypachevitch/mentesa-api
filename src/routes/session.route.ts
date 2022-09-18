import { Router, Request } from 'express';
import { CreateSessionDto, UpdateSessionDto } from '@dtos/session.dto';
import { SessionController } from '@/controllers/session.controller';
import { Routes } from '@/interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import authMiddleware from '@/middlewares/auth.middleware';

class SessionRoute implements Routes {
  public path = '/sessions';
  public router = Router();
  public sessionController = new SessionController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.route(`${this.path}`)
        .post(
            authMiddleware,
            validationMiddleware(CreateSessionDto, 'body'),
            this.sessionController.create
        )
        .get(
            authMiddleware,
            this.sessionController.listAll
        );
    this.router.route(`${this.path}/:id(\\d+)`)
        .patch(
            authMiddleware,
            validationMiddleware(UpdateSessionDto, 'body'),
            this.sessionController.update
        )
        .get(
            authMiddleware,
            this.sessionController.getOne
        )
        .delete(
            authMiddleware,
            this.sessionController.delete
        );
  }
}

export { SessionRoute };
