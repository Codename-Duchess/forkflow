"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button/button";
import { Input } from "@/components/ui/input/input";
import { Label } from "@/components/ui/label/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card/card";
import { Alert, AlertDescription } from "@/components/ui/alert/alert";
import { z } from "zod";
import { createStaffMember } from "@/actions/staff";

// Validation schemas
const firstNameSchema = z.string().min(1, "First name is required");
const lastNameSchema = z.string().min(1, "Last name is required");
const departmentSchema = z.string().min(1, "Department is required");
const jobTitleSchema = z.string().min(1, "Job title is required");
const staffMemberEmailSchema = z.string().min(1, "Staff member email is required");
const staffMemberPhoneSchema = z.string().min(1, "Staff member phone number is required");
const iceNameSchema = z.string().min(1, "Emergency contact name is required");
const icePhoneSchema = z.string().min(1, "Emergency contact phone number is required");

interface FieldErrors {
    firstName?: string;
    lastName?: string;
    department?: string;
    jobTitle?: string;
    staffMemberEmail?: string;
    staffMemberPhone?: string;
    iceName?: string;
    icePhone?: string;
}

export function CreateStaffMemberForm() {
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
    const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());

    const validateField = (name: string, value: string) => {
        let schema;
        switch (name) {
            case 'firstName':
                schema = firstNameSchema;
                break;
            case 'lastName':
                schema = lastNameSchema;
                break;
            case 'department':
                schema = departmentSchema;
                break;
            case 'jobTitle':
                schema = jobTitleSchema;
                break;
            case 'staffMemberEmail':
                schema = staffMemberEmailSchema;
                break;
            case 'staffMemberPhone':
                schema = staffMemberPhoneSchema;
                break;
            case 'iceName':
                schema = iceNameSchema;
                break;
            case 'icePhone':
                schema = icePhoneSchema;
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

        // Only validate if field has been touched
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

    const handleSubmit = async (formData: FormData) => {
        setIsLoading(true);
        setError(null);
        setSuccess(null);


        // Validate all fields before submission
        const newFieldErrors: FieldErrors = {};
        const fields = ['firstName', 'lastName', 'department', 'jobTitle', 'staffMemberEmail', 'staffMemberPhone', 'iceName', 'icePhone'];

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

        const result = await createStaffMember(formData);

        if (result?.error) {
            setError(result.error);
            setIsLoading(false);
        }
    }

    return (
        <Card className="w-full max-w-2xl">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">Create new staff member</CardTitle>
                <CardDescription>Add a new staff member</CardDescription>
            </CardHeader>
            <CardContent>
                <form action={handleSubmit} id="add-staff-form" className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="firstName">First name</Label>
                        <Input
                            id="firstName"
                            name="firstName"
                            disabled={isLoading}
                            onChange={handleFieldChange}
                            onBlur={handleFieldBlur}
                            className={getFieldClassName('firstName', '')}
                            type="text"
                        />
                        {fieldErrors.firstName && (
                            <p className="text-sm text-red-600 mt-1">{fieldErrors.firstName}</p>
                        )}
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="lastName">Last name</Label>
                            <Input
                                id="lastName"
                                name="lastName"
                                disabled={isLoading}
                                onChange={handleFieldChange}
                                onBlur={handleFieldBlur}
                                className={getFieldClassName('lastName', '')}
                                type="text"
                            />
                            {fieldErrors.lastName && (
                                <p className="text-sm text-red-600 mt-1">{fieldErrors.lastName}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="department">Department</Label>
                            <Input
                                id="department"
                                name="department"
                                disabled={isLoading}
                                onChange={handleFieldChange}
                                onBlur={handleFieldBlur}
                                className={getFieldClassName('department', '')}
                                type="text"
                            />
                            {fieldErrors.department && (
                                <p className="text-sm text-red-600 mt-1">{fieldErrors.department}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="jobTitle">Job title</Label>
                                <Input
                                    id="jobTitle"
                                    name="jobTitle"
                                    disabled={isLoading}
                                    onChange={handleFieldChange}
                                    onBlur={handleFieldBlur}
                                    className={getFieldClassName('jobTitle', '')}
                                />
                                {fieldErrors.jobTitle && (
                                    <p className="text-sm text-red-600 mt-1">{fieldErrors.jobTitle}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="staffMemberEmail">Staff member email</Label>
                                <Input
                                    id="staffMemberEmail"
                                    name="staffMemberEmail"
                                    disabled={isLoading}
                                    onChange={handleFieldChange}
                                    onBlur={handleFieldBlur}
                                    className={getFieldClassName('staffMemberEmail', '')}
                                    type="email"
                                />
                                {fieldErrors.staffMemberEmail && (
                                    <p className="text-sm text-red-600 mt-1">{fieldErrors.staffMemberEmail}</p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="staffMemberPhone">Staff member phone number</Label>
                            <Input
                                id="staffMemberPhone"
                                name="staffMemberPhone"
                                disabled={isLoading}
                                onChange={handleFieldChange}
                                onBlur={handleFieldBlur}
                                className={getFieldClassName('staffMemberPhone', '')}
                                type="tel"
                            />
                            {fieldErrors.staffMemberPhone && (
                                <p className="text-sm text-red-600 mt-1">{fieldErrors.staffMemberPhone}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="iceName">Emergency contact name</Label>
                            <Input
                                id="iceName"
                                name="iceName"
                                disabled={isLoading}
                                onChange={handleFieldChange}
                                onBlur={handleFieldBlur}
                                className={getFieldClassName('iceName', '')}
                                type="text"
                            />
                            {fieldErrors.iceName && (
                                <p className="text-sm text-red-600 mt-1">{fieldErrors.iceName}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="icePhone">Emergency contact phone number</Label>
                            <Input
                                id="icePhone"
                                name="icePhone"
                                disabled={isLoading}
                                onChange={handleFieldChange}
                                onBlur={handleFieldBlur}
                                className={getFieldClassName('icePhone', '')}
                                type="tel"
                            />
                            {fieldErrors.icePhone && (
                                <p className="text-sm text-red-600 mt-1">{fieldErrors.icePhone}</p>
                            )}
                        </div>
                    </div>

                    {error && (
                        <Alert variant="destructive">
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    {success && (
                        <Alert className="border-green-200 bg-green-50">
                            <AlertDescription className="text-green-800">{success}</AlertDescription>
                        </Alert>
                    )}

                    <div className="flex gap-4 pt-4">
                        <Button type="submit" disabled={isLoading} className="flex-1">
                            {isLoading ? "Creating staff member..." : "Create staff member"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}