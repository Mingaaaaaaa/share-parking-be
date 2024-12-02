import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';

export type OrderDocument = HydratedDocument<Order>;

@Schema({ timestamps: true })
export class Order {
  @Prop({ required: true, type: String })
  user_id: ObjectId;

  @Prop({ required: true, type: String })
  slot_id: ObjectId;

  @Prop({ type: Number })
  total_price: number;

  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: String })
  availableTime: string;

}

export const OrderSchema = SchemaFactory.createForClass(Order);