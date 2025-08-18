export interface Restaurant {
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