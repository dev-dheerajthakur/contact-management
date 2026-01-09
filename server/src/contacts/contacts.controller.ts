import { Body, Controller, Get, Post } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { CreateContactsDto } from './dto/CreateContacts.dto';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactService: ContactsService) {}
  @Get()
  async getContacts() {
    const contacts = await this.contactService.getContacts();
    return contacts;
  }

  @Post()
  async createContacts(@Body() data: CreateContactsDto) {
    const contact = await this.contactService.createContacts(data)
    return contact
  }
}
