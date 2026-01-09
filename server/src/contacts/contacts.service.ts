import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Model, MongooseError } from 'mongoose';
import { ContactDocument, Contacts } from './contacts.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateContactsDto } from './dto/CreateContacts.dto';
import { ContactsGateway } from './contacts.gateway';

@Injectable()
export class ContactsService {
  constructor(
    @InjectModel(Contacts.name)
    private contactsModel: Model<ContactDocument>,
    private readonly contactsGateway: ContactsGateway,
  ) {}

  async getContacts() {
    try {
      const contacts = await this.contactsModel.find().select('-_id -__v');
      return {
        success: true,
        length: contacts.length,
        data: contacts,
      };
    } catch (error) {
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async createContacts(data: CreateContactsDto) {
    try {
      const contact = await this.contactsModel.create(data);
      this.contactsGateway.server.emit('contact-created', {
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        bio: contact.bio,
      });

    // this.contactsGateway.emitContactCreated({
    //     name: contact.name,
    //     email: contact.email,
    //     phone: contact.phone,
    //     bio: contact.bio,
    //   });
      return {
        success: true,
        data: contact,
      };
    } catch (error) {
      const match = (error as MongooseError).message.match(/dup key:\s*({.*})/);
      const obj = match
        ? JSON.parse(match[1].replace(/(\w+):/g, '"$1":'))
        : null;

      const key = Object.keys(obj)[0];

      throw new ConflictException(`${key}: ${obj[key]} already exist`);
    }
  }
}
