"use client";

import DisplayContacts from "./DisplayContact";
import ContactDialog, { Dialog } from "./ContactDialog";
import { useSocialLinks } from "@/services/club-profile/clubs-hooks/useClubProfileData";

export default function SocialClient({
    clubId,
    socialLinks,
    isLeader,
}: {
    clubId: number;
    socialLinks: Dialog[];
    isLeader: boolean;
}) {
    const { data, isLoading, error } = useSocialLinks(clubId);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading social links</div>;

    const prop = data?.map((link) => ({
        id: link.id || undefined,
        prop1: link.platform,
        prop2: link.url,
    }));

    return isLeader ? (
        <ContactDialog
            data={socialLinks}
            addedData={prop || []}
            isContact={false}
            clubId={clubId}
        />
    ) : (
        <DisplayContacts
            list={socialLinks.concat(prop || [])}
            isContact={false}
            placeholder="No social links provided"
        />
    );
}
