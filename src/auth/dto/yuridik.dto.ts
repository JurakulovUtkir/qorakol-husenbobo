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

export class YuridikDTO {
    @IsString()
    created_at: string;

    @IsString()
    updated_at: string;

    @IsString()
    status: string;

    @IsNumber()
    id: number;

    @IsString()
    name: string;

    @IsNumber()
    tin: number;

    @IsString()
    okpo: string;

    @ValidateNested()
    @Type(() => RegistrationRegion)
    registration_region: RegistrationRegion;

    @ValidateNested()
    @Type(() => RegistrationSubRegion)
    registration_sub_region: RegistrationSubRegion;

    @ValidateNested()
    @Type(() => BusinessType)
    business_type: BusinessType;

    @IsString()
    application_status: string;

    @IsString()
    technologies: string;

    @IsString()
    application_type: string;

    @IsString()
    application_group: string;

    @IsNumber()
    number: number;

    @IsString()
    notified_tax_at: string;

    @IsString()
    phone: string;

    @IsEmail()
    email: string;

    @IsString()
    applicant_full_name: string;

    @ValidateNested()
    @Type(() => Oked)
    oked: Oked;
}

export class YuridikDTOData {
    @IsString()
    token: string;
}
