import { Company } from 'src/companies/entities/company.entity';

export interface ILoginData {
    user: Company;
    token: string;
}

export interface IRegisterData {
    user: Company;
    token: string;
}
