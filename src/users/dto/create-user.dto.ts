import {
    IsNotEmpty,
    IsString,
    IsOptional,
    IsNumber,
    IsEnum,
} from 'class-validator';
import { UserType } from 'src/common/types/enums';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsEnum(UserType)
    @IsNotEmpty()
    type: UserType;

    @IsString()
    @IsNotEmpty()
    photo: string;

    @IsString()
    @IsNotEmpty()
    subject: string;

    @IsNumber()
    @IsOptional()
    students_count?: number;

    @IsNumber()
    @IsNotEmpty()
    experience: number;
}
