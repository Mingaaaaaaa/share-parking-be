import { Types } from "mongoose";

export class CreateParkingSlotDto {
    slot_id?: Types.ObjectId;
    provider_id?: Types.ObjectId;
    neighborhood_id: Types.ObjectId;
    readonly address: string;
    readonly region: string;
    readonly price_per_hour: number;
    readonly proof_image: string;
    readonly dateRange: [string, string];
    readonly timeRange: [string, string];
    readonly new_coordinates: [number, number];
    readonly availability?: boolean;
    readonly slot_status?: string;
    readonly start_time?: string;
    readonly end_time?: string;
}