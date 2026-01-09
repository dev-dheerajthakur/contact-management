import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ContactDocument = HydratedDocument<Contacts>;

@Schema({ timestamps: true })
export class Contacts {
  @Prop({ required: true, min: 3, max: 10 })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({
    required: true,
    unique: true,
    minlength: 10,
    maxlength: 10,
    match: /^[0-9]{10}$/,
  })
  phone: string;

  @Prop()
  bio: string;
}

export const ContactSchema = SchemaFactory.createForClass(Contacts);
