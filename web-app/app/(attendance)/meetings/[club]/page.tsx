import { db } from "@/db";
import { eq } from "drizzle-orm";
import { meetings } from "@/db/attendance/schema";
import { Meeting } from "./types";
import MeetingsPageClient from "./MeetingsPageClient";

interface MeetingsPageProps {
    params: Promise<{ club: string }>;
}

export default async function MeetingsPage({ params }: MeetingsPageProps) {
    const { club } = await params;
    const clubId = parseInt(club);

    const meetingRecords = await db
        .select()
        .from(meetings)
        .where(eq(meetings.club_id, clubId));

    const meetingData: Meeting[] = meetingRecords.map((record) => ({
        id: record.id,
        club_id: record.club_id,
        title: record.title,
        description: record.description,
        date: record.date,
        location: record.location,
        start_time: record.start_time,
        end_time: record.end_time,
        code: record.code,
        created_at: record.created_at,
        created_by_user_id: record.created_by_user_id,
    }));

    return (
        <MeetingsPageClient 
            meetingsData={meetingData}
            clubId={clubId}
        />
    );
}