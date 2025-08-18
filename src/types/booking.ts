export interface Booking {
    id: number,
    restaurant_id: number,
    created_at: string,
    booking_date: string,
    booking_time: string,
    party_size: number,
    special_requests: string,
    booking_status: string,
    booking_name: string,
    contact_email: string,
    contact_phone: string,
    last_updated: string,
    updated_by: number
}