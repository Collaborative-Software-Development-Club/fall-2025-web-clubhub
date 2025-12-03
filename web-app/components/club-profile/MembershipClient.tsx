"use client";

import { useState } from "react";
import EditableMultipleText from "./EditableMultipleText";
import DisplayMultipleText from "./DisplayMultipleText";
import {
    useMembershipApplicationMethod,
    useCreateMembershipApplicationMethod,
    useUpdateMembershipApplicationMethod,
    useDeleteMembershipApplicationMethod,
    useMembershipWindow,
    useCreateMembershipWindow,
    useUpdateMembershipWindow,
    useDeleteMembershipWindow,
} from "@/services/club-profile/clubs-hooks/useClubProfileData";

export type MembershipData = {
    membership_type: string | null;
    membership_contact: string;
    time_of_year_for_new_membership: string;
    how_does_a_prospective_member_apply: string;
    charge_dues: string;
};

interface MembershipClientProps {
    clubId: number;
    isLeader: boolean;
    initialData: MembershipData;
}

export default function MembershipClient({
    clubId,
    initialData,
    isLeader,
}: MembershipClientProps) {
    const [data, setData] = useState<MembershipData>(initialData);

    /* membership application method hooks */
    const { data: appMethodData } = useMembershipApplicationMethod(clubId);
    const createAppMethod = useCreateMembershipApplicationMethod();
    const updateAppMethod = useUpdateMembershipApplicationMethod();
    const deleteAppMethod = useDeleteMembershipApplicationMethod();

    /* membership window hooks */
    const { data: windowData } = useMembershipWindow(clubId);
    const createWindow = useCreateMembershipWindow();
    const updateWindow = useUpdateMembershipWindow();
    const deleteWindow = useDeleteMembershipWindow();

    const handleSaveApplicationMethod = async (value: string) => {
        const trimmed = value.trim();
        if (!trimmed) return;
        try {
            if (appMethodData) {
                await updateAppMethod.mutateAsync({ clubId, method: trimmed });
            } else {
                await createAppMethod.mutateAsync({ clubId, method: trimmed });
            }
            setData((prev) => ({
                ...prev,
                how_does_a_prospective_member_apply: trimmed,
            }));
        } catch (err) {
            console.error("Failed to save membership application method", err);
        }
    };

    const handleDeleteApplicationMethod = async () => {
        try {
            if (appMethodData) {
                await deleteAppMethod.mutateAsync(clubId);
                setData((prev) => ({
                    ...prev,
                    how_does_a_prospective_member_apply: "",
                }));
            }
        } catch (err) {
            console.error(
                "Failed to delete membership application method",
                err,
            );
        }
    };

    const TIME_PERIODS = ["Fall", "Spring", "Anytime"] as const;
    type TimePeriod = (typeof TIME_PERIODS)[number];

    const handleSaveMembershipWindow = async (value: string) => {
        const trimmed = value.trim();
        if (!trimmed) return;
        if (!TIME_PERIODS.includes(trimmed as TimePeriod)) {
            console.error("Invalid time period", trimmed);
            return;
        }
        const timePeriod = trimmed as TimePeriod;
        try {
            if (windowData) {
                await updateWindow.mutateAsync({ clubId, timePeriod });
            } else {
                await createWindow.mutateAsync({ clubId, timePeriod });
            }
            setData((prev) => ({
                ...prev,
                time_of_year_for_new_membership: timePeriod,
            }));
        } catch (err) {
            console.error("Failed to save membership window", err);
        }
    };

    const handleDeleteMembershipWindow = async () => {
        try {
            if (windowData) {
                await deleteWindow.mutateAsync(clubId);
                setData((prev) => ({
                    ...prev,
                    time_of_year_for_new_membership: "",
                }));
            }
        } catch (err) {
            console.error("Failed to delete membership window", err);
        }
    };

    return (
        <div className="flex flex-col w-full px-5 mt-2">
            <h2 className="text-xl font-bold px-2">Membership Details:</h2>
            <hr className="mt-2 border-gray-400" />
            <DisplayMultipleText
                title="Membership Type"
                text={data.membership_type ?? ""}
            />
            <DisplayMultipleText
                title="Membership Contact"
                text={data.membership_contact}
            />
            <DisplayMultipleText title="Charge Dues" text={data.charge_dues} />
            {isLeader ? (
                <>
                    <EditableMultipleText
                        title="How does a Prospective Member Apply"
                        handleSave={handleSaveApplicationMethod}
                        handleDelete={handleDeleteApplicationMethod}
                        initialText={data.how_does_a_prospective_member_apply}
                        isWindow={false}
                    />
                    <EditableMultipleText
                        title="Time of Year for New Membership"
                        handleSave={handleSaveMembershipWindow}
                        handleDelete={handleDeleteMembershipWindow}
                        initialText={data.time_of_year_for_new_membership}
                        isWindow={true}
                    />
                </>
            ) : (
                <>
                    <DisplayMultipleText
                        title="How does a Prospective Member Apply"
                        text={data.how_does_a_prospective_member_apply}
                    />
                    <DisplayMultipleText
                        title="Time of Year for New Membership"
                        text={data.time_of_year_for_new_membership}
                    />
                </>
            )}
        </div>
    );
}
