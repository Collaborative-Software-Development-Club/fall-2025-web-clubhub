import { ClubsService } from "@/services/definition";
import { AnnouncementOverview } from "./AnnouncementOverview";
//import { scrapedClubsService } from "../discovery";
import { ClubPreview } from "./ClubPreview";
import { db } from "../../../db/index";
import {
    announcements,
    meetingLocations,
    meetingTimes,
} from "../../../db/club-profile/schema";
import { eq, desc, inArray } from "drizzle-orm";
import { scrapedClubsService } from "@/services/discovery/scraped-clubs";
import { clubCommands } from "../clubs-hooks/commands";

export type ClubData = Awaited<ReturnType<typeof getClubData>>;

export const clubsService: ClubsService = {
    getClubPreviews: getClubPreviews,
    getClubAnnouncements: getClubAnnouncements,
    getClubData,
};

async function getClubPreviews(clubIds: string[]): Promise<ClubPreview[]> {
    const ids = clubIds.map(Number).filter(Number.isFinite);
    if (!ids.length) return [];

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
        .orderBy(desc(announcements.lastModified));

    const latestAnnByClub = new Map<number, (typeof annRows)[number]>();
    for (const r of annRows)
        if (!latestAnnByClub.has(r.clubId)) latestAnnByClub.set(r.clubId, r);

    const locRows = await db
        .select({
            clubId: meetingLocations.clubId,
            location: meetingLocations.location,
        })
        .from(meetingLocations)
        .where(inArray(meetingLocations.clubId, ids));
    const locByClub = new Map(
        locRows.map((r) => [r.clubId, r.location ?? "TBA"]),
    );

    const timeRows = await db
        .select({ clubId: meetingTimes.clubId, time: meetingTimes.time })
        .from(meetingTimes)
        .where(inArray(meetingTimes.clubId, ids));
    const timeByClub = new Map(
        timeRows.map((r) => [r.clubId, r.time ?? "TBA"]),
    );

    return ids.map((id) => {
        const ann = latestAnnByClub.get(id);
        const scrapedData = { name: `Club ${id}` };
        //const scrapedData = scrapedClubsService.getClubData(id);
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

async function getClubAnnouncements(
    clubId: string,
): Promise<AnnouncementOverview[]> {
    const announcementRecords = await db
        .select()
        .from(announcements)
        .where(eq(announcements.clubId, parseInt(clubId)));

    return announcementRecords.map((record) => ({
        id: record.id,
        title: record.title,
        body: record.content,
        date: record.lastModified || new Date(),
        author: `User ${record.userId}`, // Get user name from user service
        pinned: record.pinned || false,
    }));
}

async function getClubData(clubId: number) {
    const scrapedData = await scrapedClubsService.getClub(clubId);
    const description =
        (await clubCommands.getClubDescription(clubId))?.description ?? null;
    const addedSocialLinks =
        (await clubCommands.getAllSocialLinks(clubId)) ?? [];
    const addedContactInfo =
        (await clubCommands.getContactInformation(clubId)) ?? null;
    const addedMeetingTime =
        (await clubCommands.getMeetingTime(clubId))?.time ?? null;
    const addedTags = (await clubCommands.getAllAddedTags(clubId)) ?? [];
    const selfReportedStatus =
        (await clubCommands.getClubStatus(clubId))?.status ?? null;
    const membershipWindow =
        (await clubCommands.getMembershipWindow(clubId))?.timePeriod ?? null;
    const membershipApplicationMethod =
        (await clubCommands.getMembershipApplicationMethod(clubId))?.method ??
        null;
    return {
        ...scrapedData,
        tags: [...scrapedData.tags, ...addedTags],
        description: description ?? scrapedData.purposeStatement,
        socialLinks: [...scrapedData.socialLinks, ...addedSocialLinks],
        contactInfo: addedContactInfo,
        meetingTime: addedMeetingTime,
        selfReportedStatus,
        membershipWindow:
            membershipWindow ?? scrapedData.timeOfYearForNewMembership,
        membershipApplicationMethod:
            membershipApplicationMethod ??
            scrapedData.howDoesAProspectiveMemberApply,
    };
}
