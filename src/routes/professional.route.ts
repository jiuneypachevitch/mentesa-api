import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { ProfessionalController } from '@/controllers/professional.controller';
import { UpdateProfessionalDto } from '@/dtos/professional.dto';
import authMiddleware from '@/middlewares/auth.middleware';
import validationMiddleware from '@middlewares/validation.middleware';

class ProfessionalRoute implements Routes {
  public path = '/professionals';
  public router = Router();
  public professionalController = new ProfessionalController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}/:id(\\d+)`,
      authMiddleware,
      this.professionalController.getProfessionalById
    );
    this.router.put(
      `${this.path}/:id(\\d+)`,
      authMiddleware,
      validationMiddleware(UpdateProfessionalDto, 'body', true),
      this.professionalController.updateProfessional
    );
    this.router.get(
      `${this.path}/profile`,
      authMiddleware,
      this.professionalController.getProfessionalProfile
    );
    this.router.put(
      `${this.path}/profile`,
      authMiddleware,
      validationMiddleware(UpdateProfessionalDto, 'body', true),
      this.professionalController.setProfessionalProfile
    );
  }
}

export { ProfessionalRoute };
