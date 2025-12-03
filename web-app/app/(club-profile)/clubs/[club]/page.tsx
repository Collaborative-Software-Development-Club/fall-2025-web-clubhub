import MembershipClient from "@/components/club-profile/MembershipClient";
import PurposeClient from "@/components/club-profile/PurposeClient";
import SocialClient from "@/components/club-profile/SocialClient";
import ContactClient from "@/components/club-profile/ContactClient";
import MeetingInfoClient from "@/components/club-profile/MeetingInfoClient";
import { scrapedClubsService } from "@/services/discovery/scraped-clubs";

export default async function ClubPage({
    params,
}: {
    params: { club: string };
}) {
    const { club } = params;
    const clubId = Number(club);
    const clubData = await scrapedClubsService.getClub(clubId);

    const organizationEmail = [
        {
            prop1: "Email",
            prop2: clubData["organizationEmail"] || "",
        },
    ];

    const membership = {
        membership_type: clubData["membershipType"] || "",
        membership_contact: clubData["membershipContact"] || "",
        time_of_year_for_new_membership:
            clubData["timeOfYearForNewMembership"] || "",
        how_does_a_prospective_member_apply:
            clubData["howDoesAProspectiveMemberApply"] || "",
        charge_dues: clubData["chargeDues"] || "",
    };
    const isLeader = true; // TODO: Replace with actual authentication logic

    return (
        <div className="w-full">
            <div className="w-full max-w-6xl flex flex-col items-center py-5 gap-4">
                <PurposeClient
                    purposeStatement={clubData["purposeStatement"] || ""}
                    isLeader={isLeader}
                    clubId={clubId}
                />
                <MembershipClient
                    clubId={clubId}
                    isLeader={isLeader}
                    initialData={membership}
                />

                <MeetingInfoClient
                    meetingInfo={clubData["meetingTimeAndPlace"] || ""}
                    clubId={clubId}
                    isLeader={isLeader}
                />

                <div
                    id="contact"
                    className="w-full md:grid md:grid-cols-2 md:items-start"
                >
                    <ContactClient
                        clubId={clubId}
                        organizationEmail={organizationEmail || []}
                        isLeader={isLeader}
                    />
                    <SocialClient
                        clubId={clubId}
                        socialLinks={
                            clubData["socialLinks"]?.map((s: any) => ({
                                prop1: s.platform,
                                prop2: s.url,
                            })) || []
                        }
                        isLeader={isLeader}
                    />
                </div>
            </div>
        </div>
    );
}
