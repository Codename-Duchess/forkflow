import { GenerateInviteCodesForm } from "../forms/generate-invite-codes/generate-invite-codes";
import InviteCodesTable from "./InviteCodesTable";

const InviteCodes = () => {

    // Get invite codes from db
    const inviteCodes = [
        {
            id: 1,
            code: "INVITE123",
            userId: 1,
            status: "Active",
            createdAt: "2023-10-01T12:00:00Z",
            updatedAt: "2023-10-01T12:00:00Z",
            newUserId: 3
        },
        {
            id: 2,
            code: "INVITE456",
            userId: 2,
            status: "Lead",
            createdAt: "2023-10-02T12:00:00Z",
            updatedAt: "2023-10-02T12:00:00Z",
            newUserId: 4
        }
    ];

    return (
        <>
            <GenerateInviteCodesForm />
            <InviteCodesTable inviteCodes={inviteCodes} />
        </>
    );
}

export default InviteCodes;