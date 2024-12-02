import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Order, OrderDocument } from './schemas/order.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private orderModel: Model<OrderDocument>) { }

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const _id = new Types.ObjectId();
    createOrderDto._id = _id;
    const createdOrder = new this.orderModel(createOrderDto);
    return createdOrder.save();
  }

  async findAll(): Promise<Order[]> {
    try {
      const orders = await this.orderModel.find().exec();
      console.log('findAll: orders found', orders);
      return orders;
    } catch (error) {
      console.error('findAll: error', error);
      throw error;
    }
  }

  async findOne(id: string): Promise<Order> {
    try {
      const objectId = new Types.ObjectId(id);
      console.log('findOne: querying with id', objectId);
      const order = await this.orderModel.findById(objectId).exec();
      console.log('findOne: order found', order);
      return order;
    } catch (error) {
      console.error('findOne: error', error);
      throw error;
    }
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    try {
      const objectId = new Types.ObjectId(id);
      const updatedOrder = await this.orderModel.findByIdAndUpdate(objectId, updateOrderDto, { new: true }).exec();
      console.log('update: order updated', updatedOrder);
      return updatedOrder;
    } catch (error) {
      console.error('update: error', error);
      throw error;
    }
  }

  async remove(id: string): Promise<Order> {
    try {
      const objectId = new Types.ObjectId(id);
      const removedOrder = await this.orderModel.findByIdAndDelete(objectId).exec();
      console.log('remove: order removed', removedOrder);
      return removedOrder;
    } catch (error) {
      console.error('remove: error', error);
      throw error;
    }
  }
}
