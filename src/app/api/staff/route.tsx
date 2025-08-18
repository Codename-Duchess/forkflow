import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// GET all stagff for a restaurant
async function getStaffForRestaurant(restaurantId: string) {
    const client = await pool.connect();
    try {
        const result = await client.query(
            'SELECT * FROM staff WHERE restaurant_id = $1 ORDER BY last_name DESC',
            [restaurantId]
        );
        return result.rows;
    } finally {
        client.release();
    }
}

// POST - Create new staff member
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            restaurant_id,
            first_name,
            last_name,
            department,
            job_title,
            staff_member_email,
            staff_member_phone,
            ice_name,
            ice_phone,
            updated_by
        } = body;

        // Validation
        if (!restaurant_id || !first_name || !last_name || !department || !job_title || !staff_member_email || !staff_member_phone || !ice_name || !ice_phone) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const query = `
      INSERT INTO staff (
        restaurant_id, first_name, last_name, department, job_title, staff_member_email, staff_member_phone, ice_name, ice_phone, created_at, last_updated, updated_by
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), NOW(), $10)
      RETURNING *
    `;

        const params = [
            restaurant_id,
            first_name,
            last_name,
            department,
            job_title,
            staff_member_email,
            staff_member_phone,
            ice_name,
            ice_phone,
            updated_by || 0
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
        return NextResponse.json({ error: 'Failed to create staff member' }, { status: 500 });
    }
}

