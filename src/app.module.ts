import { Connection } from 'mongoose';
import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { ParkingSlotsModule } from './parking_slots/parking_slots.module';
import { NeighborhoodsModule } from './neighborhoods/neighborhoods.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1:27017/parking_system', {
    onConnectionCreate: (connection: Connection) => {
      connection.on('connected', () => console.log('app connected'));
      connection.on('open', () => console.log('app open'));
      return connection;
    }
  }), UsersModule, ParkingSlotsModule, NeighborhoodsModule, OrdersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
