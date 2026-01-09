import { Module } from '@nestjs/common';
import { ContactsController } from './contacts.controller';
import { ContactsService } from './contacts.service';
import { ContactsGateway } from './contacts.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { Contacts, ContactSchema } from './contacts.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Contacts.name, schema: ContactSchema }]),
  ],
  controllers: [ContactsController],
  providers: [ContactsService, ContactsGateway],
})
export class ContactsModule {}
