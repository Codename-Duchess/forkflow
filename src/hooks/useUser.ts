export function useUser() {
    // Example implementation: returns a mock user object

    const timestamp = new Date().toISOString();


    return {
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
}