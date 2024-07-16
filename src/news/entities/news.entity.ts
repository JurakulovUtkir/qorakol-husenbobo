import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class News {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    pubDate: string;

    @Column()
    category: string;

    @Column()
    image_url: string;
}
