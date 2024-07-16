import { Controller, Post, Body, Patch, Param } from '@nestjs/common';
import { CompanyService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Companies')
@ApiBearerAuth()
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
