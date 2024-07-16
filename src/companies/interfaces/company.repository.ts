import { UpdateCompanyDto } from '../dto/update-company.dto';
import { Company } from '../entities/company.entity';

export interface ICompanyRepository {
    findOneById(id: string): Promise<Company | undefined>;
    findOneByPhone(phone: string): Promise<Company | undefined>;
    insert(dto: Company): Promise<Company>;
    update(id: string, dto: UpdateCompanyDto): Promise<Company>;
}
