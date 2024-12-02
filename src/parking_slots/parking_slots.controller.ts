import { Controller, Get, Post, Body, Param, Patch, Delete, Query } from '@nestjs/common';
import { ParkingSlotsService } from './parking_slots.service';
import { CreateParkingSlotDto } from './dto/create-parking_slot.dto';
import { UpdateParkingSlotDto } from './dto/update-parking_slot.dto';

@Controller('parking_slots')
export class ParkingSlotsController {
  constructor(private readonly parkingSlotsService: ParkingSlotsService) { }

  @Post()
  create(@Body() createParkingSlotDto: CreateParkingSlotDto) {
    return this.parkingSlotsService.create(createParkingSlotDto);
  }

  @Get()
  findAll(@Query('type') type: string) {
    console.log(type);
    return this.parkingSlotsService.findAll(type);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.parkingSlotsService.findOne(id);
  }

  @Get('getSlots/:neighborhoodId')
  findSlotsByNeighborhood(@Param('neighborhoodId') neighborhoodId: string) {
    return this.parkingSlotsService.findSlotsByNeighborhood(neighborhoodId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateParkingSlotDto: UpdateParkingSlotDto) {
    return this.parkingSlotsService.update(id, updateParkingSlotDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.parkingSlotsService.remove(id);
  }

  @Post('approve/:id')
  approve(@Param('id') id: string) {
    return this.parkingSlotsService.updateSlotStatus(id, 'active');
  }

  @Post('reject/:id')
  reject(@Param('id') id: string) {
    return this.parkingSlotsService.updateSlotStatus(id, 'inactive');
  }
}
