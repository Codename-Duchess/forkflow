"use client";

import { StaffMember } from "@/types/staff";
import StaffTable from "../Staff/StaffTable";
import { CreateStaffMemberForm } from "../forms/staff/create-staff";
import { useEffect, useState } from "react";

interface StaffProps {
    restaurantId: number
}

const Staff = ({ restaurantId }: StaffProps) => {
    const [staff, setStaff] = useState<StaffMember[]>([]);

    useEffect(() => {
        const fetchStaff = async () => {
            try {
                if (!restaurantId) {
                    console.error("restaurantId not found");
                    return;
                }
                const response = await fetch(`/api/staff?restaurant_id=${restaurantId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch staff');
                }
                const data = await response.json();
                console.log('Fetched staff:', data);
                setStaff(data);
            } catch (error) {
                console.error('Error fetching staff:', error);
            }
        }
        fetchStaff();
    }, [restaurantId]);

    return (
        <div>
            <h1>Staff</h1>
            {restaurantId && <CreateStaffMemberForm />}
            <StaffTable staffData={staff} />
        </div>
    );
}

export default Staff;