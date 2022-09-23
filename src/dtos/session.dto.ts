import { IsNumber, IsString, MaxLength, IsOptional } from 'class-validator';

export class CreateSessionDto {
  @MaxLength(150, { message: 'assunto excede o máximo de 150 caracteres' })
  @IsString({ message: 'assunto deve ser do tipo string' })
  subject: string;

  @IsNumber()
  duration: number;

  @IsNumber()
  scheduleId: number;

  @IsNumber()
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
