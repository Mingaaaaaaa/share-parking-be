import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ParkingSlotDocument = HydratedDocument<ParkingSlot>;

@Schema({ timestamps: true, collection: 'parking_slots' })
export class ParkingSlot {
  @Prop({ required: true, unique: true, type: Types.ObjectId })
  slot_id: number;

  @Prop({ required: true, type: Types.ObjectId })
  provider_id: number;

  @Prop({ required: true, type: Types.ObjectId })
  neighborhood_id: Types.ObjectId;

  @Prop({ required: true, type: String, maxlength: 255 })
  address: string;

  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: [Number, Number] })
  new_coordinates: [number, number];

  @Prop({ required: true, type: Number })
  price_per_hour: number;

  @Prop({ required: true, type: String })
  proof_image: string;

  @Prop({ type: [String] })
  timeRange: string[];

  @Prop({ type: [String] })
  dateRange: string[];

  @Prop({ type: Boolean })
  availability: boolean;

  @Prop({ enum: ['active', 'inactive'], type: String })
  slot_status: string;

  @Prop({ type: String })
  start_time: string;

  @Prop({ type: String })
  end_time: string;
}

export const ParkingSlotSchema = SchemaFactory.createForClass(ParkingSlot);