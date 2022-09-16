import { Gender } from '@prisma/client';
import {
  IsString,
  Length,
  MaxLength,
  IsDateString,
  IsBoolean,
  IsOptional,
  IsEmail,
} from 'class-validator';

export class CreatePatientDto {
  @IsString()
  @Length(3, 150)
  public name: string;

  @IsString()
  @Length(11, 14)
  public cpf: string;

  @IsEmail({}, { message: 'email é inválido' })
  @MaxLength(100, { message: 'email excede o máximo de 100 caracteres' })
  public email: string;

  @IsString()
  @Length(11, 15)
  public cellphone: string;

  @IsString()
  public gender: Gender;

  @IsDateString()
  public birthDate: Date;

  @IsBoolean()
  @IsOptional()
  public active: boolean;
}
