import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

import { db } from "@/db";
import { attendance } from "@/db/attendance/schema";

type RouteContext = {
    params: Promise<{ meetingId: string }>;
};

const serializeAttendanceRow = (row: typeof attendance.$inferSelect) => ({
    attendanceID: row.attendanceID,
    userEmail: row.userEmail,
    userID: row.userID,
    meetingID: row.meetingID,
    status: row.status,
    timestamp: row.timestamp,
});

export async function GET(_request: Request, context: RouteContext) {
    const { meetingId } = await context.params;
    const id = Number(meetingId);

    if (!Number.isInteger(id) || id <= 0) {
        return NextResponse.json({ error: "Invalid meeting id" }, { status: 400 });
    }

    try {
        const rows = await db
            .select()
            .from(attendance)
            .where(eq(attendance.meetingID, id));

        const serialized = rows.map(serializeAttendanceRow);

        return NextResponse.json({ attendance: serialized });
    } catch (error) {
        console.error("Failed to load attendance for meeting", id, error);
        return NextResponse.json({ error: "Failed to load attendance" }, { status: 500 });
    }
}
