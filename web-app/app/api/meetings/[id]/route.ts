import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

import { db } from "@/db";
import { meetings } from "@/db/attendance/schema";

type RouteContext = {
    params: Promise<{
        id: string;
    }>;
};

const serializeMeeting = (meeting: typeof meetings.$inferSelect) => ({
    id: meeting.id,
    clubId: meeting.club_id,
    title: meeting.title,
    description: meeting.description,
    date: meeting.date,
    startTime: meeting.start_time,
    endTime: meeting.end_time,
    code: meeting.code,
    createdAt: meeting.created_at,
    createdByUserId: meeting.created_by_user_id,
});

export async function GET(_request: Request, context: RouteContext) {
    const { id } = await context.params;
    const meetingId = Number(id);

    if (!Number.isInteger(meetingId) || meetingId <= 0) {
        return NextResponse.json(
            { error: "Invalid meeting id" },
            { status: 400 },
        );
    }

    try {
        const [meeting] = await db
            .select()
            .from(meetings)
            .where(eq(meetings.id, meetingId))
            .limit(1);

        if (!meeting) {
            return NextResponse.json(
                { error: "Meeting not found" },
                { status: 404 },
            );
        }

        return NextResponse.json({ meeting: serializeMeeting(meeting) });
    } catch (error) {
        console.error("Failed to load meeting", error);
        return NextResponse.json(
            { error: "Failed to load meeting" },
            { status: 500 },
        );
    }
}
