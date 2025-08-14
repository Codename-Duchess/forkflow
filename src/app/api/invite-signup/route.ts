import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export async function POST(req: NextRequest) {
    const { email, modules, total, invite_code } = await req.json();
    if (!email || !Array.isArray(modules) || !invite_code) {
        return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const client = await pool.connect();
    try {
        const { rows } = await client.query(
            'SELECT * FROM invite_codes WHERE code = $1',
            [invite_code]
        );

        if (!rows.length) return NextResponse.json({ error: 'Invalid code' }, { status: 403 });

        const invite = rows[0];
        if (invite.used_by.length >= invite.max_uses) {
            return NextResponse.json({ error: 'Invite code limit reached' }, { status: 403 });
        }

        await client.query(
            'INSERT INTO prelaunch_signups (email, modules, total_price, invite_code, created_at) VALUES ($1, $2, $3, $4, NOW())',
            [email, modules, total, invite_code]
        );

        await client.query(
            'UPDATE invite_codes SET used_by = array_append(used_by, $1) WHERE code = $2',
            [email, invite_code]
        );

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    } finally {
        client.release();
    }
}
