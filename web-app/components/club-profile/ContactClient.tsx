"use client";

import DisplayContact from "./DisplayContact";
import ContactDialog, { Dialog } from "./ContactDialog";
import { useContactInformation } from "@/services/club-profile/clubs-hooks/useClubProfileData";

export default function ContactClient({
    clubId,
    organizationEmail,
    isLeader,
}: {
    clubId: number;
    organizationEmail: Dialog[];
    isLeader: boolean;
}) {
    const { data, isLoading, error } = useContactInformation(clubId);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading contact information</div>;

    const prop = data?.map((item) => ({
        id: item.id || undefined,
        prop1: item.method,
        prop2: item.detail,
    }));

    const emailList = organizationEmail;

    return isLeader ? (
        <ContactDialog
            data={emailList}
            addedData={prop || []}
            isContact={true}
            clubId={clubId}
        />
    ) : (
        <DisplayContact
            list={organizationEmail.concat(prop || [])}
            isContact={true}
            placeholder="No contact information provided"
        />
    );
}
