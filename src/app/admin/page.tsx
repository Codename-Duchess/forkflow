import AdminClientWrapper from "@/components/admin-page-component/AdminClientWrapper";
import { ViewProvider } from "@/context/ViewContext";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

const Admin = async () => {

    const user = await getCurrentUser();

    console.log('user: ', user);

    if (!user) {
        redirect('/login'); // or wherever your login page is
    }

    return (
        <ViewProvider>
            <AdminClientWrapper user={user} />
        </ViewProvider>
    );
}

export default Admin;
