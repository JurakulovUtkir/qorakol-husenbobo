import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { CompanyService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Controller('companies')
export class CompaniesController {
    constructor(private readonly companiesService: CompanyService) {}

    @Post()
    create(@Body() createCompanyDto: CreateCompanyDto) {
        return this.companiesService.create(createCompanyDto);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateCompanyDto: UpdateCompanyDto,
    ) {
        return this.companiesService.update(+id, updateCompanyDto);
    }
}
