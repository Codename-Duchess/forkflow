"use server"

import { getCurrentUser } from "@/lib/auth";
import { createNewRestaurant, editSelectedRestaurant, deleteSelectedRestaurant } from "@/lib/restaurants"
import { z } from 'zod';

const createRestaurantSchema = z.object({
    restaurantName: z.string().min(1, "Restaurant name is required"),
    addressLine1: z.string().min(1, "Address line 1 is required"),
    addressLine2: z.string().optional(),
    city: z.string().min(1, "City is required"),
    county: z.string().optional(),
    postcode: z.string().regex(/^[A-Z]{1,2}[0-9]{1,2}[A-Z]?\s?[0-9][A-Z]{2}$/i, "Please enter a valid UK postcode")
});

export async function createRestaurant(formData: FormData) {

    console.log('Hit createRestaurant function in actions.')

    

    const rawData = {
        restaurantName: formData.get('restaurantName') as string,
        addressLine1: formData.get('addressLine1') as string,
        addressLine2: formData.get('addressLine2') as string || null,
        city: formData.get('city') as string,
        county: formData.get('county') as string || null,
        postcode: formData.get('postcode') as string
    };

    console.log('rawData: ', rawData)

const user = await getCurrentUser();

    console.log("user: ", user);

    try {
        const validatedData = createRestaurantSchema.parse(rawData)

        // Create restaurant data object
        const restaurantData = {
            owner_id: parseInt(user!.id),
            restaurant_name: validatedData.restaurantName,
            address_line1: validatedData.addressLine1!,
            address_line2: validatedData.addressLine2!,
            city: validatedData.city!,
            county: validatedData.county!,
            postcode: validatedData.postcode!
        }

        // Create the restaurant
        const restaurant = await createNewRestaurant(restaurantData)

        console.log('New restaurant: ', restaurant);

    } catch (error) {
        console.error("Error adding new restaurant:", error)

        if (error instanceof z.ZodError) {
            return { error: error.errors[0].message }
        }

        if (error instanceof Error) {
            return { error: `Error creating restaurant: ${error.message}` }
        }

        return { error: "Failed to create restaurant" }
    }
}



