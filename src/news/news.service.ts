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

@Injectable()
export class NewsService {
    constructor(
        @InjectRepository(News) private readonly repository: Repository<News>,
    ) {}
    async create(id: string) {
        try {
            const nextPage = await this.get_data_from_news_api(id);
            return nextPage;
        } catch (error) {
            throw new NotAcceptableException(error);
        }
    }

    async add_news(dto: CreateNewsDto) {
        try {
            const data = await this.repository.save({ ...dto });
            return data;
        } catch (error) {
            return new NotAcceptableException(error);
        }
    }

    findAll() {
        return this.repository.find({
            order: { pubDate: `DESC` },
        });
    }

    async findOne(id: string) {
        try {
            if (isUUID(id)) {
                const article = await this.repository.findOneBy({ id: id });

                if (article) {
                    return article;
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
                return await this.findOne(id);
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

    async get_data_from_news_api(page: string): Promise<any> {
        const url = 'https://newsdata.io/api/1/news';

        try {
            let response = null;
            const utkir_api_key = 'pub_42532b35a75d14ac9a0ebd646020759647b11';
            const category = 'top';

            response = await axios.get(url, {
                params: {
                    apikey: utkir_api_key,
                    country: 'uz',
                    language: 'uz',
                    image: 1,
                    domainurl: 'kun.uz',
                    page: page,
                    category: category,
                },
            });

            // we need to filter drugs from prohibited drugs before returning
            const results: Article[] = await response.data.results;

            console.log(response.data);

            const nextPage = response.data.nextPage;

            for (const article of results) {
                await this.repository.save({
                    title: article.title,
                    description: article.description,
                    pubDate: article.pubDate,
                    category: category,
                    image_url: article.image_url,
                });
            }

            return nextPage;
        } catch (error) {
            console.log(error.detail);
        }
    }
}
