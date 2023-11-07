import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, mongo } from 'mongoose';

@Schema()
export class User {
  @Prop()
  _id: mongo.ObjectId;

  @Prop()
  password: string;

  @Prop()
  email: string;

  @Prop()
  name: string;

  @Prop()
  age: number;
}
export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = HydratedDocument<User>;
