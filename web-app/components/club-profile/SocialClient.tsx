"use client";

import DisplaySocial from "./DisplaySocial";
import SocialDialog from "./SocialDialog";
import { SocialLink } from "./SocialDialog";
import { useSocialLinks } from "@/services/club-profile/clubs-hooks/useClubProfileData";

export default function SocialClient({
    clubId,
    socialLinks,
    isLeader,
}: {
    clubId: number;
    socialLinks: SocialLink[];
    isLeader: boolean;
}) {
    const { data, isLoading, error } = useSocialLinks(1);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading social links</div>;

    return isLeader ? (
        <SocialDialog
            socialLinks={socialLinks}
            addedSocialLinks={data || []}
            clubId={clubId}
        />
    ) : (
        <DisplaySocial
            list={socialLinks.concat(data || [])}
            placeholder="No social links provided"
        />
    );
}
