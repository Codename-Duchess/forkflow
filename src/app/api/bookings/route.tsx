import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// GET all bookings for a restaurant
async function getBookings(restaurantId: string) {
    const client = await pool.connect();
    try {
        const result = await client.query(
            'SELECT * FROM bookings WHERE restaurant_id = $1 ORDER BY booking_date DESC, booking_time DESC',
            [restaurantId]
        );
        return result.rows;
    } finally {
        client.release();
    }
}

// GET single booking by ID
async function getBookingById(bookingId: string) {
    const client = await pool.connect();
    try {
        const result = await client.query(
            'SELECT * FROM bookings WHERE id = $1',
            [bookingId]
        );
        return result.rows[0] || null;
    } finally {
        client.release();
    }
}

// GET - Fetch bookings
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const restaurantId = searchParams.get('restaurant_id');
        const bookingId = searchParams.get('booking_id');

        if (bookingId) {
            const booking = await getBookingById(bookingId);
            if (!booking) {
                return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
            }
            return NextResponse.json(booking);
        }

        if (restaurantId) {
            const bookings = await getBookings(restaurantId);
            return NextResponse.json(bookings);
        }

        return NextResponse.json({ error: 'restaurant_id or booking_id required' }, { status: 400 });
    } catch (error) {
        console.error('GET bookings error:', error);
        return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
    }
}

// POST - Create new booking
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            restaurant_id,
            booking_date,
            booking_time,
            party_size,
            special_requests,
            booking_status,
            booking_name,
            contact_email,
            contact_phone,
            updated_by
        } = body;

        // Validation
        if (!restaurant_id || !booking_date || !booking_time || !party_size || !booking_name || !contact_email) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const query = `
      INSERT INTO bookings (
        restaurant_id, booking_date, booking_time, party_size, 
        special_requests, booking_status, booking_name, contact_email, 
        contact_phone, created_at, last_updated, updated_by
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), NOW(), $10)
      RETURNING *
    `;

        const params = [
            restaurant_id,
            booking_date,
            booking_time,
            party_size,
            special_requests || null,
            booking_status || 'pending',
            booking_name,
            contact_email,
            contact_phone || null,
            updated_by || 'system'
        ];

        const client = await pool.connect();
        try {
            const result = await client.query(query, params);
            return NextResponse.json(result.rows[0], { status: 201 });
        } finally {
            client.release();
        }
    } catch (error) {
        console.error('POST booking error:', error);
        return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
    }
}

// PUT - Update existing booking
export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const { id, updated_by, ...updateFields } = body;

        if (!id) {
            return NextResponse.json({ error: 'Booking ID required' }, { status: 400 });
        }

        // Build dynamic query based on provided fields
        const allowedFields = [
            'restaurant_id', 'booking_date', 'booking_time', 'party_size',
            'special_requests', 'booking_status', 'booking_name',
            'contact_email', 'contact_phone'
        ];

        const updateEntries = Object.entries(updateFields).filter(([key]) =>
            allowedFields.includes(key)
        );

        if (updateEntries.length === 0) {
            return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 });
        }

        const setClause = updateEntries.map(([key], index) =>
            `${key} = $${index + 2}`
        ).join(', ');

        const query = `
      UPDATE bookings 
      SET ${setClause}, last_updated = NOW(), updated_by = $${updateEntries.length + 2}
      WHERE id = $1
      RETURNING *
    `;

        const params = [
            id,
            ...updateEntries.map(([, value]) => value),
            updated_by || 'system'
        ];

        const client = await pool.connect();
        try {
            const result = await client.query(query, params);
            if (result.rows.length === 0) {
                return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
            }
            return NextResponse.json(result.rows[0]);
        } finally {
            client.release();
        }
    } catch (error) {
        console.error('PUT booking error:', error);
        return NextResponse.json({ error: 'Failed to update booking' }, { status: 500 });
    }
}

// DELETE - Remove booking
export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Booking ID required' }, { status: 400 });
        }

        const client = await pool.connect();
        try {
            const result = await client.query('DELETE FROM bookings WHERE id = $1 RETURNING *', [id]);
            if (result.rows.length === 0) {
                return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
            }
            return NextResponse.json({ message: 'Booking deleted successfully', booking: result.rows[0] });
        } finally {
            client.release();
        }
    } catch (error) {
        console.error('DELETE booking error:', error);
        return NextResponse.json({ error: 'Failed to delete booking' }, { status: 500 });
    }
}