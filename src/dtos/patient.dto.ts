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
  @Length(3, 150, { message: 'nome deve conter de 3 a 150 dígitos' })
  public name: string;

  @IsString()
  @Length(11, 14, { message: 'cpf deve conter de 11 a 14 dígitos' })
  public cpf: string;

  @IsEmail({}, { message: 'email é inválido' })
  @MaxLength(100, { message: 'email excede o máximo de 100 caracteres' })
  public email: string;

  @IsString()
  @Length(11, 15, { message: 'cpf deve conter de 11 a 15 dígitos' })
  public cellphone: string;

  @IsString()
  public gender: Gender;

  @IsDateString()
  public birthDate: Date;

  @IsBoolean()
  @IsOptional()
  public active: boolean;
}
