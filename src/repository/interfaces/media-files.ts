import { MediaFileMetadataI } from 'src/common/types/interfaces';
import { UpdateResult } from 'typeorm';

export type CreateMediaFileMetadata = Omit<MediaFileMetadataI, 'id'>;

export default interface MediaFilesRepositoryInterface {
    saveMetadata(payload: CreateMediaFileMetadata): Promise<string>;
    disableOldMediaFile(path: string): Promise<UpdateResult>;
    confirmNewMediaFile(path: string): Promise<UpdateResult>;
}
