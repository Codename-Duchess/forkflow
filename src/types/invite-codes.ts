export interface InviteCode {
    id: number; 
    code: string;
    userId: number;
    status: string;
    createdAt: string;
    updatedAt: string;
    newUserId?: number;
}

export interface InviteCodeFormData {
    userId: number;
    numberOfCodes: number;
}