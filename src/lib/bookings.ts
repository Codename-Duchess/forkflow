import { Pool } from "pg";

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export async function query(text: string, params?: any[]) { // eslint-disable-line @typescript-eslint/no-explicit-any
    const client = await pool.connect()
    try {
        const result = await client.query(text, params)
        return result.rows
    } finally {
        client.release()
    }
}

export async function createNewBooking(bookingData: {
    restaurant_id: number,
    booking_date: string,
    booking_time: string,
    party_size: number,
    special_requests?: string,
    booking_status: string,
    booking_name: string,
    contact_email: string,
    contact_phone?: string
}) {

    const result = await query(
        `INSERT INTO bookings (restaurant_id, booking_date, booking_time, party_size, special_requests, booking_status, booking_name, contact_email, contact_phone)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
     RETURNING id, restaurant_id, booking_date, booking_time, party_size, special_requests, booking_status, booking_name, contact_email, contact_phone`,
        [bookingData.restaurant_id, bookingData.booking_date, bookingData.booking_time, bookingData.party_size, bookingData.special_requests, bookingData.booking_status, bookingData.booking_name, bookingData.contact_email, bookingData.contact_phone]
    )

    return result[0]

}

export async function editSelectedBooking() {

}

export async function deleteSelectedBooking() {

}




