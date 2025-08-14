import { Pool } from "pg"
import bcryptjs from "bcryptjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
})

export async function query(text: string, params?: any[]) {
    const client = await pool.connect()
    try {
        const result = await client.query(text, params)
        return result.rows
    } finally {
        client.release()
    }
}

export async function hashPassword(password: string) {
    return await bcryptjs.hash(password, 12)
}

export async function verifyPassword(password: string, hashedPassword: string) {
    return await bcryptjs.compare(password, hashedPassword)
}

export async function createUser(userData: {
    first_name: string
    last_name: string
    company_name: string
    email: string
    password: string
    user_sessions: number
    average_session_length: string
    account_status: string
    password_hash: string
    total_time: string
    last_updated: string
    invite_codes: string[]
}) {
    const hashedPassword = await hashPassword(userData.password)

    const result = await query(
        `INSERT INTO users (first_name, last_name, company_name, email, password_hash, user_sessions, average_session_length, account_status, total_time, last_updated, invite_codes)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
     RETURNING id, first_name, last_name, company_name email, user_sessions, average_session_length, account_status, total_time, last_updated, invite_codes`,
        [userData.first_name, userData.last_name, userData.company_name, userData.email, hashedPassword, userData.user_sessions, userData.average_session_length, userData.account_status, userData.total_time, userData.last_updated, userData.invite_codes],
    )

    return result[0]
}

export async function authenticateUser(email: string, password: string) {
    const result = await query(
        `SELECT id, first_name, last_name, email, password_hash
     FROM users 
     WHERE email = $1 AND account_status = "active"`,
        [email],
    )

    if (result.length === 0) {
        return null
    }

    const user = result[0]
    const isValid = await verifyPassword(password, user.password_hash)

    if (!isValid) {
        return null
    }

    // Update last login
    await query(
        `UPDATE users 
     SET last_login = CURRENT_TIMESTAMP, sessions = sessions + 1
     WHERE id = $1`,
        [user.id],
    )

    return {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email
    }
}

export async function createSession(userId: number) {
    const sessionToken = crypto.randomUUID()
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 7) // 7 days from now

    // Store session in database
    await query(
        `INSERT INTO sessions (user_id, session_token, expires_at) 
         VALUES ($1, $2, $3)`,
        [userId, sessionToken, expiresAt]
    )

    const cookieStore = await cookies()
    cookieStore.set("session", sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return sessionToken
}

export async function getSession() {
    const cookieStore = await cookies()
    return cookieStore.get("session")?.value
}

export async function validateSession(sessionToken: string) {
    const result = await query(
        `SELECT s.user_id, s.expires_at, u.id, u.first_name, u.last_name, u.email, u.company_name
         FROM sessions s
         JOIN users u ON s.user_id = u.id
         WHERE s.session_token = $1 AND s.expires_at > CURRENT_TIMESTAMP`,
        [sessionToken]
    )

    if (result.length === 0) {
        return null
    }

    return {
        user: {
            id: result[0].id,
            firstName: result[0].first_name,
            lastName: result[0].last_name,
            email: result[0].email,
            companyName: result[0].company_name
        }
    }
}

export async function getCurrentUser() {
    const sessionToken = await getSession()
    if (!sessionToken) {
        return null
    }

    const session = await validateSession(sessionToken)
    return session?.user || null
}

export async function destroySession() {
    const sessionToken = await getSession()
    if (sessionToken) {
        // Remove from database
        await query(
            `DELETE FROM sessions WHERE session_token = $1`,
            [sessionToken]
        )
    }

    const cookieStore = await cookies()
    cookieStore.delete("session")
}

export async function requireAuth() {
    const user = await getCurrentUser()
    if (!user) {
        redirect("/sign-in")
    }
    return user
}
