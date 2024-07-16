import { IsString, IsNumber, ValidateNested, IsEmail } from 'class-validator';
import { Type } from 'class-transformer';

class RegistrationRegion {
    @IsNumber()
    id: number;

    @IsString()
    name: string;
}

class RegistrationSubRegion {
    @IsNumber()
    id: number;

    @IsString()
    name: string;
}

class BusinessType {
    @IsNumber()
    id: number;

    @IsString()
    name: string;
}

class Oked {
    @IsString()
    id: string;

    @IsString()
    name: string;
}
