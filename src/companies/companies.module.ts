import { Module } from '@nestjs/common';
import { CompanyService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { CompanyRepository } from './repositories/companies.repository';

@Module({
    imports: [TypeOrmModule.forFeature([Company])],
    controllers: [CompaniesController],
    providers: [CompanyService, CompanyRepository],
})
export class CompaniesModule {}
