import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { mongo } from 'mongoose';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  _id: mongo.ObjectId;
}
