import { InjectRepository } from '@nestjs/typeorm';
import {
    BadRequestException,
    Injectable,
    NotAcceptableException,
    NotFoundException,
} from '@nestjs/common';
import { Article, CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import axios from 'axios';
import { News } from './entities/news.entity';
import { Repository } from 'typeorm';
import { isUUID } from 'class-validator';
import { ResData } from 'src/common/utils/resData';

@Injectable()
export class NewsService {
    constructor(
        @InjectRepository(News) private readonly repository: Repository<News>,
    ) {}

    async add_news(dto: CreateNewsDto) {
        try {
            const data = await this.repository.save({ ...dto });
            return data;
        } catch (error) {
            return new NotAcceptableException(error);
        }
    }

    async findAll() {
        const data = await this.repository.find({
            order: { created_at: `DESC` },
        });

        return new ResData('All news by descending order', 200, data);
    }

    async findOne(id: string) {
        try {
            if (isUUID(id)) {
                const article = await this.repository.findOneBy({ id: id });

                if (article) {
                    return new ResData('Article', 200, article);
                } else {
                    return new NotFoundException('No article with id ' + id);
                }
            } else {
                return new BadRequestException('id is not a valid');
            }
        } catch (error) {
            return new Error(error);
        }
    }

    async update(id: string, updateNewsDto: UpdateNewsDto) {
        try {
            const article = await this.findOne(id);
            if (article) {
                await this.repository.update(id, updateNewsDto);
                const updated_article = await this.findOne(id);
                return new ResData('Article', 200, updated_article);
            } else {
                return new NotFoundException('No article with id' + id);
            }
        } catch (error) {
            return new NotAcceptableException(error.message);
        }
    }

    async remove(id: string) {
        try {
            const article = await this.findOne(id);
            if (article) {
                await this.repository.delete(id);
                return article;
            } else {
                return new NotFoundException('No article with id' + id);
            }
        } catch (error) {
            return new NotAcceptableException(error.message);
        }
    }
}
