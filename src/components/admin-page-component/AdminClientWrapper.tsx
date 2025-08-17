"use client";

import AppPageLayout from "@/components/layout/AppPageLayout";
import AdminPageComponent from "@/components/admin-page-component/admin-page-component";

interface UserCompact {
    id: string;
    firstName: string;
    lastName: string;
    companyName: string;
    email: string;
}

interface AdminClientWrapperProps {
    user: UserCompact;
}

const AdminClientWrapper = ({ user }: AdminClientWrapperProps) => {
    return (
        <AppPageLayout user={user}>
            <AdminPageComponent user={user} />
        </AppPageLayout>
    );
};

export default AdminClientWrapper;