import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Neighborhood, NeighborhoodDocument } from './schemas/neighborhood.schema';
import { CreateNeighborhoodDto } from './dto/create-neighborhood.dto';
import { UpdateNeighborhoodDto } from './dto/update-neighborhood.dto';

@Injectable()
export class NeighborhoodsService {
  constructor(@InjectModel(Neighborhood.name) private neighborhoodModel: Model<NeighborhoodDocument>) { }

  async create(createNeighborhoodDto: CreateNeighborhoodDto): Promise<Neighborhood> {
    const createdNeighborhood = new this.neighborhoodModel(createNeighborhoodDto);
    return createdNeighborhood.save();
  }

  async findAll(): Promise<Neighborhood[]> {
    try {
      const neighborhoods = await this.neighborhoodModel.find().exec();
      console.log('findAll: neighborhoods found', neighborhoods);
      return neighborhoods;
    } catch (error) {
      console.error('findAll: error', error);
      throw error;
    }
  }

  async findOne(id: string): Promise<Neighborhood> {
    try {
      const objectId = new Types.ObjectId(id);
      const neighborhood = await this.neighborhoodModel.findById(objectId).exec();
      console.log('findOne: neighborhood found', neighborhood);
      return neighborhood;
    } catch (error) {
      console.error('findOne: error', error);
      throw error;
    }
  }

  async update(id: string, updateNeighborhoodDto: UpdateNeighborhoodDto): Promise<Neighborhood> {
    try {
      const objectId = new Types.ObjectId(id);
      const updatedNeighborhood = await this.neighborhoodModel.findByIdAndUpdate(objectId, updateNeighborhoodDto, { new: true }).exec();
      console.log('update: neighborhood updated', updatedNeighborhood);
      return updatedNeighborhood;
    } catch (error) {
      console.error('update: error', error);
      throw error;
    }
  }

  async remove(id: string): Promise<Neighborhood> {
    try {
      const objectId = new Types.ObjectId(id);
      const removedNeighborhood = await this.neighborhoodModel.findByIdAndDelete(objectId).exec();
      console.log('remove: neighborhood removed', removedNeighborhood);
      return removedNeighborhood;
    } catch (error) {
      console.error('remove: error', error);
      throw error;
    }
  }
}