import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsNumber, IsString } from 'class-validator';

export class CategoryDto {
    @ApiProperty({
        example: 'Category Name',
        description: 'The name of the category',
    })
    @IsNotEmpty()
    @IsString()
    name?: string;

    @ApiProperty({
        example: 'Category Name in Uzbek',
        description: 'The uzbek name of the category',
    })
    @IsNotEmpty()
    @IsString()
    name_uz?: string;

    @ApiProperty({
        example: 1,
        description: 'The ID of the parent category (optional)',
    })
    @IsOptional()
    @IsNumber()
    category_id?: number;
}
