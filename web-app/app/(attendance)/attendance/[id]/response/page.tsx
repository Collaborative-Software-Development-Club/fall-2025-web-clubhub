import { db } from "@/db";
import { eq } from "drizzle-orm";
import AttendanceResponseClient from "./AttendanceResponseClient";
import { meetings } from "@/db/attendance/schema";

interface AttendanceResponsePageProps {
    params: Promise<{ id: string }>;
}

export default async function AttendanceResponsePage({ params }: AttendanceResponsePageProps) {
    const { id } = await params;
    const meetingId = parseInt(id);

    const meeting = await db
        .select()
        .from(meetings)
        .where(eq(meetings.id, meetingId))
        .limit(1);

    if (meeting.length === 0) {
        return (
            <div>Meeting not found</div>
        )
    }

    const meetingData = meeting[0];

    return (
        <AttendanceResponseClient
            meetingId={meetingId}
            meetingTitle={meetingData.title}
            meetingDescription={meetingData.description}
            meetingDate={meetingData.date}
            startTime={meetingData.start_time}
            endTime={meetingData.end_time}
            code={meetingData.code}
        />
    )
}