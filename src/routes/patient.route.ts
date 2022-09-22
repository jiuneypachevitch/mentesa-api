import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { PatientController } from '@/controllers/patient.controller';
import { CreatePatientDto } from '@/dtos/patient.dto';
import validationMiddleware from '@middlewares/validation.middleware';
import authMiddleware from '@/middlewares/auth.middleware';

class PatientRoute implements Routes {
  public path = '/patients';
  public router = Router();
  public patientController = new PatientController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}`,
      authMiddleware,
      this.patientController.getPatients
    );
    this.router.get(
      `${this.path}/:id(\\d+)`,
      authMiddleware,
      this.patientController.getPatientById
    );
    this.router.post(
      `${this.path}`,
      authMiddleware,
      validationMiddleware(CreatePatientDto, 'body'),
      this.patientController.createPatient
    );
    this.router.put(
      `${this.path}/:id(\\d+)`,
      authMiddleware,
      validationMiddleware(CreatePatientDto, 'body', true),
      this.patientController.updatePatient
    );
    this.router.delete(
      `${this.path}/:id(\\d+)`,
      authMiddleware,
      this.patientController.deletePatient
    );
    this.router.get(
      `${this.path}/profile`,
      authMiddleware,
      this.patientController.getPatientProfile
    );
    this.router.put(
      `${this.path}/profile`,
      authMiddleware,
      validationMiddleware(CreatePatientDto, 'body', true),
      this.patientController.setPatientProfile
    );
  }
}

export { PatientRoute };
