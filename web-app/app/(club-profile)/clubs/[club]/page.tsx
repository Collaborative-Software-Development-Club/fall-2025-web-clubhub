import EditableMultipleText from "@/components/club-profile/EditableMultipleText";
import EditableText from "@/components/club-profile/EditableText";
import clubs from "@/mock/clubs.json";
import PurposeClient from "@/components/club-profile/PurposeClient";
import SocialClient from "@/components/club-profile/SocialClient";
import DisplayEmail from "@/components/club-profile/DisplayEmail";
import DisplayMultipleText from "@/components/club-profile/DisplayMultipleText";
import DisplayText from "@/components/club-profile/DisplayText";

export default function ClubPage({ params }: { params: { club: string } }) {
    const { club } = params;
    const clubData = clubs[0];

    const socialMedia = [
        {
            platform: "Instagram",
            url: clubData["Contact Information"]["Instagram"] || "",
        },
        {
            platform: "Facebook",
            url: clubData["Contact Information"]["Facebook Group Page"] || "",
        },
        {
            platform: "Website",
            url: clubData["Contact Information"]["Website"] || "",
        },
        {
            platform: "Other",
            url: clubData["Contact Information"]["Other"] || "",
        },
    ].filter((item) => item.url.trim() !== ""); // Filter out empty social media links

    // Ensure organizationEmail is an array
    const organizationEmail = Array.isArray(
        clubData["Contact Information"]["Organization Email"],
    )
        ? clubData["Contact Information"]["Organization Email"]
        : clubData["Contact Information"]["Organization Email"]
        ? [clubData["Contact Information"]["Organization Email"]]
        : [];

    const isLeader = true; // TODO: Replace with actual authentication logic

    return (
        <div className="w-full">
            <div className="w-full max-w-6xl flex flex-col items-center py-5 gap-4">
                <PurposeClient
                    purposeStatement={clubData["Purpose Statement"]}
                    isLeader={isLeader}
                    clubId={1}
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
                    <DisplayEmail list={organizationEmail} />
                    <SocialClient
                        clubId={parseInt(club)}
                        socialLinks={socialMedia}
                        isLeader={isLeader}
                    />
                </div>
            </div>
        </div>
    );
}
