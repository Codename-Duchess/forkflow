"use server"

import { getCurrentUser } from "@/lib/auth";
import { createNewBooking } from "@/lib/bookings"
// import { createNewBooking, editSelectedBooking, deleteSelectedBooking } from "@/lib/bookings"
import { z } from 'zod';

const createBookingSchema = z.object({
    bookingDate: z.string().min(1, "Booking date is required"),
    bookingTime: z.string().min(1, "Booking time is required"),
    partySize: z.string().min(1, "Party size is required"),
    specialRequests: z.string().optional(),
    bookingName: z.string().min(1, "Booking name is required"),
    contactEmail: z.string().min(1, "Email address is required"),
    contactPhone: z.string().optional()
});

export async function createBooking(formData: FormData) {

    console.log('Hit createBooking function in actions.')

    const rawData = {
        bookingDate: formData.get('bookingDate') as string,
        bookingTime: formData.get('bookingTime') as string,
        partySize: formData.get('partySize') as string,
        specialRequests: formData.get('specialRequests') as string || "",
        bookingName: formData.get('bookingName') as string,
        contactEmail: formData.get('contactEmail') as string,
        contactPhone: formData.get('contactPhone') as string || "",
    };

    console.log('rawData: ', rawData)

    const user = await getCurrentUser();

    console.log("user: ", user);

    try {
        const validatedData = createBookingSchema.parse(rawData)

        // Create booking data object
        const bookingData = {
            // restaurant_id: user.restaurants[0],
            restaurant_id: 1,
            booking_date: validatedData.bookingDate,
            booking_time: validatedData.bookingTime,
            party_size: parseInt(validatedData.partySize),
            special_requests: validatedData.specialRequests,
            booking_name: validatedData.bookingName,
            contact_email: validatedData.contactEmail,
            contact_phone: validatedData.contactPhone,
            booking_status: 'pending'
        }

        // Create the booking
        const booking = await createNewBooking(bookingData);

        console.log('New booking: ', booking);

    } catch (error) {
        console.error("Error adding new booking:", error);

        if (error instanceof z.ZodError) {
            return { error: error.errors[0].message }
        }

        if (error instanceof Error) {
            return { error: `Error creating booking: ${error.message}` }
        }

        return { error: "Failed to create booking" }
    }
}
