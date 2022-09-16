import { IsString, Length } from 'class-validator';

export class UpdateProfessionalDto {
  @IsString()
  @Length(3, 150)
  public name: string;

  @IsString()
  @Length(1, 20)
  public crp: string;

  @IsString()
  @Length(11, 15)
  public cellphone: string;

  @IsString()
  @Length(3, 20)
  public approach: string;
}
