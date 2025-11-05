"use client";
import React, { useMemo } from "react";
import { Calendar } from "@/components/ui/calendar";

type Meeting = {
    date: string;
    time: string;
    club: string;
    conflict: boolean | number;
};

interface Props {
    meetings: Meeting[];
    className?: string;
}

function parseDate(dateStr: string) {
    const [month, day, year] = dateStr.split("/");
    return new Date(Number(`20${year}`), Number(month) - 1, Number(day));
}

function normalizeDateKey(date: Date) {
    return date.toISOString().split("T")[0];
}

export default function ClubCalendar({ meetings, className }: Props) {
    const meetingsByDate = useMemo(() => {
        const map = new Map<string, Meeting[]>();
        meetings.forEach((meeting) => {
            const key = normalizeDateKey(parseDate(meeting.date));
            if (!map.has(key)) {
                map.set(key, []);
            }
            map.get(key)!.push(meeting);
        });
        return map;
    }, [meetings]);

    const modifiers = {
        hasMeeting: (date: Date) => meetingsByDate.has(normalizeDateKey(date)),
        hasConflict: (date: Date) => {
            const list = meetingsByDate.get(normalizeDateKey(date));
            return list?.some((m) => Boolean(m.conflict)) || false;
        },
    };

    const modifiersClassNames = {
        hasMeeting: "relative after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:rounded-full after:bg-blue-500",
        hasConflict: "relative after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:rounded-full after:bg-red-500",
    };

    return (
        <div className={`min-w-0 ${className || ""}`}>
            <Calendar
                mode="single"
                className={[
                    "rounded-md border w-auto  mx-auto",
                ].join(" ")}
                modifiers={modifiers}
                modifiersClassNames={modifiersClassNames}
            />
        </div>
    );
}