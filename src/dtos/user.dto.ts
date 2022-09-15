import { IsString, IsEmail, MaxLength, Length, IsIn } from 'class-validator';

export class UpdateUserDto {
  @IsString({ message: 'senha deve ser do tipo string' })
  @Length(8, 20, { message: 'senha deve conter entre 8 e 20 caracteres' })
  public password: string;
}

export class CreateUserDto extends UpdateUserDto {
  @IsString({ message: 'nome deve ser do tipo string' })
  @Length(3, 150)
  public name: string;
  @IsEmail({}, { message: 'email é inválido' })
  @MaxLength(100, { message: 'email excede o máximo de 100 caracteres' })
  public email: string;
}
