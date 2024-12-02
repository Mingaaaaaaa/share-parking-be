import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ParkingSlotsService } from './parking_slots.service';
import { ParkingSlotsController } from './parking_slots.controller';
import { ParkingSlot, ParkingSlotSchema } from './schemas/parking_slot.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: ParkingSlot.name, schema: ParkingSlotSchema }])],
  controllers: [ParkingSlotsController],
  providers: [ParkingSlotsService],
})
export class ParkingSlotsModule {} 