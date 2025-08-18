import { v4 as uuidv4 } from 'uuid';
import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export async function generateInviteCodesForUser(formData: FormData) {
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        const numberOfCodes = parseInt(formData.get('numberOfCodes') as string, 10);
        const userId = parseInt(formData.get('userId') as string, 10);

        // Generate all invite codes
        const inviteCodes = Array.from({ length: numberOfCodes }, () => uuidv4());

        // Build values for bulk insert
        const values = inviteCodes.map((code, index) =>
            `(${index * 3 + 1}, ${index * 3 + 2}, ${index * 3 + 3})`
        ).join(', ');

        const params = inviteCodes.flatMap(code => [code, userId, 'active']);

        // Single insert query
        await client.query(
            `INSERT INTO invite_codes (code, user_id, status, created_at, updated_at) VALUES ${values}`,
            params
        );

        // Update user table
        await client.query(
            'UPDATE users SET invite_codes_generated = COALESCE(invite_codes_generated, 0) + $1 WHERE id = $2',
            [numberOfCodes, userId]
        );

        await client.query('COMMIT');

    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
}