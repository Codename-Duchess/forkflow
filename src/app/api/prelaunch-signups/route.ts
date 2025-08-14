import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export async function POST(req: NextRequest) {
    try {
        const { first_name, last_name, email, modules, total_price } = await req.json();

        if (!email || !Array.isArray(modules)) {
            return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
        }

        const client = await pool.connect();
        await client.query(
            'INSERT INTO prelaunch_signups (first_name, last_name, email, modules, total_price, created_at) VALUES ($1, $2, $3, $4, $5, NOW())',
            [first_name, last_name, email, modules, total_price]
        );
        client.release();

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Signup API error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
