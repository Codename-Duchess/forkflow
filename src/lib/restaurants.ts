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

export async function createNewRestaurant(restaurantData: {
    owner_id: number,
    restaurant_name: string,
    address_line1: string,
    address_line2: string,
    city: string,
    county: string,
    postcode: string
}) {

    const result = await query(
        `INSERT INTO restaurants (owner_id, restaurant_name, address_line1, address_line2, city, county, postcode)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING id, owner_id, restaurant_name, address_line1, address_line2, city, county, postcode`,
        [restaurantData.owner_id, restaurantData.restaurant_name, restaurantData.address_line1, restaurantData.address_line2, restaurantData.city, restaurantData.county, restaurantData.postcode]
    )

    return result[0]

}

export async function editSelectedRestaurant() {

}

export async function deleteSelectedRestaurant() {
    
}




