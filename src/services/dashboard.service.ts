import { HttpException } from "@/exceptions/HttpException";
import client from "@/prisma/client";
import { Patient, Schedule, User } from "@prisma/client";

interface IDashboard {
  schedulePerDay: number;
  schedulePerMonth: number;
  scheduleCanceledPerMonth: number;
  totalPatientsNumber: number;
  totalIndividualSchedule: number;
  totalCoupleSchedule: number;
  totalGroupSchedule: number;
}

class DashboardService {
  public async findDashboardInfo(
    userId: number,
    admin: boolean
  ): Promise<IDashboard> {
    if (!userId) throw new HttpException(400, "Usuário não informado");

    const schedules = client.schedule;
    const patients = client.patient;

    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    if (admin) {
      const allSchedules: Schedule[] = await schedules.findMany({
        where: {
          professionalId: userId,
          sessionDate: {
            lte: firstDay,
            gte: lastDay,
          },
        },
      });

      const allPatients: Patient[] = await patients.findMany({
        where: {
          professionalId: userId,
        },
      });

      const schedulePerDay = allSchedules.filter((schedule) => {
        const date = new Date();
        const sessionDate = new Date(schedule.sessionDate);
        if (date === sessionDate) return true;
      }).length;

      const scheduleCanceledPerMonth = allSchedules.filter((schedule) => {
        const sessionDate = new Date(schedule.sessionDate);
        const sessionYear = sessionDate.getFullYear();
        const sessionMonth = sessionDate.getMonth() + 1;

        if (
          year === sessionYear &&
          month === sessionMonth &&
          schedule.status === "CANCELED"
        ) {
          return true;
        }
      }).length;

      const totalIndividualSchedule = allSchedules.filter((schedule) => {
        schedule.scheduleType === "INDIVIDUAL";
      }).length;

      const totalCoupleSchedule = allSchedules.filter((schedule) => {
        schedule.scheduleType === "COUPLE";
      }).length;

      const totalGroupSchedule = allSchedules.filter((schedule) => {
        schedule.scheduleType === "IN_GROUP";
      }).length;

      const result = {
        schedulePerDay: schedulePerDay,
        schedulePerMonth: allSchedules.length,
        scheduleCanceledPerMonth: scheduleCanceledPerMonth,
        totalPatientsNumber: allPatients.length,
        totalIndividualSchedule: totalIndividualSchedule,
        totalCoupleSchedule: totalCoupleSchedule,
        totalGroupSchedule: totalGroupSchedule,
      };

      return result;
    }
    {
      const allSchedules: Schedule[] = await schedules.findMany({
        where: {
          sessionDate: {
            lte: firstDay,
            gte: lastDay,
          },
        },
        include: {
          PatientsSchedule: {
            where: {
              patientId: userId,
            },
          },
        },
      });

      const schedulePerDay = allSchedules.filter((schedule) => {
        const date = new Date();
        const sessionDate = new Date(schedule.sessionDate);
        if (date === sessionDate) return true;
      }).length;

      const scheduleCanceledPerMonth = allSchedules.filter((schedule) => {
        const sessionDate = new Date(schedule.sessionDate);
        const sessionYear = sessionDate.getFullYear();
        const sessionMonth = sessionDate.getMonth() + 1;

        if (
          year === sessionYear &&
          month === sessionMonth &&
          schedule.status === "CANCELED"
        ) {
          return true;
        }
      }).length;

      const totalIndividualSchedule = allSchedules.filter((schedule) => {
        schedule.scheduleType === "INDIVIDUAL";
      }).length;

      const totalCoupleSchedule = allSchedules.filter((schedule) => {
        schedule.scheduleType === "COUPLE";
      }).length;

      const totalGroupSchedule = allSchedules.filter((schedule) => {
        schedule.scheduleType === "IN_GROUP";
      }).length;

      const result = {
        schedulePerDay: schedulePerDay,
        schedulePerMonth: allSchedules.length,
        scheduleCanceledPerMonth: scheduleCanceledPerMonth,
        totalPatientsNumber: 0,
        totalIndividualSchedule: totalIndividualSchedule,
        totalCoupleSchedule: totalCoupleSchedule,
        totalGroupSchedule: totalGroupSchedule,
      };

      return result;
    }
  }
}

export { DashboardService };
