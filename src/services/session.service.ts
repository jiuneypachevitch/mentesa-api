import { Schedule } from '@prisma/client';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import client from '@/prisma/client';
import { CreateScheduleDto } from '@/dtos/schedule.dto';
import dayjs from 'dayjs';

class ScheduleService {
  public schedule = client.schedule;

  public async findAllSessions(professionalId: number): Promise<Schedule[]> {
    if (isEmpty(professionalId))
      throw new HttpException(400, 'Id do profissional não foi informado');

    const allSchedules: Schedule[] = await this.schedule.findMany({
      where: {
        professionalId,
      },
      include: {
        PatientsSchedule: {
          where: {
            Patient: {
              professionalId,
            },
          },
          include: {
            Patient: true,
          },
        },
      },
    });

    return allSchedules;
  }

  public async findScheduleById(
    scheduleId: number,
    professionalId: number
  ): Promise<Schedule> {
    if (isEmpty(scheduleId))
      throw new HttpException(400, 'Id do agendamento não foi informado');

    if (isEmpty(professionalId))
      throw new HttpException(400, 'Id do profissional não foi informado');

    const findSchedule = await this.schedule.findFirst({
      where: {
        AND: [
          {
            id: scheduleId,
          },
          { professionalId },
        ],
      },
      include: {
        PatientsSchedule: {
          where: {
            Patient: {
              professionalId,
            },
          },
          include: {
            Patient: true,
          },
        },
      },
    });

    if (!findSchedule) throw new HttpException(409, 'Agendamento inexistente');

    return findSchedule;
  }

  public async create(
    scheduleData: CreateScheduleDto,
    professionalId: number
  ): Promise<Schedule> {
    if (isEmpty(scheduleData))
      throw new HttpException(400, 'Nenhum dado foi informado');

    if (isEmpty(professionalId))
      throw new HttpException(400, 'Id do profissional não foi informado');

    const createPatientlData: Promise<Schedule> = this.schedule.create({
      data: {
        sessionDate: new Date(scheduleData.sessionDate),
        status: scheduleData.status,
        type: scheduleData.type,
        scheduleType: scheduleData.scheduleType,
        Professional: {
          connect: {
            id: professionalId,
          },
        },
        PatientsSchedule: {
          createMany: {
            data: scheduleData.patientsSchedule,
          },
        },
      },
    });

    return createPatientlData;
  }

  public async updateSchedule(
    scheduleId: number,
    professionalId: number,
    scheduleData: CreateScheduleDto
  ): Promise<Schedule> {
    if (isEmpty(scheduleData))
      throw new HttpException(400, 'Nenhum dado foi informado');

    if (isEmpty(professionalId))
      throw new HttpException(400, 'Id do profissional não foi informado');

    const findSchedule = await this.schedule.findFirst({
      where: {
        AND: [
          {
            id: scheduleId,
          },
          { professionalId },
        ],
      },
    });

    if (!findSchedule) throw new HttpException(409, 'Agendamento inexistente');

    const updateSchedule = await this.schedule.update({
      where: { id: scheduleId },
      data: {
        sessionDate: new Date(scheduleData.sessionDate),
        status: scheduleData.status,
        type: scheduleData.type,
        scheduleType: scheduleData.scheduleType,
        Professional: {
          connect: {
            id: professionalId,
          },
        },
        PatientsSchedule: {
          deleteMany: {
            scheduleId,
          },
          createMany: {
            data: scheduleData.patientsSchedule,
          },
        },
      },
    });

    return updateSchedule;
  }

  public async deletePatient(
    scheduleId: number,
    professionalId: number
  ): Promise<Schedule> {
    if (isEmpty(scheduleId))
      throw new HttpException(400, 'Id do paciente não foi informado');

    if (isEmpty(professionalId))
      throw new HttpException(400, 'Id do profissional não foi informado');

    const findSchedule = await this.schedule.findFirst({
      where: {
        AND: [
          {
            id: scheduleId,
          },
          { professionalId },
        ],
      },
    });

    if (!findSchedule) throw new HttpException(409, 'Agendamento inexistente');

    const deleteScheduleData = await this.schedule.delete({
      where: { id: scheduleId },
    });

    return deleteScheduleData;
  }
}

export { ScheduleService };
