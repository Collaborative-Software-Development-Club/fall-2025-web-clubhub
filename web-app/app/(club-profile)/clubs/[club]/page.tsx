"use client";

import EditableMultipleText from "@/components/club-profile/EditableMultipleText";
import EditableText from "@/components/club-profile/EditableText";
import clubs from "@/mock/clubs.json";
import { useClubDescription } from "../../../../services/club-profile/clubs-hooks/useClubProfileData";
import ContactDialog from "../../../../components/club-profile/ContactDialog";
import DisplayContact from "@/components/club-profile/DisplayContact";
import DisplayMultipleText from "@/components/club-profile/DisplayMultipleText";
import { DisplayText } from "@/components/club-profile/DisplayText";
import { use } from "react";

export default function ClubPage({
    params,
}: {
    params: Promise<{ club: string }>;
}) {
    const { club } = use(params);
    const clubData = clubs[0];
    const description = useClubDescription(1);

    const socialMedia = [
        clubData["Contact Information"]["Instagram"] || "",
        clubData["Contact Information"]["Facebook Group Page"] || "",
        clubData["Contact Information"]["Website"] || "",
        clubData["Contact Information"]["Other"] || "",
    ];

    const isLeader = true; // TODO: Replace with actual authentication logic

    return (
        <div className="w-full">
            {isLeader ? (
                <div className="w-full max-w-6xl flex flex-col items-center py-5 gap-4">
                    <EditableText
                        id={club}
                        title="Purpose Statement"
                        path="Purpose Statement"
                        initialText={clubData["Purpose Statement"]}
                    />
                    <EditableMultipleText
                        id={club}
                        title="Membership Details"
                        path="Membership Details"
                        initialData={clubData["Membership Details"]}
                    />
                    <EditableText
                        id={club}
                        title="Meeting Time and Location"
                        path="Meeting Time and Location"
                        initialText={
                            clubData["Meeting Information"][
                                "Meeting Time and Place"
                            ]
                        }
                    />
                    <div
                        id="contact"
                        className="w-full grid grid-cols-2 items-start px-5 gap-4"
                    >
                        <ContactDialog
                            data={
                                clubData["Contact Information"][
                                    "Organization Email"
                                ]
                            }
                            isEmail={true}
                        />
                        <ContactDialog data={socialMedia} isEmail={false} />
                    </div>
                </div>
            ) : (
                <div className="w-full max-w-6xl flex flex-col items-center py-5 gap-4">
                    <DisplayText
                        title="Purpose Statement"
                        text={clubData["Purpose Statement"]}
                        placeholder="No information provided"
                    />
                    <DisplayMultipleText
                        title="Membership Details"
                        initialData={clubData["Membership Details"]}
                    />
                    <DisplayText
                        title="Meeting Time and Location"
                        text={
                            clubData["Meeting Information"][
                                "Meeting Time and Place"
                            ]
                        }
                        placeholder="No information provided"
                    />
                    <div
                        id="contact"
                        className="w-full grid grid-cols-2 items-start px-5 gap-4"
                    >
                        <DisplayContact
                            list={
                                clubData["Contact Information"][
                                    "Organization Email"
                                ]
                            }
                            isEmail={true}
                            placeholder="No information provided"
                        />
                        <DisplayContact
                            list={socialMedia}
                            isEmail={false}
                            placeholder="No information provided"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
