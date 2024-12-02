import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  user_id: number;

  @Prop({ required: true, maxlength: 50 })
  username: string;

  @Prop({ required: true, maxlength: 15 })
  phone: string;

  @Prop({ required: true, maxlength: 128 })
  password: string;

  @Prop({ required: true, enum: ['admin', 'provider', 'user'] })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);