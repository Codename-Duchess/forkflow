"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button/button";
import { Input } from "@/components/ui/input/input";
import { Label } from "@/components/ui/label/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card/card";
import { Alert, AlertDescription } from "@/components/ui/alert/alert";
import { z } from "zod";
import { createBooking } from "@/actions/bookings";

// Validation schemas
const bookingDateSchema = z.string().min(1, "Booking date is required");
const bookingTimeSchema = z.string().min(1, "Booking time is required");
const partySizeSchema = z.string().min(1, "Party size is required");
const specialRequestsSchema = z.string().optional();
const bookingNameSchema = z.string().min(1, "Booking name is required");
const contactEmailSchema = z.string().min(1, "Contact email address is required");
const contactPhoneSchema = z.string().optional();

interface FieldErrors {
    bookingDate?: string;
    bookingTime?: string;
    partySize?: string;
    specialRequests?: string;
    bookingName?: string;
    contactEmail?: string;
    contactPhone?: string;
}

export function CreateBookingForm() {
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
    const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());

    const validateField = (name: string, value: string) => {
        let schema;
        switch (name) {
            case 'bookingDate':
                schema = bookingDateSchema;
                break;
            case 'bookingTime':
                schema = bookingTimeSchema;
                break;
            case 'partySize':
                schema = partySizeSchema;
                break;
            case 'specialRequests':
                schema = specialRequestsSchema;
                break;
            case 'bookingName':
                schema = bookingNameSchema;
                break;
            case 'contactEmail':
                schema = contactEmailSchema;
                break;
            case 'contactPhone':
                schema = contactPhoneSchema;
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
        const fields = ['bookingDate', 'bookingTime', 'partySize', 'specialRequests', 'bookingName', 'contactEmail', 'contactPhone'];

        fields.forEach(field => {
            const value = formData.get(field) as string;
            const error = validateField(field, value);
            console.log('Errorrr: ', error)
            if (error) {
                newFieldErrors[field as keyof FieldErrors] = error;
            }
        });

        console.log("Made it to here: ", fieldErrors);

        if (Object.keys(newFieldErrors).length > 0) {
            setFieldErrors(newFieldErrors);
            setTouchedFields(new Set(fields));
            setIsLoading(false);
            return;
        }

        console.log('formData: ', formData);

        const result = await createBooking(formData);

        console.log("Made it to here and got a result: ", result);


        if (result?.error) {
            setError(result.error);
            setIsLoading(false);
        }
    }

    return (
        <Card className="w-full max-w-2xl">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">Create new booking</CardTitle>
                <CardDescription>Add a new booking</CardDescription>
            </CardHeader>
            <CardContent>
                <form action={handleSubmit} id="booking-form" className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="bookingDate">Booking date</Label>
                        <Input
                            id="bookingDate"
                            name="bookingDate"
                            disabled={isLoading}
                            onChange={handleFieldChange}
                            onBlur={handleFieldBlur}
                            className={getFieldClassName('bookingDate', '')}
                            type="date"
                        />
                        {fieldErrors.bookingDate && (
                            <p className="text-sm text-red-600 mt-1">{fieldErrors.bookingDate}</p>
                        )}
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="bookingTime">Booking time</Label>
                            <Input
                                id="bookingTime"
                                name="bookingTime"
                                disabled={isLoading}
                                onChange={handleFieldChange}
                                onBlur={handleFieldBlur}
                                className={getFieldClassName('bookingTime', '')}
                                type="time"
                            />
                            {fieldErrors.bookingTime && (
                                <p className="text-sm text-red-600 mt-1">{fieldErrors.bookingTime}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="partySize">Party size</Label>
                            <Input
                                id="partySize"
                                name="partySize"
                                disabled={isLoading}
                                onChange={handleFieldChange}
                                onBlur={handleFieldBlur}
                                className={getFieldClassName('partySize', '')}
                                type="number"
                            />
                            {fieldErrors.partySize && (
                                <p className="text-sm text-red-600 mt-1">{fieldErrors.partySize}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="specialRequests">Special requests</Label>
                                <Input
                                    id="specialRequests"
                                    name="specialRequests"
                                    disabled={isLoading}
                                    onChange={handleFieldChange}
                                    onBlur={handleFieldBlur}
                                    className={getFieldClassName('specialRequests', '')}
                                />
                                {fieldErrors.specialRequests && (
                                    <p className="text-sm text-red-600 mt-1">{fieldErrors.specialRequests}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="bookingName">Booking name</Label>
                                <Input
                                    id="bookingName"
                                    name="bookingName"
                                    disabled={isLoading}
                                    onChange={handleFieldChange}
                                    onBlur={handleFieldBlur}
                                    className={getFieldClassName('bookingName', '')}
                                />
                                {fieldErrors.bookingName && (
                                    <p className="text-sm text-red-600 mt-1">{fieldErrors.bookingName}</p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="contactEmail">Email address</Label>
                            <Input
                                id="contactEmail"
                                name="contactEmail"
                                disabled={isLoading}
                                onChange={handleFieldChange}
                                onBlur={handleFieldBlur}
                                className={getFieldClassName('contactEmail', '')}
                                type="email"
                            />
                            {fieldErrors.contactEmail && (
                                <p className="text-sm text-red-600 mt-1">{fieldErrors.contactEmail}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="contactPhone">Phone number</Label>
                            <Input
                                id="contactPhone"
                                name="contactPhone"
                                disabled={isLoading}
                                onChange={handleFieldChange}
                                onBlur={handleFieldBlur}
                                className={getFieldClassName('contactPhone', '')}
                                type="tel"
                            />
                            {fieldErrors.contactPhone && (
                                <p className="text-sm text-red-600 mt-1">{fieldErrors.contactPhone}</p>
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
                            {isLoading ? "Creating booking..." : "Create booking"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}