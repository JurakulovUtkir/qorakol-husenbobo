import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { CategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
    ) {}

    async findAll(): Promise<CategoryDto[]> {
        return this.categoryRepository.find();
    }

    async findOne(id: number): Promise<CategoryDto> {
        return this.categoryRepository.findOneBy({ id: id });
    }

    async create(categoryDto: CategoryDto): Promise<CategoryDto> {
        const category = this.categoryRepository.create(categoryDto);
        return this.categoryRepository.save(category);
    }

    async update(id: number, categoryDto: CategoryDto): Promise<CategoryDto> {
        await this.categoryRepository.update(id, categoryDto);
        return this.categoryRepository.findOneBy({ id: id });
    }

    async remove(id: number): Promise<void> {
        await this.categoryRepository.delete(id);
    }
}
