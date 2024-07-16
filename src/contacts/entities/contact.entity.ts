import {
    PrimaryGeneratedColumn,
    Column,
    Entity,
    CreateDateColumn,
} from 'typeorm';

@Entity('contacts')
export class Contact {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    phone: string;

    @Column({ nullable: true })
    info: string;

    @CreateDateColumn()
    created_at: Date;
}
