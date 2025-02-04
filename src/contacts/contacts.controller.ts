import { Controller, Get, Post, Body } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/decorators/is-public.decorator';

@ApiTags('Contact us ')
@Controller('contacts')
export class ContactsController {
    constructor(private readonly contactsService: ContactsService) {}

    @Public()
    @Post()
    create(@Body() createContactDto: CreateContactDto) {
        return this.contactsService.create(createContactDto);
    }

    @Get()
    findAll() {
        return this.contactsService.find_all();
    }

    // @Get(':id')
    // findOne(@Param('id') id: string) {
    //     return this.contactsService.findOne(+id);
    // }

    // @Patch(':id')
    // update(
    //     @Param('id') id: string,
    //     @Body() updateContactDto: UpdateContactDto,
    // ) {
    //     return this.contactsService.update(+id, updateContactDto);
    // }

    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //     return this.contactsService.remove(+id);
    // }
}
