"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button/button";
import { Input } from "@/components/ui/input/input";
import { Label } from "@/components/ui/label/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card/card";
import { Alert, AlertDescription } from "@/components/ui/alert/alert";
import { z } from "zod";
import { createRestaurant } from "@/actions/restaurants";

// Validation schemas
const restaurantNameSchema = z.string().min(1, "Restaurant name is required");
const addressLine1Schema = z.string().min(1, "Address line 1 is required");
const addressLine2Schema = z.string().optional();
const citySchema = z.string().min(1, "City is required");
const countySchema = z.string().optional();
const postcodeSchema = z.string().regex(/^[A-Z]{1,2}[0-9]{1,2}[A-Z]?\s?[0-9][A-Z]{2}$/i, "Please enter a valid UK postcode");

interface FieldErrors {
    restaurantName?: string;
    addressLine1?: string;
    addressLine2?: string;
    city?: string;
    county?: string;
    postcode?: string;
}

export function CreateRestaurantForm() {
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
    const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());

    const validateField = (name: string, value: string) => {
        let schema;
        switch (name) {
            case 'name':
                schema = restaurantNameSchema;
                break;
            case 'addressLine1':
                schema = addressLine1Schema;
                break;
            case 'addressLine2':
                schema = addressLine2Schema;
                break;
            case 'city':
                schema = citySchema;
                break;
            case 'county':
                schema = countySchema;
                break;
            case 'postcode':
                schema = postcodeSchema;
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

        // Get form values from state or refs
        // const formElement = document.getElementById('restaurant-form') as HTMLFormElement;
        // const formData = new FormData(formElement);

        // Validate all fields before submission
        const newFieldErrors: FieldErrors = {};
        const fields = ['restaurantName', 'addressLine1', 'addressLine2', 'city', 'county', 'postcode'];

        fields.forEach(field => {
            const value = formData.get(field) as string;
            const error = validateField(field, value);
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

        const result = await createRestaurant(formData);

        console.log("Made it to here and got a result: ", result);


        if (result?.error) {
            setError(result.error);
            setIsLoading(false);
        }
    }

    return (
        <Card className="w-full max-w-2xl">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">Create new restaurant</CardTitle>
                <CardDescription>Add a new restaurant to your account</CardDescription>
            </CardHeader>
            <CardContent>
                <form action={handleSubmit} id="restaurant-form" className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="restaurantName">Restaurant name</Label>
                        <Input
                            id="restaurantName"
                            name="restaurantName"
                            disabled={isLoading}
                            onChange={handleFieldChange}
                            onBlur={handleFieldBlur}
                            className={getFieldClassName('restaurantName', '')}
                        />
                        {fieldErrors.restaurantName && (
                            <p className="text-sm text-red-600 mt-1">{fieldErrors.restaurantName}</p>
                        )}
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-medium">Address</h3>

                        <div className="space-y-2">
                            <Label htmlFor="addressLine1">Address line 1</Label>
                            <Input
                                id="addressLine1"
                                name="addressLine1"
                                disabled={isLoading}
                                onChange={handleFieldChange}
                                onBlur={handleFieldBlur}
                                className={getFieldClassName('addressLine1', '')}
                            />
                            {fieldErrors.addressLine1 && (
                                <p className="text-sm text-red-600 mt-1">{fieldErrors.addressLine1}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="addressLine2">Address line 2</Label>
                            <Input
                                id="addressLine2"
                                name="addressLine2"
                                disabled={isLoading}
                                onChange={handleFieldChange}
                                onBlur={handleFieldBlur}
                                className={getFieldClassName('addressLine2', '')}
                            />
                            {fieldErrors.addressLine2 && (
                                <p className="text-sm text-red-600 mt-1">{fieldErrors.addressLine2}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="city">City</Label>
                                <Input
                                    id="city"
                                    name="city"
                                    disabled={isLoading}
                                    onChange={handleFieldChange}
                                    onBlur={handleFieldBlur}
                                    className={getFieldClassName('city', '')}
                                />
                                {fieldErrors.city && (
                                    <p className="text-sm text-red-600 mt-1">{fieldErrors.city}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="county">County</Label>
                                <Input
                                    id="county"
                                    name="county"
                                    disabled={isLoading}
                                    onChange={handleFieldChange}
                                    onBlur={handleFieldBlur}
                                    className={getFieldClassName('county', '')}
                                />
                                {fieldErrors.county && (
                                    <p className="text-sm text-red-600 mt-1">{fieldErrors.county}</p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="postcode">Postcode</Label>
                            <Input
                                id="postcode"
                                name="postcode"
                                disabled={isLoading}
                                onChange={handleFieldChange}
                                onBlur={handleFieldBlur}
                                className={getFieldClassName('postcode', '')}
                                style={{ textTransform: 'uppercase' }}
                            />
                            {fieldErrors.postcode && (
                                <p className="text-sm text-red-600 mt-1">{fieldErrors.postcode}</p>
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
                            {isLoading ? "Creating restaurant..." : "Create Restaurant"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}