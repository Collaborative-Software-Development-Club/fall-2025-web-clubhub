import AttendanceClient from "./AttendanceClient";
import { db } from "@/db";
import { eq, and, desc, lte, inArray } from "drizzle-orm";
import { meetings, attendance } from "@/db/attendance/schema";
import { AttendanceRecord, AttendanceStatus } from "./types";
import { actualAccountService } from "@/services/account/user-service/account-service";

interface AttendancePageProps {
    params: Promise<{ id: string }>;
}

// Helper to calculate attendance streak for a user in a club
async function calculateStreak(email: string, clubId: number, currentMeetingDate: string): Promise<number> {
    // Get all past meetings for this club (including current), ordered by date desc
    const clubMeetings = await db
        .select({ id: meetings.id, date: meetings.date })
        .from(meetings)
        .where(and(
            eq(meetings.club_id, clubId),
            lte(meetings.date, currentMeetingDate)
        ))
        .orderBy(desc(meetings.date));

    if (clubMeetings.length === 0) return 0;

    const meetingIds = clubMeetings.map(m => m.id);

    // Get all attendance records for this user at these meetings
    const userAttendance = await db
        .select({ meeting_id: attendance.meeting_id, status: attendance.status })
        .from(attendance)
        .where(and(
            eq(attendance.email, email),
            inArray(attendance.meeting_id, meetingIds)
        ));

    const attendanceMap = new Map(
        userAttendance.map(a => [a.meeting_id, a.status])
    );

    // Count consecutive "present" or "late" attendance from most recent
    let streak = 0;
    for (const meeting of clubMeetings) {
        const status = attendanceMap.get(meeting.id);
        if (status === "present" || status === "late") {
            streak++;
        } else {
            break;  // Streak broken
        }
    }

    return streak;
}

export default async function AttendancePage({ params }: AttendancePageProps) {
    const { id } = await params;

    const meetingId = parseInt(id);

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

    // Use Promise.all to fetch user names and streaks for all records
    const attendanceData: AttendanceRecord[] = await Promise.all(
        attendanceRecords.map(async (record) => {
            let name = record.email;

            if (record.user_id) {
                try {
                    const user = await actualAccountService.getUserForId(record.user_id);
                    name = `${user.firstName} ${user.lastName}`;
                } catch {
                    // User not found, keep email as name
                }
            }

            // Calculate streak for this user
            const streak = await calculateStreak(
                record.email,
                meetingData.club_id,
                meetingData.date
            );

            return {
                id: record.id,
                name,
                email: record.email,
                status: record.status as AttendanceStatus,
                timestamp: record.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true
                }),
                streak
            };
        })
    );

    return (
        <AttendanceClient
            meetingId={meetingId}
            meetingTitle={meetingData.title}
            meetingDescription={meetingData.description}
            code={meetingData.code}
            meetingDate={new Date(meetingData.date)}
            attendanceData={attendanceData}
        />
    );
}
