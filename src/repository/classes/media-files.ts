import * as path from 'path';
import * as fs from 'fs';
import MediaFilesRepositoryInterface, {
    CreateMediaFileMetadata,
} from '../interfaces/media-files';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository, UpdateResult } from 'typeorm';
import { MediaFileStatus } from 'src/common/types/enums';
import { MediaFiles } from 'src/media-files/entities/media-files.entity';
import { DeleteMediaDto } from 'src/media-files/dto/delete-media.dto';
import { MultiDeleteMediaDto } from 'src/media-files/dto/multi-delete-file.dto';

export class MediaFilesRepository implements MediaFilesRepositoryInterface {
    constructor(
        @InjectRepository(MediaFiles)
        private readonly repository: Repository<MediaFiles>,
    ) {}

    async disableOldMediaFile(serve_path: string): Promise<UpdateResult> {
        return this.repository.update(
            {
                file_path: path.posix.join('assets', serve_path),
            },
            {
                status: MediaFileStatus.INACTIVE,
            },
        );
    }

    confirmNewMediaFile(serve_path: string): Promise<UpdateResult> {
        return this.repository.update(
            {
                file_path: path.posix.join('assets', serve_path),
            },
            {
                status: MediaFileStatus.ACTIVE,
            },
        );
    }

    async saveMetadata(payload: CreateMediaFileMetadata): Promise<string> {
        const metadata = await this.repository.save(payload);
        return metadata.id;
    }

    async deleteFile(dto: DeleteMediaDto) {
        await this.repository.delete({ file_path: dto.path });
        return fs.unlink(dto.path, (err) => {
            if (err) return err;
        });
    }

    async multiDeleteFile(dto: MultiDeleteMediaDto) {
        await this.repository.delete({ file_path: In(dto.path) });
        return dto.path.map((m) =>
            fs.unlink(m, (err) => {
                if (err) return err;
            }),
        );
    }
}
