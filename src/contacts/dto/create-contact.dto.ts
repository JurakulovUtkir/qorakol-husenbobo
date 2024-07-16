import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateContactDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsNumber()
    @IsOptional()
    info?: string;
}
