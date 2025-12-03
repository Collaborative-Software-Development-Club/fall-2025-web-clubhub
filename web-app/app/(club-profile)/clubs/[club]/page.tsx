import MembershipClient from "@/components/club-profile/MembershipClient";
import clubs from "@/mock/clubs.json";
import PurposeClient from "@/components/club-profile/PurposeClient";
import SocialClient from "@/components/club-profile/SocialClient";
import ContactClient from "@/components/club-profile/ContactClient";
import MeetingInfoClient from "@/components/club-profile/MeetingInfoClient";

export default function ClubPage({ params }: { params: { club: string } }) {
    //const { club } = params;
    const club = 1;
    const clubData = clubs[0];

    const socialMedia = [
        {
            prop1: "Instagram",
            prop2: clubData["Contact Information"]["Instagram"] || "",
        },
        {
            prop1: "Facebook",
            prop2: clubData["Contact Information"]["Facebook Group Page"] || "",
        },
        {
            prop1: "Website",
            prop2: clubData["Contact Information"]["Website"] || "",
        },
        {
            prop1: "Other",
            prop2: clubData["Contact Information"]["Other"] || "",
        },
    ].filter((item) => item.prop2.trim() !== "");

    const organizationEmail =
        clubData["Contact Information"]["Organization Email"]?.map(
            (email: string) => {
                return {
                    prop1: "Email",
                    prop2: email,
                };
            },
        ) || [];

    const membership = {
        membership_type: clubData["Membership Details"]["Membership Type"],
        membership_contact:
            clubData["Membership Details"]["Membership Contact"],
        time_of_year_for_new_membership:
            clubData["Membership Details"]["Time of Year for New Membership"],
        how_does_a_prospective_member_apply:
            clubData["Membership Details"][
                "How does a Prospective Member Apply"
            ],
        charge_dues: clubData["Membership Details"]["Charge Dues"],
    };
    const isLeader = true; // TODO: Replace with actual authentication logic

    return (
        <div className="w-full">
            <div className="w-full max-w-6xl flex flex-col items-center py-5 gap-4">
                <PurposeClient
                    purposeStatement={clubData["Purpose Statement"]}
                    isLeader={isLeader}
                    clubId={club}
                />
                <MembershipClient
                    clubId={club}
                    isLeader={isLeader}
                    initialData={membership}
                />

                <MeetingInfoClient
                    meetingInfo={
                        clubData["Meeting Information"][
                            "Meeting Time and Place"
                        ]
                    }
                    clubId={club}
                    isLeader={isLeader}
                />

                <div
                    id="contact"
                    className="w-full md:grid md:grid-cols-2 md:items-start"
                >
                    <ContactClient
                        clubId={club}
                        organizationEmail={organizationEmail}
                        isLeader={isLeader}
                    />
                    <SocialClient
                        clubId={club}
                        socialLinks={socialMedia}
                        isLeader={isLeader}
                    />
                </div>
            </div>
        </div>
    );
}
