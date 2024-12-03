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

  @Prop({ type: String })
  availableTime: string;

  @Prop({ required: true, type: Number, default: 0 }) // 0:待使用, 1:使用中, 2:已完成, 3:已取消
  status: number;

  @Prop({ required: true, type: Date })
  end_time: Date;

  @Prop({ required: true, type: Date })
  start_time: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);