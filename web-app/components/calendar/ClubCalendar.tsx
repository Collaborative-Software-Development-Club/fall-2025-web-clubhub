import React, { useMemo } from "react";
import Calendar, { TileArgs } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styles from "./ClubCalendar.module.css";

type Meeting = {
    date: string;
    time: string;
    club: string;
    conflict: boolean | number;
};

interface Props {
    meetings: Meeting[];
}

function parseDate(dateStr: string) {
    const [month, day, year] = dateStr.split("/");
    return new Date(Number(`20${year}`), Number(month) - 1, Number(day));
}

function normalizeDateKey(date: Date) {
    return date.toISOString().split("T")[0];
}

export default function ClubCalendar({ meetings }: Props) {
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

    const tileContent = ({ date, view }: TileArgs) => {
        if (view !== "month") return null;

        const meetingsForDay = meetingsByDate.get(normalizeDateKey(date));
        if (!meetingsForDay?.length) return null;

        const hasConflict = meetingsForDay.some((meeting) => Boolean(meeting.conflict));
        return (
            <span
                className={`${styles.meetingDot} ${hasConflict ? "bg-red-500" : "bg-blue-500"}`}
            />
        );
    };

    return (
        <div className={styles.wrapper}>
            <Calendar
                className={styles.calendar}
                locale="en-US"
                showNeighboringMonth={false}
                prevLabel={<span className="text-lg font-medium">&lt;</span>}
                nextLabel={<span className="text-lg font-medium">&gt;</span>}
                prev2Label={null}
                next2Label={null}
                navigationLabel={({ date }) =>
                    date.toLocaleDateString(undefined, { month: "long", year: "numeric" })
                }
                formatShortWeekday={(locale, date) =>
                    date.toLocaleDateString(locale ?? "en-US", { weekday: "short" }).slice(0, 2)
                }
                tileContent={tileContent}
            />
        </div>
    );
}