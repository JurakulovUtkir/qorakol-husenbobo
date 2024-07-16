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
    role: string; // can be pupil or teacher
}
