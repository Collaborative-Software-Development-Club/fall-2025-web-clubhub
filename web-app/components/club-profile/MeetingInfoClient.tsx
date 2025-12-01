"use client";

import { useState } from "react";
import EditableText from "./EditableText";
import DisplayText from "./DisplayText";
import {
    useMeetingLocation,
    useCreateMeetingLocation,
    useUpdateMeetingLocation,
    useDeleteMeetingLocation,
    useMeetingTime,
    useCreateMeetingTime,
    useUpdateMeetingTime,
    useDeleteMeetingTime,
} from "@/services/club-profile/clubs-hooks/useClubProfileData";
import { Button } from "../ui/button";

export default function MeetingInfoClient({
    meetingInfo,
    clubId,
    isLeader,
}: {
    meetingInfo: string;
    clubId: number;
    isLeader: boolean;
}) {
    const [isCreatingLocation, setIsCreatingLocation] = useState(false);
    const [isCreatingTime, setIsCreatingTime] = useState(false);

    const {
        data: meetingTimeData,
        isLoading: isLoadingTime,
        error: errorTime,
    } = useMeetingTime(clubId);
    const {
        data: meetingLocationData,
        isLoading: isLoadingLocation,
        error: errorLocation,
    } = useMeetingLocation(clubId);

    const createTime = useCreateMeetingTime();
    const updateTime = useUpdateMeetingTime();
    const deleteTime = useDeleteMeetingTime();

    const createLocation = useCreateMeetingLocation();
    const updateLocation = useUpdateMeetingLocation();
    const deleteLocation = useDeleteMeetingLocation();

    if (isLoadingTime || isLoadingLocation) return <div>Loading...</div>;
    if (errorTime || errorLocation)
        return <div>Error Loading Meeting Information</div>;

    const haveLocationAndTime = !!(meetingTimeData && meetingLocationData);

    const handleSave = async ({
        time,
        location,
    }: {
        time?: string;
        location?: string;
    }) => {
        try {
            if (time !== undefined) {
                const timeVal = time.trim();
                if (meetingTimeData) {
                    await updateTime.mutateAsync({ clubId, data: timeVal });
                } else {
                    await createTime.mutateAsync({ clubId, data: timeVal });
                }
                setIsCreatingTime(false);
            }

            if (location !== undefined) {
                const locVal = location.trim();
                if (meetingLocationData) {
                    await updateLocation.mutateAsync({ clubId, data: locVal });
                } else {
                    await createLocation.mutateAsync({ clubId, data: locVal });
                }
                setIsCreatingLocation(false);
            }
        } catch (err) {
            console.error("Failed to save meeting info.", err);
        }
    };

    const handleDelete = async (type: "time" | "location") => {
        try {
            if (type === "time" && meetingTimeData) {
                await deleteTime.mutateAsync(clubId);
                setIsCreatingTime(false);
            }
            if (type === "location" && meetingLocationData) {
                await deleteLocation.mutateAsync(clubId);
                setIsCreatingLocation(false);
            }
        } catch (err) {
            console.error("Failed to delete meeting info.", err);
        }
    };

    const handleStartCreating = () => {
        if (!isCreatingTime) setIsCreatingTime(true);
        if (!isCreatingLocation) setIsCreatingLocation(true);
    };

    const renderEditableMeetingInfo = () => (
        <div className="w-full md:grid md:grid-cols-2 md:items-start">
            <EditableText
                title="Meeting Time"
                initialText={meetingTimeData?.time || ""}
                handleSave={(t) => handleSave({ time: t })}
                handleDelete={() => handleDelete("time")}
            />
            <EditableText
                title="Meeting Location"
                initialText={meetingLocationData?.location || ""}
                handleSave={(l) => handleSave({ location: l })}
                handleDelete={() => handleDelete("location")}
            />
        </div>
    );

    const renderDisplayMeetingInfo = () => {
        if (haveLocationAndTime) {
            return (
                <div className="w-full md:grid md:grid-cols-2 md:items-start">
                    <DisplayText
                        title="Meeting Time"
                        text={meetingTimeData?.time || ""}
                        placeholder="No meeting time given"
                    />
                    <DisplayText
                        title="Meeting Location"
                        text={meetingLocationData?.location || ""}
                        placeholder="No meeting location given"
                    />
                </div>
            );
        }
        return (
            <DisplayText
                title="Meeting Information"
                text={meetingInfo}
                placeholder="No meeting information given"
            />
        );
    };

    const renderMeetingInfoWithReplaceButton = () => (
        <div className="relative">
            {isLeader && (
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="text-blue-500 hover:text-blue-700 absolute right-5"
                    onClick={handleStartCreating}
                >
                    Replace
                </Button>
            )}
            {renderDisplayMeetingInfo()}
        </div>
    );

    return (
        <div className="w-full">
            {haveLocationAndTime
                ? isLeader
                    ? renderEditableMeetingInfo()
                    : renderDisplayMeetingInfo()
                : isCreatingTime || isCreatingLocation
                ? renderEditableMeetingInfo()
                : renderMeetingInfoWithReplaceButton()}
        </div>
    );
}
