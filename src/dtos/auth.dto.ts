import { IsString, IsEmail, MaxLength, Length } from 'class-validator';

export class RefreshTokenDto {
  @IsString({ message: 'refresh token deve ser do tipo string' })
  public refresh_token: string;
}

export class ForgotPasswordDto {
  @IsEmail({}, { message: 'email é inválido' })
  @MaxLength(100, { message: 'email excede o máximo de 100 caracteres' })
  public email: string;
}

export class LoginDto extends ForgotPasswordDto {
  @IsString({ message: 'senha deve ser do tipo string' })
  @Length(8, 20, { message: 'senha deve conter entre 8 e 20 caracteres' })
  public password: string;
}
