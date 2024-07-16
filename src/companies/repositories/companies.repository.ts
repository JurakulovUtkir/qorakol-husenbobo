import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ICompanyRepository } from '../interfaces/company.repository';
import { Company } from '../entities/company.entity';
import { UpdateCompanyDto } from '../dto/update-company.dto';

export class CompanyRepository implements ICompanyRepository {
    constructor(
        @InjectRepository(Company)
        private repository: Repository<Company>,
    ) {}
    async update(id: string, dto: UpdateCompanyDto): Promise<Company> {
        await this.repository.update(id, dto);
        return await this.findOneById(id);
    }
    async findOneById(id: string): Promise<Company | undefined> {
        return await this.repository.findOneBy({ id });
    }

    async findOneByPhone(phone: string): Promise<Company | undefined> {
        return await this.repository.findOneBy({ phone });
    }

    async insert(entity: Company): Promise<Company> {
        const newUser = this.repository.create(entity);

        await this.repository.save(newUser);

        return newUser;
    }
}
