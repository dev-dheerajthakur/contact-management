import {
  IsEmail,
  IsEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateContactsDto {
  @IsString({ message: 'Please enter your name' })
  @MinLength(3, { message: 'Name must be at least 3 characters' })
  @MaxLength(15, { message: 'Name must be at most 15 characters' })
  name: string;

  @IsEmail({}, { message: 'Invalid Email' })
  email: string;

  @IsString({ message: 'Invalid Phone' })
  @Matches(/^[0-9]{10}$/, { message: 'Invalid phone number' })
  phone: string;

  @IsOptional()
  @IsString()
  bio?: string;
}
