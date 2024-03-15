import { PageResponse } from "./pageResponse";

export interface VehiclePage extends PageResponse {
    content: VehicleData[];
}

interface Vehicle {
    brand: string;
    created_at: string;
    id: number;
    name: string;
    model: string;
    price: number;
    vehicle_type: string;
    user_id: number;
    year: number;
}

export interface VehicleData {
    vehicle: Vehicle;
    pictures: string[];
}
  