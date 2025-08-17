"use server"

import { INVITE_CODES } from "@/constants/mock-invite-codes"
import { createUser, authenticateUser, createSession, destroySession } from "@/lib/auth"
import { redirect } from "next/navigation"
import { z } from "zod"

function validateInviteCode(inputCode: string): boolean {
    return INVITE_CODES.some(inviteCode => inviteCode.code === inputCode && inviteCode.status === 'Invited');
}

const signupSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    companyName: z.string().min(1, "Company name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    inviteCode: z.string()
        .min(1, "Invite code is required")
        .uuid("Invalid invite code format"),
})

const signinSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required")
})

export async function signup(formData: FormData) {
    const rawData = {
        firstName: formData.get("firstName") as string,
        lastName: formData.get("lastName") as string,
        companyName: formData.get("companyName") as string,
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        inviteCode: formData.get("inviteCode") as string,
    }

    try {
        const validatedData = signupSchema.parse(rawData)
        const validInviteCode = validateInviteCode(validatedData.inviteCode);

        if (!validInviteCode) {
            return { error: "Invalid invite code" }
        }

        // Create user data object
        const userData = {
            first_name: validatedData.firstName,
            last_name: validatedData.lastName,
            company_name: validatedData.companyName,
            email: validatedData.email,
            password: validatedData.password,
            user_sessions: 0,
            average_session_length: "0 minutes",
            account_status: "active",
            password_hash: "", // This will be set in the createUser function
            total_time: "0 minutes",
            last_updated: new Date().toISOString(),
            invite_codes: []
        }

        // Create the user
        const user = await createUser(userData)

        // // Update the invite code status and link it to the new user
        // await updateInviteCodeStatus(inviteCode.id, "Signed up", user.id)

        await createSession(user.id)

    } catch (error) {
        console.error("Signup error:", error)

        if (error instanceof z.ZodError) {
            return { error: error.errors[0].message }
        }

        if (error instanceof Error) {
            if (error.message.includes("duplicate key")) {
                return { error: "Email already exists" }
            }
            if (error.message.includes("connect")) {
                return { error: "Database connection failed" }
            }
            return { error: `Database error: ${error.message}` }
        }

        return { error: "Failed to create account" }
    }
    redirect("/admin")
}

export async function signin(formData: FormData) {
    const rawData = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    }

    let user
    try {
        const validatedData = signinSchema.parse(rawData)
        user = await authenticateUser(validatedData.email, validatedData.password)

        if (!user) {
            return { error: "Invalid email or password" }
        }

        await createSession(user.id)
    } catch (error) {
        console.error("Signin error:", error)

        if (error instanceof z.ZodError) {
            return { error: error.errors[0].message }
        }

        if (error instanceof Error) {
            return { error: `Authentication error: ${error.message}` }
        }

        return { error: "Failed to sign in" }
    }

    if (user.id) {
        redirect("/admin")
    } else {
        redirect("/")
    }
}

export async function signout() {
    await destroySession()
    redirect("/sign-in")
}
