import { PageResponse } from "./pageResponse";

export interface contactMessagePage extends PageResponse {
    content: ContactMessage[];
}

export interface ContactMessage {
    id: string,
    vehicle_id: string,
    created_at: string,
    is_read: boolean,
    name: string,
    lastname: string,
    phone: string,
    email: string,
    message: string
}