import { IsEmail, IsString, Length, MaxLength } from 'class-validator';

export class UpdateProfessionalDto {
  @IsString()
  @Length(3, 150, { message: 'nome deve conter de 3 a 150 dígitos' })
  public name: string;

  @IsString()
  @Length(1, 20, { message: 'crp deve conter de 1 a 20 dígitos' })
  public crp: string;

  @IsString()
  @Length(11, 15, { message: 'telefone deve conter de 11 a 15 dígitos' })
  public cellphone: string;

  @IsString()
  @Length(3, 20, { message: 'abordagem deve conter de 3 a 20 caracteres' })
  public approach: string;

  @IsEmail({}, { message: 'email é inválido' })
  @MaxLength(100, { message: 'email excede o máximo de 100 caracteres' })
  public email: string;
}

