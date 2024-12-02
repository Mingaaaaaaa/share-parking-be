import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    try {
      const users = await this.userModel.find().exec();
      console.log('findAll: users found', users);
      return users;
    } catch (error) {
      console.error('findAll: error', error);
      throw error;
    }
  }

  async findOne(id: string): Promise<User> {
    try {
      const objectId = new Types.ObjectId(id);
      console.log('findOne: querying with id', objectId);
      const user = await this.userModel.findById(objectId).exec();
      console.log('findOne: user found', user);
      return user;
    } catch (error) {
      console.error('findOne: error', error);
      throw error;
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const objectId = new Types.ObjectId(id);
      console.log('update: querying with id', objectId);
      const updatedUser = await this.userModel.findByIdAndUpdate(objectId, updateUserDto, { new: true }).exec();
      console.log('update: user updated', updatedUser);
      return updatedUser;
    } catch (error) {
      console.error('update: error', error);
      throw error;
    }
  }

  async remove(id: string): Promise<User> {
    try {
      const objectId = new Types.ObjectId(id);
      console.log('remove: querying with id', objectId);
      const removedUser = await this.userModel.findByIdAndDelete(objectId).exec();
      console.log('remove: user removed', removedUser);
      return removedUser;
    } catch (error) {
      console.error('remove: error', error);
      throw error;
    }
  }

  async login(loginUserDto: LoginUserDto): Promise<string> {
    try {
      const user = await this.userModel.findOne({ username: loginUserDto.username }).exec();
      if (user && user.password === loginUserDto.password) {
        console.log('login: user authenticated', user);
        return user.role;
      } else {
        console.log('login: authentication failed');
        return null;
      }
    } catch (error) {
      console.error('login: error', error);
      throw error;
    }
  }
}