import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { ScheduleController } from '@/controllers/schedule.controller';
import authMiddleware from '@/middlewares/auth.middleware';

class ScheduleRoute implements Routes {
  public path = '/schedules';
  public router = Router();
  public scheduleController = new ScheduleController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}`,
      authMiddleware,
      this.scheduleController.getPatients
    );
    // this.router.get(
    //   `${this.path}/:id(\\d+)`,
    //   authMiddleware,
    //   this.patientController.getPatientById
    // );
    // this.router.post(
    //   `${this.path}`,
    //   authMiddleware,
    //   validationMiddleware(CreatePatientDto, 'body'),
    //   this.patientController.createPatient
    // );
    // this.router.put(
    //   `${this.path}/:id(\\d+)`,
    //   authMiddleware,
    //   validationMiddleware(CreatePatientDto, 'body', true),
    //   this.patientController.updatePatient
    // );
    // this.router.delete(
    //   `${this.path}/:id(\\d+)`,
    //   authMiddleware,
    //   this.patientController.deletePatient
    // );
  }
}

export { ScheduleRoute };
