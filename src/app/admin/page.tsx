import InviteCodes from "@/components/InviteCodes/InviteCodes";
import AppPageLayout from "@/components/layout/AppPageLayout";
import { User } from "@/types/user";

const Admin = () => {

    const timestamp = new Date().toISOString();

    const user = {
        id: 1,
        first_name: "Testy",
        last_name: "McTestface",
        email: "test@acornifycrm.com",
        modules: ["client_database", "project_database"],
        tier: "individual",
        total_price: 99,
        company_name: "Innitech",
        job_title: "Developer",
        date_created: timestamp,
        sessions: 0,
        average_session_length: "0 minutes",
        last_login: timestamp,
        is_active: true,
        password_hash: "",
        profile_picture_url: "",
        total_time: "0 minutes",
        last_updated: timestamp,
        invite_codes: []
    };

    return (
        <AppPageLayout>
            <div>
                {user?.id === 1 ?
                    <>
                        <h1>Admin</h1>
                        {/* <InviteCodes /> */}
                    </>
                    :
                    <>
                        <h1>Unauthorised</h1>
                    </>
                }
            </div>
        </AppPageLayout>

    );
}

export default Admin;

function useUser() {
    throw new Error("Function not implemented.");
}
