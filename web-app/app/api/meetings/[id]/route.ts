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
// needed: update, delete, get all, post

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

export async function DELETE(_request: Request, context: RouteContext) {
    const { id } = await context.params;
    const meetingId = Number(id);

    if (!Number.isInteger(meetingId) || meetingId <= 0) {
        return NextResponse.json(
            { error: "Invalid meeting id" },
            { status: 400 },
        );
    }

    try {
        const result = await db
            .delete(meetings)
            .where(eq(meetings.id, meetingId))
            .returning({ id: meetings.id });

        if (result.length == 0){
            return NextResponse.json(
                { error: "Meeting not found" },
                { status: 404 },
            );
        }


        return NextResponse.json({
            message: "Meeting deleted successfully",
            deletedMeetingId: result[0].id,
        })
    } catch (error) {
        console.error("Failed to delete meeting", error);
        return NextResponse.json(
            { error: "Failed to delete meeting" },
            { status: 500 },
        );
    }
}

export async function POST(_request: Request, context: RouteContext, attributes: {}) {
    const { id } = await context.params;
    const meetingId = Number(id);

    if (!Number.isInteger(meetingId) || meetingId <= 0) {
        return NextResponse.json(
            { error: "Bad Request" }, { status: 400 }
        );
    }

    try {
        const [meeting] = await db.update(meetings).set(attributes).where(eq(meetings.id, meetingId));

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