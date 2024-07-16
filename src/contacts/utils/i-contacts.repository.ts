import { CreateContactDto } from '../dto/create-contact.dto';
import { Contact } from '../entities/contact.entity';

export interface IContactRepository {
    insert(dto: CreateContactDto): Promise<Contact>;
    findAll(): Promise<Contact[]>;
}
