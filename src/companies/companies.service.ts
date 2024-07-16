import { Injectable } from '@nestjs/common';
import { ResData } from 'src/common/utils/resData';
import { ICompanyService } from './interfaces/company.service';
import { CompanyRepository } from './repositories/companies.repository';
import { Company } from './entities/company.entity';
import { UserNotFoundException } from './exception/user.exception';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompanyService implements ICompanyService {
    constructor(private readonly repository: CompanyRepository) {}
    update(
        id: number,
        updateCompanyDto: UpdateCompanyDto,
    ): Promise<ResData<Company>> {
        throw new Error('Method not implemented.');
    }

    async findOneById(id: string): Promise<ResData<Company | undefined>> {
        const foundData = await this.repository.findOneById(id);

        if (!foundData) {
            throw new UserNotFoundException();
        }

        return new ResData('get by id', 200, foundData);
    }

    async findOneByPhone(phone: string) {
        const foundData = await this.repository.findOneByPhone(phone);

        const resData = new ResData('success', 200, foundData);

        if (!foundData) {
            resData.message = 'Not Found';
            resData.statusCode = 404;
        }

        return resData;
    }

    async create(dto: CreateCompanyDto): Promise<ResData<Company>> {
        const newUser = new Company();

        const newData = Object.assign(newUser, dto);

        const newCompany = await this.repository.insert(newData);

        return new ResData('success', 200, newCompany);
    }
}
