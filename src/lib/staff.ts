import { Pool } from "pg";

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export async function query(text: string, params?: any[]) {
    const client = await pool.connect()
    try {
        const result = await client.query(text, params)
        return result.rows
    } finally {
        client.release()
    }
}

export async function createNewStaffMember(staffMemberData: {
    restaurant_id: number,
    first_name: string,
    last_name: string,
    department: string,
    job_title: string,
    staff_member_email: string,
    staff_member_phone: string,
    ice_name: string,
    ice_phone: string
}) {

    const result = await query(
        `INSERT INTO staff (restaurant_id, first_name, last_name, department, job_title, staff_member_email, staff_member_phone, ice_name, ice_phone)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
     RETURNING id, restaurant_id, first_name, last_name, department, job_title, staff_member_email, staff_member_phone, ice_name, ice_phone`,
        [staffMemberData.restaurant_id, staffMemberData.first_name, staffMemberData.last_name, staffMemberData.department, staffMemberData.job_title, staffMemberData.staff_member_email, staffMemberData.staff_member_phone, staffMemberData.ice_name, staffMemberData.ice_phone]
    )

    return result[0]

}

export async function editSelectedStaffMember() {

}

export async function deleteSelectedStaffMember() {

}
