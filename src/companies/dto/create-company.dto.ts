import { RoleEnum } from 'src/common/types/enums';

export class CreateCompanyDto {
    phone: string;
    password: string;
    role: RoleEnum;
}
