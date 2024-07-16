import { ResData } from 'src/common/utils/resData';
import { Company } from '../entities/company.entity';
import { CreateCompanyDto } from '../dto/create-company.dto';
import { UpdateCompanyDto } from '../dto/update-company.dto';

export interface ICompanyService {
    findOneById(id: string): Promise<ResData<Company | undefined>>;
    findOneByPhone(login: string): Promise<ResData<Company | undefined>>;
    create(dto: CreateCompanyDto): Promise<ResData<Company>>;
    update(
        id: number,
        updateCompanyDto: UpdateCompanyDto,
    ): Promise<ResData<Company>>;
}
