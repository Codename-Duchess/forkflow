// import { db } from "./db" // Adjust import based on your DB setup

// export interface InviteCode {
//     id: number;
//     code: string;
//     userId: number;
//     status: "Invited" | "Signed up";
//     createdAt: string;
//     updatedAt: string;
//     newUserId: number;
// }

// export async function getInviteCodeByCode(code: string): Promise<InviteCode | null> {
//     try {
//         // Adjust this query based on your database setup
//         const result = await db.query(
//             'SELECT * FROM invite_codes WHERE code = $1',
//             [code]
//         );

//         return result.rows[0] || null;
//     } catch (error) {
//         console.error('Error fetching invite code:', error);
//         return null;
//     }
// }

// export async function updateInviteCodeStatus(
//     inviteId: number,
//     status: "Signed up",
//     newUserId: number
// ): Promise<void> {
//     try {
//         await db.query(
//             'UPDATE invite_codes SET status = $1, newUserId = $2, updatedAt = $3 WHERE id = $4',
//             [status, newUserId, new Date().toISOString(), inviteId]
//         );
//     } catch (error) {
//         console.error('Error updating invite code:', error);
//         throw error;
//     }
// }

// export async function createInviteCode(userId: number): Promise<string> {
//     const code = crypto.randomUUID();

//     try {
//         await db.query(
//             'INSERT INTO invite_codes (code, userId, status, createdAt, updatedAt, newUserId) VALUES ($1, $2, $3, $4, $5, $6)',
//             [code, userId, "Invited", new Date().toISOString(), new Date().toISOString(), 0]
//         );

//         return code;
//     } catch (error) {
//         console.error('Error creating invite code:', error);
//         throw error;
//     }
// }

// export async function getUserInviteCodes(userId: number): Promise<InviteCode[]> {
//     try {
//         const result = await db.query(
//             'SELECT * FROM invite_codes WHERE userId = $1 ORDER BY createdAt DESC',
//             [userId]
//         );

//         return result.rows;
//     } catch (error) {
//         console.error('Error fetching user invite codes:', error);
//         return [];
//     }
// }