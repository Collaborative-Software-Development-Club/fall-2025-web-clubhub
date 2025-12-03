import { db } from "@/db";
import {
    clubLeaders,
    clubTags,
    leaders,
    scrapedClubs,
    socialLinks,
} from "@/db/schema";
import { ScrapedClubsService } from "@/services/definition";
import { eq, inArray, sql } from "drizzle-orm";

// I couldn't to everything in a single query even though I know it is possible and should be done that way

export const scrapedClubsService: ScrapedClubsService = {
    getClub,
    getAllClubs,
};

export type ScrapedClub = Awaited<ReturnType<typeof getClub>>;

async function getClub(id: number) {
    const club = (
        await db.select().from(scrapedClubs).where(eq(scrapedClubs.id, id))
    )[0]!;
    const leadersFromClub = await db
        .select({
            email: leaders.email,
            name: leaders.name,
            role: clubLeaders.role,
        })
        .from(clubLeaders)
        .innerJoin(leaders, eq(leaders.email, clubLeaders.leaderId))
        .where(eq(clubLeaders.clubId, id));
    const socialLinksFromClub = await db
        .select({
            platform: socialLinks.platform,
            url: socialLinks.url,
        })
        .from(socialLinks)
        .where(eq(socialLinks.clubId, id));
    const tagsFromClub = await db
        .select({
            name: clubTags.tag,
        })
        .from(clubTags);
    return {
        ...club,
        leaders: leadersFromClub,
        socialLinks: socialLinksFromClub,
        tags: tagsFromClub,
    };
}

async function getAllClubs() {
    // Step 1: Get all clubs in one query
    const clubs = await db.select().from(scrapedClubs).limit(10);
    if (clubs.length === 0) return [];

    // Collect all club IDs to join efficiently
    const clubIds = clubs.map((c) => c.id);

    // Step 2: Fetch all relations in bulk

    // All leaders for all clubs
    const allLeaders = await db
        .select({
            clubId: clubLeaders.clubId,
            email: leaders.email,
            name: leaders.name,
            role: clubLeaders.role,
        })
        .from(clubLeaders)
        .innerJoin(leaders, eq(leaders.email, clubLeaders.leaderId))
        .where(inArray(clubLeaders.clubId, clubIds));

    // All social links for all clubs
    const allSocialLinks = await db
        .select({
            clubId: socialLinks.clubId,
            platform: socialLinks.platform,
            url: socialLinks.url,
        })
        .from(socialLinks)
        .where(inArray(socialLinks.clubId, clubIds));

    // All tags for all clubs
    const allTags = await db
        .select({
            clubId: clubTags.clubId,
            name: clubTags.tag,
        })
        .from(clubTags)
        .where(inArray(clubTags.clubId, clubIds));

    // Step 3: Group related info per club (in memory)
    const leadersMap = new Map<number, typeof allLeaders>();
    const socialsMap = new Map<number, typeof allSocialLinks>();
    const tagsMap = new Map<number, typeof allTags>();

    for (const leader of allLeaders) {
        const list = leadersMap.get(leader.clubId) ?? [];
        list.push(leader);
        leadersMap.set(leader.clubId, list);
    }

    for (const social of allSocialLinks) {
        const list = socialsMap.get(social.clubId) ?? [];
        list.push(social);
        socialsMap.set(social.clubId, list);
    }

    for (const tag of allTags) {
        const list = tagsMap.get(tag.clubId) ?? [];
        list.push(tag);
        tagsMap.set(tag.clubId, list);
    }

    // Step 4: Combine everything
    const result = clubs.map((club) => ({
        ...club,
        leaders: leadersMap.get(club.id) ?? [],
        socialLinks: socialsMap.get(club.id) ?? [],
        tags: tagsMap.get(club.id) ?? [],
    }));

    return result;
}
