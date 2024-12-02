import { Types } from "mongoose";

export class CreateOrderDto {
    _id: Types.ObjectId;
    user_id: number;
    slot_id: number;
    name: string;
    readonly end_time: Date;
    readonly start_time: Date;
}