import { InjectRepository } from '@nestjs/typeorm';
import { CreateContactDto } from '../dto/create-contact.dto';
import { Contact } from '../entities/contact.entity';
import { IContactRepository } from './i-contacts.repository';
import { Repository } from 'typeorm';

export class ContactRepository implements IContactRepository {
    constructor(
        @InjectRepository(Contact)
        private readonly repository: Repository<Contact>,
    ) {}

    async insert(dto: CreateContactDto): Promise<Contact> {
        return await this.repository.save(dto);
    }
    async findAll(): Promise<Contact[]> {
        return await this.repository.find({
            order: { created_at: 'DESC' },
        });
    }
}
