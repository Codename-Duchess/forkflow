export interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    date_created: string;
    user_sessions: number;
    average_session_length: string;
    last_login?: string;
    account_status: string;
    password_hash: string;
    profile_picture_url?: string;
    total_time: string;
    last_updated: string;
    invite_codes: string[];
    free_trial_expiry: string;
}

export interface SignupFormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface AuthResponse {
    user: Omit<User, 'password_hash'>;
    token: string;
}

export interface ApiError {
    message: string;
    status: number;
}