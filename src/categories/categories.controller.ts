import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import {
    ApiTags,
    ApiResponse,
    ApiOkResponse,
    ApiCreatedResponse,
    ApiBearerAuth,
} from '@nestjs/swagger';
import { CategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoriesService } from './categories.service';
import { Category } from './entities/category.entity';
import { Public } from 'src/auth/decorators/is-public.decorator';

@ApiBearerAuth()
@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

    @ApiCreatedResponse({ type: Category })
    @Post()
    create(@Body() dto: CategoryDto) {
        return this.categoriesService.create(dto);
    }

    @ApiOkResponse({ type: [Category] })
    @Public()
    @Get()
    findAll() {
        return this.categoriesService.findAll();
    }

    @ApiOkResponse({ type: Category })
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.categoriesService.findOne(+id);
    }

    @ApiOkResponse({ type: Category })
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateCategoryDto: UpdateCategoryDto,
    ) {
        return this.categoriesService.update(+id, updateCategoryDto);
    }

    @ApiResponse({ status: 204, description: 'Category deleted successfully' })
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.categoriesService.remove(+id);
    }
}
