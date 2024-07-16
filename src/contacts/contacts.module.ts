import { Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from './entities/contact.entity';
import { ContactRepository } from './utils/contacts.repository';

@Module({
    imports: [TypeOrmModule.forFeature([Contact])],
    controllers: [ContactsController],
    providers: [ContactsService, ContactRepository],
})
export class ContactsModule {}
