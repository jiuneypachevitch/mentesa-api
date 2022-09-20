import { NextFunction, Response } from 'express';
import { Role, Schedule } from '@prisma/client';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { ScheduleService } from '@/services/schedule.service';
import { CreateScheduleDto } from '@/dtos/schedule.dto';

class ScheduleController {
  public scheduleService = new ScheduleService();

  public getSchedules = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const filterId =
        req.user.role === Role.ADMIN ? req.professional.id : req.patient.id;

      const findAllSchedulesData: Schedule[] =
        await this.scheduleService.findAllSchedules(filterId);

      res.status(200).json({ data: findAllSchedulesData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getScheduleById = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const scheduleId = Number(req.params.id);
      const professionalId = req.professional.id;
      const findOnePatientData: Schedule =
        await this.scheduleService.findScheduleById(scheduleId, professionalId);

      res.status(200).json({ data: findOnePatientData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createPatient = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const scheduleData: CreateScheduleDto = req.body;
      const professionalId = req.professional.id;
      const updateScheduleData = await this.scheduleService.create(
        scheduleData,
        professionalId
      );

      res.status(200).json({ data: updateScheduleData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateSchedule = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const scheduleId = Number(req.params.id);
      const professionalId = req.professional.id;
      const scheduleData: CreateScheduleDto = req.body;
      const updatePatientData: Schedule =
        await this.scheduleService.updateSchedule(
          scheduleId,
          professionalId,
          scheduleData
        );

      res.status(200).json({ data: updatePatientData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteSchedule = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const scheduleId = Number(req.params.id);
      const professionalId = req.professional.id;
      const deleteScheduleData: Schedule =
        await this.scheduleService.deletePatient(scheduleId, professionalId);

      res.status(200).json({ data: deleteScheduleData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export { ScheduleController };
