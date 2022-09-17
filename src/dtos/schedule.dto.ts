import { PatientsSchedule, ScheduleType, Status, Type } from '@prisma/client';
import { IsString, IsDateString, IsArray } from 'class-validator';

export class CreateScheduleDto {
  @IsDateString()
  public sessionDate: Date;

  @IsString()
  public status: Status;

  @IsString()
  public type: Type;

  @IsString()
  public scheduleType: ScheduleType;

  @IsArray()
  patientsSchedule: PatientsSchedule[];
}
