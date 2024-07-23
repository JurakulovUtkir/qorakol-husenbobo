import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { UserType } from 'src/common/types/enums';

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    phone: string;

    @IsOptional()
    @IsString()
    description: string;

    @IsOptional()
    @IsEnum(UserType)
    type: UserType;

    @IsOptional()
    @IsString()
    photo: string;

    @IsOptional()
    @IsString()
    subject: string;

    @IsOptional()
    @IsNumber()
    students_count?: number;

    @IsOptional()
    @IsNumber()
    experience: number;
}
