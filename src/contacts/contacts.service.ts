import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { IContactService } from './utils/i-contacts.service';
import { ResData } from 'src/common/utils/resData';
import { Contact } from './entities/contact.entity';
import { ContactRepository } from './utils/contacts.repository';

@Injectable()
export class ContactsService implements IContactService {
    constructor(private readonly repository: ContactRepository) {}
    async create(dto: CreateContactDto): Promise<ResData<Contact>> {
        const contact = await this.repository.insert(dto);
        return new ResData('A new leet is received', 201, contact);
    }
    async find_all(): Promise<ResData<Contact[]>> {
        const all_contacts = await this.repository.findAll();
        return new ResData('All leets are retrieved', 200, all_contacts);
    }
}
