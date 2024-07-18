import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateContactDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsOptional()
    @IsString()
    info?: string;
}
