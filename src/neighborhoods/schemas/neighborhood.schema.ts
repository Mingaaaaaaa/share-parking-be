import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type NeighborhoodDocument = HydratedDocument<Neighborhood>;

@Schema({ timestamps: true })
export class Neighborhood {
  @Prop({ required: true, unique: true, type: Number })
  region_id: number;

  @Prop({ required: true, type: String, maxlength: 100 })
  name: string;
}

export const NeighborhoodSchema = SchemaFactory.createForClass(Neighborhood);