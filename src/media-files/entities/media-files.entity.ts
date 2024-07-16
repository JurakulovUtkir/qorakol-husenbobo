import { MediaFileStatus } from 'src/common/types/enums';
import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'media_files' })
export class MediaFiles {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar' })
    file_name: string;

    @Column({ type: 'integer' })
    file_size: number;

    @Column({ type: 'varchar' })
    file_mimetype: string;

    @Column({ type: 'varchar' })
    file_path: string;

    @Column({ type: 'varchar' })
    associated_with: string;

    @Column({ type: 'varchar' })
    usage: string;

    @Column({ type: 'enum', enum: MediaFileStatus })
    status: MediaFileStatus;

    @CreateDateColumn({ nullable: false })
    created_at: Date;
}
