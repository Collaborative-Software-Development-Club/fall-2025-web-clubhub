import { ClubsService } from "@/services/definition";
import { AnnouncementOverview } from "./AnnouncementOverview";
//import { scrapedClubsService } from ;
import { ClubPreview } from "./ClubPreview";
import { db } from "../../../db/index";
import { announcements, meetingTimes, meetingLocations } from "../../../db/club-addition/schema";
import { eq, desc, inArray } from "drizzle-orm";

//export const clubsService: ClubsService = mockClubsService;

export const clubsService: ClubsService = {
    getClubPreviews: getClubPreviews,
    getClubAnnouncements: getClubAnnouncements
};

async function getClubPreviews(clubIds: string[]): Promise<ClubPreview[]> {
    const ids = clubIds.map(Number).filter(Number.isFinite);
    if (!ids.length) return [];

  // Latest announcement per club (Postgres: DISTINCT ON is great; here we do a simple sort + fold)
  const annRows = await db
    .select({
      clubId: announcements.clubId,
      title: announcements.title,
      content: announcements.content,
      lastModified: announcements.lastModified,
      userId: announcements.userId,
    })
    .from(announcements)
    .where(inArray(announcements.clubId, ids))
    .orderBy(desc(announcements.lastModified))

  const latestAnnByClub = new Map<number, typeof annRows[number]>();
  for (const r of annRows) if (!latestAnnByClub.has(r.clubId)) latestAnnByClub.set(r.clubId, r);

  const locRows = await db
    .select({ clubId: meetingLocations.clubId, location: meetingLocations.location })
    .from(meetingLocations)
    .where(inArray(meetingLocations.clubId, ids));
  const locByClub = new Map(locRows.map(r => [r.clubId, r.location ?? "TBA"]));

  const timeRows = await db
    .select({ clubId: meetingTimes.clubId, timeText: meetingTimes.timeText }) // use meeting table
    .from(meetingTimes)
    .where(inArray(meetingTimes.clubId, ids));
  const timeByClub = new Map(timeRows.map(r => [r.clubId, r.timeText ?? "TBA"]));

  return ids.map((id) => {
    const ann = latestAnnByClub.get(id);
    const scrapedData = scrapedClubsService.getClubData(id);
    return {
      name: scrapedData.name,
      meetingLocation: locByClub.get(id) ?? "TBA",
      meetingTime: timeByClub.get(id) ?? "TBA",
      nextAnnouncement: {
        title: ann?.title ?? "No announcements",
        body: ann?.content ?? "No announcements",
        date: ann?.lastModified ?? new Date(0),
        author: ann?.userId ? `User ${ann.userId}` : "Unknown",
      },
    };
  });
}

async function getClubAnnouncements(clubId: string): Promise<AnnouncementOverview[]> {
    const announcementRecords = await db.select()
        .from(announcements)
        .where(eq(announcements.clubId, parseInt(clubId)));
    
    return announcementRecords.map(record => ({
        id: record.id,
        title: record.title,
        body: record.content,
        date: record.lastModified || new Date(),
        author: `User ${record.userId}`, // Get user name from user service
        pinned: record.pinned || false
    }));
}