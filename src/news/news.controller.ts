import {
    Controller,
    Get,
    Post,
    Param,
    Body,
    Patch,
    Delete,
} from '@nestjs/common';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiParam,
    ApiBody,
    ApiBearerAuth,
} from '@nestjs/swagger';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { Public } from 'src/auth/decorators/is-public.decorator';

@ApiBearerAuth()
@ApiTags('News')
@Controller('news')
export class NewsController {
    constructor(private readonly newsService: NewsService) {}

    @ApiOperation({ summary: 'Add news' })
    @ApiBody({ type: CreateNewsDto })
    @ApiResponse({ status: 201, description: 'News successfully added' })
    @Post('add-news')
    add_news(@Body() dto: CreateNewsDto) {
        return this.newsService.add_news(dto);
    }

    // @ApiOperation({ summary: 'Create news' })
    // @ApiParam({ name: 'id', description: 'User ID' })
    // @ApiResponse({
    //     status: 201,
    //     description: 'News successfully created in local',
    // })
    // @Post(':id')
    // create(@Param('id') id: string) {
    //     return this.newsService.create(id);
    // }

    @Public()
    @ApiOperation({ summary: 'Get all news' })
    @ApiResponse({ status: 200, description: 'Returns an array of news' })
    @Get()
    findAll() {
        return this.newsService.findAll();
    }

    @ApiOperation({ summary: 'Get news by ID' })
    @ApiParam({ name: 'id', description: 'News ID' })
    @ApiResponse({ status: 200, description: 'Returns a single news item' })
    @Public()
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.newsService.findOne(id);
    }

    @ApiOperation({ summary: 'Update news' })
    @ApiParam({ name: 'id', description: 'News ID' })
    @ApiBody({ type: UpdateNewsDto })
    @ApiResponse({ status: 200, description: 'News successfully updated' })
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateNewsDto: UpdateNewsDto) {
        return this.newsService.update(id, updateNewsDto);
    }

    @ApiOperation({ summary: 'Delete news' })
    @ApiParam({ name: 'id', description: 'News ID' })
    @ApiResponse({ status: 200, description: 'News successfully deleted' })
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.newsService.remove(id);
    }
}
