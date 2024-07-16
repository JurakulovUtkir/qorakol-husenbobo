import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 36, unique: true, nullable: false })
    phone: string;

    @Column({ type: 'text', nullable: false })
    description: string;

    @Column({ type: 'text', nullable: false })
    type: string; // can be pupil or teacher

    @Column({ type: 'text', nullable: false })
    photo: string;

    @Column({ type: 'text', nullable: false })
    subject: string;

    @Column({ nullable: true })
    students_count: number;

    @Column({ nullable: false })
    experience: number;
}
