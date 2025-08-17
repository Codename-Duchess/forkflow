import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// GET all restaurants for an owner
async function getRestaurants(ownerId: string) {
    const client = await pool.connect();
    try {
        const result = await client.query(
            'SELECT * FROM restaurants WHERE owner_id = $1 ORDER BY name ASC',
            [ownerId]
        );
        return result.rows;
    } finally {
        client.release();
    }
}

// GET single restaurant by ID
async function getRestaurantById(restaurantId: string) {
    const client = await pool.connect();
    try {
        const result = await client.query(
            'SELECT * FROM restaurants WHERE id = $1',
            [restaurantId]
        );
        return result.rows[0] || null;
    } finally {
        client.release();
    }
}

// GET - Fetch restaurants
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const ownerId = searchParams.get('owner_id');
        const restaurantId = searchParams.get('restaurant_id');

        if (restaurantId) {
            const restaurant = await getRestaurantById(restaurantId);
            if (!restaurant) {
                return NextResponse.json({ error: 'Restaurant not found' }, { status: 404 });
            }
            return NextResponse.json(restaurant);
        }

        if (ownerId) {
            const restaurants = await getRestaurants(ownerId);
            return NextResponse.json(restaurants);
        }

        return NextResponse.json({ error: 'owner_id or restaurant_id required' }, { status: 400 });
    } catch (error) {
        console.error('GET restaurants error:', error);
        return NextResponse.json({ error: 'Failed to fetch restaurants' }, { status: 500 });
    }
}

// POST - Create new restaurant
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            owner_id,
            name,
            address_line1,
            address_line2,
            city,
            county,
            postcode
        } = body;

        // Validation
        if (!owner_id || !name) {
            return NextResponse.json({ error: 'owner_id and name are required' }, { status: 400 });
        }

        const query = `
      INSERT INTO restaurants (
        owner_id, name, address_line1, address_line2, 
        city, county, postcode, created_at, updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW())
      RETURNING *
    `;

        const params = [
            owner_id,
            name,
            address_line1 || null,
            address_line2 || null,
            city || null,
            county || null,
            postcode || null
        ];

        const client = await pool.connect();
        try {
            const result = await client.query(query, params);
            return NextResponse.json(result.rows[0], { status: 201 });
        } finally {
            client.release();
        }
    } catch (error) {
        console.error('POST restaurant error:', error);
        return NextResponse.json({ error: 'Failed to create restaurant' }, { status: 500 });
    }
}

// PUT - Update existing restaurant
export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const { id, ...updateFields } = body;

        if (!id) {
            return NextResponse.json({ error: 'Restaurant ID required' }, { status: 400 });
        }

        // Build dynamic query based on provided fields
        const allowedFields = [
            'name', 'address_line1', 'address_line2',
            'city', 'county', 'postcode'
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
      UPDATE restaurants 
      SET ${setClause}, updated_at = NOW()
      WHERE id = $1
      RETURNING *
    `;

        const params = [
            id,
            ...updateEntries.map(([, value]) => value)
        ];

        const client = await pool.connect();
        try {
            const result = await client.query(query, params);
            if (result.rows.length === 0) {
                return NextResponse.json({ error: 'Restaurant not found' }, { status: 404 });
            }
            return NextResponse.json(result.rows[0]);
        } finally {
            client.release();
        }
    } catch (error) {
        console.error('PUT restaurant error:', error);
        return NextResponse.json({ error: 'Failed to update restaurant' }, { status: 500 });
    }
}

// DELETE - Remove restaurant
export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Restaurant ID required' }, { status: 400 });
        }

        const client = await pool.connect();
        try {
            const result = await client.query('DELETE FROM restaurants WHERE id = $1 RETURNING *', [id]);
            if (result.rows.length === 0) {
                return NextResponse.json({ error: 'Restaurant not found' }, { status: 404 });
            }
            return NextResponse.json({ message: 'Restaurant deleted successfully', restaurant: result.rows[0] });
        } finally {
            client.release();
        }
    } catch (error) {
        console.error('DELETE restaurant error:', error);
        return NextResponse.json({ error: 'Failed to delete restaurant' }, { status: 500 });
    }
}