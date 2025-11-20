import { db } from "@/db";
import { attendance } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getAttendanceForMeeting(clubId: number) {
    return await db
        .select()
        .from(attendance)
        .where(eq(attendance.meetingID, clubId));
}
