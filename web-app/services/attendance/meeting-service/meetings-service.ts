import { Meeting } from "@/app/(attendance)/meetings/[club]/MeetingCard";
import { db } from "@/db";
import { meetings } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getAllMeetingsForClub(clubId: number) {
    try {
        const rows = await db
            .select()
            .from(meetings)
            .where(eq(meetings.clubId, clubId))
            .orderBy(meetings.date, meetings.startTime);

        return rows.map((row) => ({
            id: row.id,
            title: row.title,
            date: new Date(row.date),
            startTime: row.startTime,
            endTime: row.endTime,
            description: row.description ?? "",
            location: "",
        }));
    } catch (err) {
        console.error("Error fetching meetings:", err);
        throw err;
    }
}
