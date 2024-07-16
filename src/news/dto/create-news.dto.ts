import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateNewsDto {
    @ApiProperty({ example: 'Title', description: 'The title of the news' })
    @IsString()
    title: string;

    @ApiProperty({
        example: 'Description',
        description: 'The description of the news',
    })
    @IsString()
    description: string;

    @ApiProperty({
        example: '2022-10-01',
        description: 'The publication date of the news',
    })
    @IsString()
    pubDate: string;

    @ApiProperty({ example: 'Sports', description: 'The category of the news' })
    @IsString()
    category: string;

    @ApiProperty({
        example: 'https://example.com/image.jpg',
        description: 'The URL of the news image',
    })
    @IsString()
    image_url: string;
}
export interface Article {
    article_id: string;
    title: string;
    link: string;
    keywords: string[];
    creator: string | null;
    video_url: string | null;
    description: string;
    content: string;
    pubDate: string;
    image_url: string;
    source_id: string;
    source_priority: number;
    source_url: string;
    source_icon: string;
    language: string;
    country: string[];
    category: string[];
    ai_tag: string;
    sentiment: string;
    sentiment_stats: string;
    ai_region: string;
}
