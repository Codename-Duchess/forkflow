"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button/button"
import { Input } from "@/components/ui/input/input"
import { Label } from "@/components/ui/label/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card/card"
import { Alert, AlertDescription } from "@/components/ui/alert/alert"
import { generateInviteCodesForUser } from "@/lib/generateInviteCodes"
import { z } from "zod";

// Validation schemas - these validate the actual input values (strings that will be converted to numbers)
const userIdSchema = z.string().refine((val) => {
    const num = parseInt(val);
    return !isNaN(num) && num > 0;
}, "User ID must be a valid positive number");

const numberOfCodesSchema = z.string().refine((val) => {
    const num = parseInt(val);
    return !isNaN(num) && num > 0;
}, "Number of codes must be a valid positive number");

interface FieldErrors {
    userId?: string;
    numberOfCodes?: string;
}

export function GenerateInviteCodesForm() {
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
    const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());

    const validateField = (name: string, value: string) => {
        let schema;
        switch (name) {
            case 'userId':
                schema = userIdSchema;
                break;
            case 'numberOfCodes':
                schema = numberOfCodesSchema;
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
        setIsLoading(true)
        setError(null)

        const newFieldErrors: FieldErrors = {};
        const fields = ['userId', 'numberOfCodes'];

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

        try {
            await generateInviteCodesForUser(formData);
            // Success - maybe show success message or redirect
            setIsLoading(false);
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Failed to generate invite codes');
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold">Generate invite codes</CardTitle>
                </CardHeader>
                <CardContent>
                    <form action={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="userId">User ID</Label>
                            <Input
                                id="userId"
                                name="userId"
                                type="number"
                                placeholder="Enter user ID"
                                required
                                disabled={isLoading}
                                onChange={handleFieldChange}
                                onBlur={handleFieldBlur}
                                className={getFieldClassName('userId', '')}
                            />
                            {fieldErrors.userId && (
                                <p className="text-sm text-red-600 mt-1">{fieldErrors.userId}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="numberOfCodes">Number of codes to generate</Label>
                            <Input
                                id="numberOfCodes"
                                name="numberOfCodes"
                                type="number"
                                placeholder="Enter number of codes"
                                required
                                disabled={isLoading}
                                onChange={handleFieldChange}
                                onBlur={handleFieldBlur}
                                className={getFieldClassName('numberOfCodes', '')}
                            />
                            {fieldErrors.numberOfCodes && (
                                <p className="text-sm text-red-600 mt-1">{fieldErrors.numberOfCodes}</p>
                            )}
                        </div>

                        {error && (
                            <Alert variant="destructive">
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? "Generating codes..." : "Generate Codes"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}