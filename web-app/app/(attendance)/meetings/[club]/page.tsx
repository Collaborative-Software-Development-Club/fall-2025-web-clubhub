// attendance/page.tsx (SERVER COMPONENT)
import { getAllMeetingsForClub } from "@/services/attendance/meeting-service/meetings-service";
import MeetingsPage from "./MeetingsPage";

export default async function Home({ params }: { params: { club: string } }) {
    const CLUB_ID = 1; // placeholder; need to convert club name from url route

    let meetings;
    try {
        meetings = await getAllMeetingsForClub(CLUB_ID);
    } catch (err) {
        throw err;
    }

    return <MeetingsPage initialMeetings={meetings} />;
}
