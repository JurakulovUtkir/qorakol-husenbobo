import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('company')
export class Company {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 36, unique: true, nullable: false })
    phone: string;

    @Column({ type: 'text', nullable: false })
    password: string;

    @Column({ type: 'text', nullable: false })
    role: string;
}
