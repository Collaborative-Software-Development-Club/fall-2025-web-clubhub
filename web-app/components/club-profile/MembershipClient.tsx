"use client";

import { useState } from "react";
import EditableMultipleText from "./EditableMultipleText";
import DisplayMultipleText from "./DisplayMultipleText";

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

    return (
        <div className="flex flex-col w-full px-5 mt-2">
            <h2 className="text-xl font-bold px-2">Membership Details:</h2>
            <hr className="mt-2 border-gray-400" />
            <DisplayMultipleText
                title="Membership Type"
                text={data.membership_type}
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
                        handleSave={async (data: string) => {}}
                        handleDelete={async () => {}}
                        initialText={data.how_does_a_prospective_member_apply}
                        isWindow={false}
                    />
                    <EditableMultipleText
                        title="Time of Year for New Membership"
                        handleSave={async (data: string) => {}}
                        handleDelete={async () => {}}
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
