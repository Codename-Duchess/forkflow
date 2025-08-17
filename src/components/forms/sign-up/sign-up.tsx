"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button/button";
import { Input } from "@/components/ui/input/input";
import { Label } from "@/components/ui/label/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card/card";
import { Alert, AlertDescription } from "@/components/ui/alert/alert";
import { signup } from "@/actions/auth";
import Link from "next/link";
import { z } from "zod";
import Image from "next/image";

// Validation schemas - match your backend schema
const emailSchema = z.string().email("Please enter a valid email address");
const passwordSchema = z.string().min(8, "Password must be at least 8 characters");
const nameSchema = z.string().min(1, "This field is required");
const companyNameSchema = z.string().min(1, "This field is required");
const inviteCodeSchema = z.string().min(1, "Invite code is required");

interface FieldErrors {
    inviteCode?: string;
    firstName?: string;
    lastName?: string;
    companyName?: string;
    email?: string;
    password?: string;
}

export function SignupForm() {
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
    const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());

    const validateField = (name: string, value: string) => {
        let schema;
        switch (name) {
            case 'email':
                schema = emailSchema;
                break;
            case 'password':
                schema = passwordSchema;
                break;
            case 'firstName':
            case 'lastName':
            case 'companyName':
                schema = nameSchema;
                break;
            case 'inviteCode':
                schema = inviteCodeSchema;
                break;
            default:
                return null;
        }

        try {
            schema.parse(value);
            return null;
        } catch (error) {
            if (error instanceof z.ZodError) {
                return error.errors[0].message;
            }
            return "Invalid input";
        }
    };

    const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        // Only validate if field has been touched (user has interacted with it)
        if (touchedFields.has(name)) {
            const error = validateField(name, value);
            setFieldErrors(prev => ({
                ...prev,
                [name]: error
            }));
        }
    };

    const handleFieldBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        // Mark field as touched and validate
        setTouchedFields(prev => new Set(prev).add(name));
        const error = validateField(name, value);
        setFieldErrors(prev => ({
            ...prev,
            [name]: error
        }));
    };

    const getFieldClassName = (fieldName: string, baseClassName: string) => {
        const hasError = fieldErrors[fieldName as keyof FieldErrors];
        if (hasError) {
            return `${baseClassName} border-red-500 bg-red-50 focus-visible:ring-red-500`;
        }
        return baseClassName;
    };

    async function handleSubmit(formData: FormData) {
        setIsLoading(true);
        setError(null);

        // Validate all fields before submission
        const newFieldErrors: FieldErrors = {};
        const fields = ['inviteCode', 'firstName', 'lastName', 'companyName', 'email', 'password'];

        fields.forEach(field => {
            const value = formData.get(field) as string;
            const error = validateField(field, value);
            if (error) {
                newFieldErrors[field as keyof FieldErrors] = error;
            }
        });

        if (Object.keys(newFieldErrors).length > 0) {
            setFieldErrors(newFieldErrors);
            setTouchedFields(new Set(fields));
            setIsLoading(false);
            return;
        }

        console.log('formData: ', formData)

        const result = await signup(formData);

        if (result?.error) {
            setError(result.error);
            setIsLoading(false);
        }
    }


    return (
        <div className="h-screen flex items-center justify-center">
            <Card className="w-full max-w-lg">
                <CardHeader className="text-center">
                    <Image src={"/forkflow-logo.png"} height={80} width={80} alt={"Forkflow logo"} style={{ alignSelf: 'center' }} />
                    <CardTitle className="text-5xl font-bold ff-title-font text-ff-dark-blue">Forkflow</CardTitle>
                    <CardDescription>Optimise your restaurant management workflows and manage everything in one place</CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={handleSubmit} className="space-y-4" autoComplete="off">
                        <div className="space-y-2">
                            <Label htmlFor="inviteCode">Invite code</Label>
                            <Input
                                id="inviteCode"
                                name="inviteCode"
                                required
                                disabled={isLoading}
                                onChange={handleFieldChange}
                                onBlur={handleFieldBlur}
                                className={getFieldClassName('inviteCode', '')}
                            />
                            {fieldErrors.inviteCode && (
                                <p className="text-sm text-red-600 mt-1">{fieldErrors.inviteCode}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="firstName">First name</Label>
                                <Input
                                    id="firstName"
                                    name="firstName"
                                    required
                                    disabled={isLoading}
                                    onChange={handleFieldChange}
                                    onBlur={handleFieldBlur}
                                    className={getFieldClassName('firstName', '')}
                                />
                                {fieldErrors.firstName && (
                                    <p className="text-sm text-red-600 mt-1">{fieldErrors.firstName}</p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastName">Last name</Label>
                                <Input
                                    id="lastName"
                                    name="lastName"
                                    required
                                    disabled={isLoading}
                                    onChange={handleFieldChange}
                                    onBlur={handleFieldBlur}
                                    className={getFieldClassName('lastName', '')}
                                />
                                {fieldErrors.lastName && (
                                    <p className="text-sm text-red-600 mt-1">{fieldErrors.lastName}</p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="companyName">Company name</Label>
                            <Input
                                id="companyName"
                                name="companyName"
                                type="text"
                                required
                                disabled={isLoading}
                                onChange={handleFieldChange}
                                onBlur={handleFieldBlur}
                                className={getFieldClassName('companyName', '')}
                                autoComplete="off"
                            />
                            {fieldErrors.companyName && (
                                <p className="text-sm text-red-600 mt-1">{fieldErrors.companyName}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    disabled={isLoading}
                                    onChange={handleFieldChange}
                                    onBlur={handleFieldBlur}
                                    className={getFieldClassName('email', '')}
                                    autoComplete="off"
                                />
                                {fieldErrors.email && (
                                    <p className="text-sm text-red-600 mt-1">{fieldErrors.email}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    disabled={isLoading}
                                    onChange={handleFieldChange}
                                    onBlur={handleFieldBlur}
                                    className={getFieldClassName('password', '')}
                                    autoComplete="new-password"
                                />
                                {fieldErrors.password && (
                                    <p className="text-sm text-red-600 mt-1">{fieldErrors.password}</p>
                                )}
                            </div>
                        </div>

                        {error && (
                            <Alert variant="destructive">
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? "Creating account..." : "Sign up"}
                        </Button>
                    </form>

                    <div className="mt-4 text-center text-sm">
                        Already have an account?{" "}
                        <Link href="/signin" className="text-blue-600 hover:underline">
                            Sign in
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}