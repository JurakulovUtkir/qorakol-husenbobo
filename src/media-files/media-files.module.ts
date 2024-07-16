import { Module } from '@nestjs/common';
import { MediaFilesRepository } from '../repository/classes/media-files';
import { ImagesController } from './images/images.controller';
import { MediaFilesService } from './media-files.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MediaFiles } from './entities/media-files.entity.js';

@Module({
    imports: [TypeOrmModule.forFeature([MediaFiles])],
    controllers: [ImagesController],
    providers: [MediaFilesService, MediaFilesRepository],
})
export class MediaFilesModule {}
