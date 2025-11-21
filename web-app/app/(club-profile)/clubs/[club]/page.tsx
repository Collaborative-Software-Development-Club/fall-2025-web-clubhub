"use client";

import EditableMultipleText from "@/components/club-profile/EditableMultipleText";
import clubs from "@/mock/clubs.json";
import PurposeClient from "@/components/club-profile/PurposeClient";
import SocialClient from "@/components/club-profile/SocialClient";
import ContactClient from "@/components/club-profile/ContactClient";

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

    const isLeader = true; // TODO: Replace with actual authentication logic

    return (
        <div className="w-full">
            <div className="w-full max-w-6xl flex flex-col items-center py-5 gap-4">
                <PurposeClient
                    purposeStatement={clubData["Purpose Statement"]}
                    isLeader={isLeader}
                    clubId={club}
                />
                <EditableMultipleText
                    id={club}
                    title="Membership Details"
                    path="Membership Details"
                    initialData={clubData["Membership Details"]}
                />
                {/* <EditableText
                    id={club}
                    title="Meeting Time and Location"
                    path="Meeting Time and Location"
                    initialText={
                        clubData["Meeting Information"][
                            "Meeting Time and Place"
                        ]
                    }
                /> */}
                <div
                    id="contact"
                    className="w-full grid grid-cols-2 items-start px-5 gap-4"
                >
                    {/* <DisplayEmail list={organizationEmail} /> */}
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
