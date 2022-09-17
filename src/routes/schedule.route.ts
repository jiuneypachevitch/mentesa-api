import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { ScheduleController } from '@/controllers/schedule.controller';
import authMiddleware from '@/middlewares/auth.middleware';
import { CreateScheduleDto } from '@/dtos/schedule.dto';
import validationMiddleware from '@/middlewares/validation.middleware';

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
      this.scheduleController.getSchedules
    );
    this.router.get(
      `${this.path}/:id(\\d+)`,
      authMiddleware,
      this.scheduleController.getScheduleById
    );
    this.router.post(
      `${this.path}`,
      authMiddleware,
      validationMiddleware(CreateScheduleDto, 'body'),
      this.scheduleController.createPatient
    );
    this.router.put(
      `${this.path}/:id(\\d+)`,
      authMiddleware,
      validationMiddleware(CreateScheduleDto, 'body', true),
      this.scheduleController.updateSchedule
    );
    this.router.delete(
      `${this.path}/:id(\\d+)`,
      authMiddleware,
      this.scheduleController.deleteSchedule
    );
  }
}

export { ScheduleRoute };
