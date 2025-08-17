"use client";

import { getCurrentUser } from "@/lib/auth";
import { CreateRestaurantForm } from "../forms/create-restaurant/create-restaurant";
import { useEffect, useState } from "react";
import RestaurantsTable from "../Restaurants/RestaurantsTable";

interface RestaurantsProps {
    user: { id: string; firstName: string; lastName: string; companyName: string; email: string };
}

// ADD THIS INTERFACE
interface Restaurant {
    id: number;
    owner_id: number;
    name: string;
    address_line1: string;
    address_line2: string | null;
    city: string;
    county: string | null;
    postcode: string;
    created_at: string;
    updated_at: string;
}

const Restaurants = ({ user }: RestaurantsProps) => {
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]); 

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                if (!user) {
                    console.error("User not found");
                    return;
                }
                const response = await fetch(`/api/restaurants?owner_id=${user.id}`); // CHANGE owner_id
                if (!response.ok) {
                    throw new Error('Failed to fetch restaurants');
                }
                const data = await response.json();
                console.log('Fetched restaurants:', data);
                setRestaurants(data);
            } catch (error) {
                console.error('Error fetching restaurants:', error);
            }
        }
        fetchRestaurants();
    }, [user]);

    return (
        <div>
            <h1>Restaurants - {user.firstName}</h1>
            {user && <CreateRestaurantForm />}
            <RestaurantsTable restaurants={restaurants} />

            
        </div>
    );
}

export default Restaurants;