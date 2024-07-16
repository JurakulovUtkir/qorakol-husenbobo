import { ResData } from 'src/common/utils/resData';
import { CreateContactDto } from '../dto/create-contact.dto';
import { Contact } from '../entities/contact.entity';

export interface IContactService {
    create(dto: CreateContactDto): Promise<ResData<Contact>>;

    find_all(): Promise<ResData<Contact[]>>;
}
