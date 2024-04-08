import { PageResponse } from "./pageResponse";

export interface VehiclePage extends PageResponse {
    content: VehicleData[];
}

export interface Vehicle {
    brand: string;
    created_at: string;
    id: number;
    name: string;
    model: string;
    price: number;
    vehicle_type: string;
    owner: Owner;
    year: number;
}

export interface VehicleData {
    vehicle: Vehicle;
    pictures: string[];
}

interface Owner {
    user_id: string,
    name: string
}
  