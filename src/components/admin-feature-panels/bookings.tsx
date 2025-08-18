"use client";

import BookingsTable from "../Bookings/BookingsTable";
import { CreateBookingForm } from "../forms/bookings/create-booking";
import { useEffect, useState } from "react";
// import BookingsTable from "../Bookings/BookingsTable";

interface BookingsProps {
    restaurantId: number
}

interface Booking {
    id: number;
    restaurant_id: number;
    created_at: string;
    booking_date: string;
    booking_time: string;
    party_size: number;
    special_requests: string;
    booking_status: string;
    booking_name: string;
    contact_email: string;
    contact_phone: string;
    last_updated: string;
    updated_by: number;
}

const Bookings = ({ restaurantId }: BookingsProps) => {
    const [bookings, setBookings] = useState<Booking[]>([]);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                if (!restaurantId) {
                    console.error("restaurantId not found");
                    return;
                }
                const response = await fetch(`/api/bookings?restaurant_id=${restaurantId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch bookings');
                }
                const data = await response.json();
                console.log('Fetched bookings:', data);
                setBookings(data);
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        }
        fetchBookings();
    }, [restaurantId]);

    return (
        <div>
            <h1>Bookings</h1>
            {restaurantId && <CreateBookingForm />}
            <BookingsTable bookingsData={bookings} />
        </div>
    );
}

export default Bookings;