"use client";

import { useClubDescription } from "@/services/club-profile/clubs-hooks/useClubProfileData";
import EditableText from "./EditableText";
import DisplayText from "./DisplayText";

export default function PurposeClient({
    purposeStatement,
    isLeader,
}: {
    purposeStatement: string;
    isLeader: boolean;
}) {
    const { data, isLoading, error } = useClubDescription(1);

    const hasClubDescription = data && data.description;

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading club description.</div>;
    }

    return (
        <div className="w-full">
            {hasClubDescription ? (
                isLeader ? (
                    <EditableText
                        id="club-description"
                        title="Club Description"
                        path="Club Description"
                        initialText={data.description}
                    />
                ) : (
                    <DisplayText
                        title="Club Description"
                        text={data.description}
                        placeholder="No information provided"
                    />
                )
            ) : isLeader ? (
                <EditableText
                    id="purpose"
                    title="Purpose Statement"
                    path="Purpose Statement"
                    initialText={purposeStatement}
                />
            ) : (
                <DisplayText
                    title="Purpose Statement"
                    text={purposeStatement}
                    placeholder="No information provided"
                />
            )}
        </div>
    );
}
