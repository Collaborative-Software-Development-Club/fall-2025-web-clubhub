import { mockAttendance } from "@/mock/sample-attendance";
import AttendanceClient from "./AttendanceClient";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { meetings, attendance } from "@/db/attendance/schema";
import { AttendanceStatus, StudentProps } from "./types";

interface AttendancePageProps {
    params: Promise<{ id: string }>;
}

export default async function AttendancePage({ params }: AttendancePageProps) {
    const { id } = await params;

    // TODO: Use path param when dynamic club url is club id instead of club name
    // const meetingId = parseInt(id);
    const meetingId = 1;

    const meeting = await db
        .select()
        .from(meetings)
        .where(eq(meetings.id, meetingId))
        .limit(1);

    const attendanceRecords = await db
        .select()
        .from(attendance)
        .where(eq(attendance.meeting_id, meetingId));

    if (meeting.length === 0) {
        return (
            <div>Meeting not found</div>
        )
    }

    const meetingData = meeting[0];

    const attendanceData: StudentProps[] = attendanceRecords.map((record) => {
        // TODO: Get student name from user table
        // const student = await ...
        const student = { name: "placeholder" };

        return {
            name: student.name,
            dotNumber: record.email,
            status: record.status as AttendanceStatus,
            timestamp: record.timestamp.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true
            }),
            streak: 0
        }
    })

    return (
        <AttendanceClient
            meetingId={id}
            meetingTitle={meetingData.title}
            meetingDescription={meetingData.description}
            code={meetingData.code}
            meetingDate={new Date(meetingData.date)}
            attendanceData={attendanceData}
        />
    );
}
