"use server"

import { getCurrentUser } from "@/lib/auth";
import { createNewStaffMember, editSelectedStaffMember, deleteSelectedStaffMember } from "@/lib/staff";
import { z } from 'zod';

const createStaffMemberSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    department: z.string().min(1, "Department is required"),
    jobTitle: z.string().min(1, "Job title is required"),
    staffMemberEmail: z.string().min(1, "Staff member email is required"),
    staffMemberPhone: z.string().min(1, "Staff member phone number is required"),
    iceName: z.string().min(1, "Emergency contact name is required"),
    icePhone: z.string().min(1, "Emergency contact phone number is required")
});

export async function createStaffMember(formData: FormData) {

    const rawData = {
        firstName: formData.get('firstName') as string,
        lastName: formData.get('lastName') as string,
        department: formData.get('department') as string,
        jobTitle: formData.get('jobTitle') as string,
        staffMemberEmail: formData.get('staffMemberEmail') as string,
        staffMemberPhone: formData.get('staffMemberPhone') as string,
        iceName: formData.get('iceName') as string,
        icePhone: formData.get('icePhone') as string
    };

    const user = await getCurrentUser();

    try {
        const validatedData = createStaffMemberSchema.parse(rawData)

        // Create booking data object
        const staffMemberData = {
            // restaurant_id: user.restaurants[0],
            restaurant_id: 1,
            first_name: validatedData.firstName,
            last_name: validatedData.lastName,
            department: validatedData.department,
            job_title: validatedData.jobTitle,
            staff_member_email: validatedData.staffMemberEmail,
            staff_member_phone: validatedData.staffMemberPhone,
            ice_name: validatedData.iceName,
            ice_phone: validatedData.icePhone
        }

        // Create the staff member
        const staffMember = await createNewStaffMember(staffMemberData);

        console.log('New staff member: ', staffMember);

    } catch (error) {
        console.error("Error adding new staff member:", error);

        if (error instanceof z.ZodError) {
            return { error: error.errors[0].message }
        }

        if (error instanceof Error) {
            return { error: `Error creating staff member: ${error.message}` }
        }

        return { error: "Failed to create staff member" }
    }
}
