import { db } from "@/db";
import { meetings } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getAllMeetingsForClub(clubId: number) {
    return await db
        .select()
        .from(meetings)
        .where(eq(meetings.id, clubId))
        .orderBy(meetings.date, meetings.start_time);
}
