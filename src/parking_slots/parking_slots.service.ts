import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ParkingSlot, ParkingSlotDocument } from './schemas/parking_slot.schema';
import { CreateParkingSlotDto } from './dto/create-parking_slot.dto';
import { UpdateParkingSlotDto } from './dto/update-parking_slot.dto';

@Injectable()
export class ParkingSlotsService {
  constructor(@InjectModel(ParkingSlot.name) private parkingSlotModel: Model<ParkingSlotDocument>) { }

  async create(createParkingSlotDto: CreateParkingSlotDto): Promise<ParkingSlot> {
    // 生成 slot_id 和 provider_id
    createParkingSlotDto.neighborhood_id = new Types.ObjectId(createParkingSlotDto.neighborhood_id);
    const slot_id = new Types.ObjectId();
    const provider_id = new Types.ObjectId();
    const slot_status = 'inactive';
    const availability = true;
    const createdParkingSlot = new this.parkingSlotModel({
      ...createParkingSlotDto,
      slot_id,
      provider_id,
      slot_status,
      availability,
    });
    return createdParkingSlot.save();
  }

  async findAll(type: string): Promise<ParkingSlot[]> {
    // 分为两种情况，一种是查询所有的停车位，一种是查询所有的停车位状态为 active 的停车位
    // 根据 type 参数来判断
    try {
      let parkingSlots;
      if (type === 'all') {
        parkingSlots = await this.parkingSlotModel.find().exec();
      } else {
        parkingSlots = await this.parkingSlotModel.find({ slot_status: 'inactive' }).exec();
      }
      console.log('findAll: parking slots found', parkingSlots);
      return parkingSlots;
    } catch (error) {
      console.error('findAll: error', error);
      throw error;
    }
  }

  async findOne(id: string): Promise<ParkingSlot> {
    try {
      const objectId = new Types.ObjectId(id);
      console.log('findOne: querying with id', objectId);
      const parkingSlot = await this.parkingSlotModel.findById(objectId).exec();
      console.log('findOne: parking slot found', parkingSlot);
      return parkingSlot;
    } catch (error) {
      console.error('findOne: error', error);
      throw error;
    }
  }
  async findSlotsByNeighborhood(neighborhoodId: string): Promise<ParkingSlot[]> {
    try {
      console.log('findSlotsByNeighborhood: querying with neighborhoodId', neighborhoodId);
      let neighborhoodIdObj = new Types.ObjectId(neighborhoodId);
      const parkingSlots = await this.parkingSlotModel.find({ neighborhood_id: neighborhoodIdObj }).exec();
      console.log('findSlotsByNeighborhood: parking slots found', parkingSlots);
      return parkingSlots;
    } catch (error) {
      console.error('findSlotsByNeighborhood: error', error);
      throw error;
    }
  }
  async update(id: string, updateParkingSlotDto: UpdateParkingSlotDto): Promise<ParkingSlot> {
    try {
      const objectId = new Types.ObjectId(id);
      console.log('update: querying with id', objectId);
      const updatedParkingSlot = await this.parkingSlotModel.findByIdAndUpdate(objectId, updateParkingSlotDto, { new: true }).exec();
      console.log('update: parking slot updated', updatedParkingSlot);
      return updatedParkingSlot;
    } catch (error) {
      console.error('update: error', error);
      throw error;
    }
  }

  async remove(id: string): Promise<ParkingSlot> {
    try {
      const objectId = new Types.ObjectId(id);
      console.log('remove: querying with id', objectId);
      const removedParkingSlot = await this.parkingSlotModel.findByIdAndDelete(objectId).exec();
      console.log('remove: parking slot removed', removedParkingSlot);
      return removedParkingSlot;
    } catch (error) {
      console.error('remove: error', error);
      throw error;
    }
  }

  async updateSlotStatus(id: string, status: string): Promise<ParkingSlot> {
    try {
      const objectId = new Types.ObjectId(id);
      console.log(`updateSlotStatus: updating slot status to ${status} for id`, objectId);
      const updatedParkingSlot = await this.parkingSlotModel.findByIdAndUpdate(objectId, { slot_status: status }, { new: true }).exec();
      console.log('updateSlotStatus: parking slot status updated', updatedParkingSlot);
      return updatedParkingSlot;
    } catch (error) {
      console.error('updateSlotStatus: error', error);
      throw error;
    }
  }
}