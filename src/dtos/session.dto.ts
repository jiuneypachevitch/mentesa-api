import {
  IsNumber,
  IsString,
  IsEmail,
  MaxLength,
  Length,
  IsOptional,
} from "class-validator";


export class CreateSessionDto {
  @MaxLength(150, { message: "assunto excede o máximo de 150 caracteres" })
  @IsString({ message: "assunto deve ser do tipo string" })
  subject: string;

  @IsNumber({ message: "duração deve ser do tipo inteiro" })
  duration: number;

  @IsNumber({ message: "Id do agendamento deve ser do tipo inteiro" })
  scheduleId: number;

  @IsNumber({ message: "Id do recurso deve ser do tipo inteiro" })
  resourceId: number;
}


export class UpdateSessionDto extends CreateSessionDto {
  @IsOptional()
  subject: string;
  @IsOptional()
  duration: number;
  @IsOptional()
  scheduleId: number;
  @IsOptional()
  resourceId: number;
}

