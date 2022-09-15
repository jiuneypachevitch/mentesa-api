import { IsNumber, IsString, IsEmail, MaxLength, Length, IsOptional } from 'class-validator';

export class CreateResourceDto {
    @MaxLength(150, { message: 'título excede o máximo de 150 caracteres'})
    @IsString({ message: 'título deve ser do tipo string' })
    title: string;

    @MaxLength(30, { message: 'categoria excede o máximo de 30 caracteres'})
    @IsString({ message: 'categoria deve ser do tipo string' })
    category: string;
}

export class UpdateResourceDto extends CreateResourceDto {
    @IsOptional()
    title?: string;
    @IsOptional()
    category?: string;
}

export class UpdateResourceIdDto extends UpdateResourceDto {
    @IsNumber()
    id: number;
}

export class DeleteResourceIdDto {
    @IsNumber()
    id: number;
}
