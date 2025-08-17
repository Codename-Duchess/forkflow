"use client";

import { useEffect, useState } from "react";
import { useView } from "@/context/ViewContext";
import Bookings from "../admin-feature-panels/bookings";
import Restaurants from "../admin-feature-panels/restaurants";

interface UserCompact {
    id: string;
    firstName: string;
    lastName: string;
    companyName: string;
    email: string;
}

interface AdminPageComponentProps {
    user: UserCompact;
}

const AdminPageComponent = ({ user }: AdminPageComponentProps) => {

    const { selectedView } = useView();

useEffect(() => {
    console.log("user in AdminPageComponent:", user);
    console.log("selectedView in AdminPageComponent:", selectedView);
}, [user, selectedView]);


    return (
        <>
            {selectedView === 'dashboard' && (
                <div className="p-4">
                    <h1 className="text-lg font-semibold">Dashboard</h1>
                    <p>Welcome to the admin dashboard, {user.firstName}</p>
                </div>
            )}
            {selectedView === 'bookings' && (
                <div className="p-4">
                    <h1 className="text-lg font-semibold">Bookings</h1>
                    <Bookings />
                </div>
            )}
            {selectedView === 'restaurants' && (
                <div className="p-4">
                    <h1 className="text-lg font-semibold">Restaurants</h1>
                    <Restaurants user={user} />
                </div>
            )}
            {selectedView === 'staff' && (
                <div className="p-4">
                    <h1 className="text-lg font-semibold">Staff</h1>
                    <p>Welcome to the admin staff page, {user.firstName}</p>
                </div>
            )}
            {selectedView === 'reports' && (
                <div className="p-4">
                    <h1 className="text-lg font-semibold">Reports</h1>
                    <p>Welcome to the admin reports page, {user.firstName}</p>
                </div>
            )}
            {selectedView === 'settings' && (
                <div className="p-4">
                    <h1 className="text-lg font-semibold">Settings</h1>
                    <p>Welcome to the admin settings page, {user.firstName}</p>
                </div>
            )}
        </>
    );
}

export default AdminPageComponent;