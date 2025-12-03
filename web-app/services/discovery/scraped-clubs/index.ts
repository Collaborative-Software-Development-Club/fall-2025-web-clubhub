import { db } from "@/db";
import {
    advisors,
    clubLeaders,
    clubTags,
    leaders,
    scrapedClubs,
    socialLinks,
    tags,
} from "@/db/schema";
import { ScrapedClubsService } from "@/services/definition";
import { and, eq, getTableColumns, ilike, inArray, or, sql } from "drizzle-orm";
import { tagsService } from "../tags-service";

// I couldn't to everything in a single query even though I know it is possible and should be done that way

export const scrapedClubsService: ScrapedClubsService = {
    getClub,
    getAllClubs,
    getFeaturedClubs,
    searchClubs,
};

export type ScrapedClub = Awaited<ReturnType<typeof getClub>>;
export type FeaturedClubs = Awaited<ReturnType<typeof getFeaturedClubs>>;

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
        .from(clubTags)
        .where(eq(clubTags.clubId, id));

    return {
        ...club,
        leaders: leadersFromClub,
        socialLinks: socialLinksFromClub,
        tags: tagsFromClub,
    };
}

async function getAllClubs() {
    // Step 1: Get all clubs in one query
    const clubs = await db.select().from(scrapedClubs).limit(20);
    if (clubs.length === 0) return [];

    return await mergeAdditionalClubInfo(clubs);
}

async function searchClubs(term: string | null, tags: string[]) {
    const clubs = await db
        .select({ ...getTableColumns(scrapedClubs) })
        .from(scrapedClubs)
        .innerJoin(clubTags, eq(clubTags.clubId, scrapedClubs.id))
        .where(
            and(
                or(
                    term ? ilike(scrapedClubs.name, `%${term}%`) : undefined,
                    term
                        ? ilike(scrapedClubs.purposeStatement, `%${term}%`)
                        : undefined,
                ),
                tags.length > 0 ? inArray(clubTags.tag, tags) : undefined,
            ),
        )
        .groupBy(scrapedClubs.id)
        .limit(50);
    if (clubs.length === 0) return [];

    return await mergeAdditionalClubInfo(clubs);
}

async function getFeaturedClubs() {
    const popularTags = await tagsService.getMostPopularTags(8);
    const rows = await db
        .select({ ...getTableColumns(scrapedClubs) })
        .from(scrapedClubs)
        .innerJoin(clubTags, eq(clubTags.clubId, scrapedClubs.id))
        .where(
            inArray(
                clubTags.tag,
                popularTags.map((t) => t.name),
            ),
        )
        .limit(50)
        .groupBy(scrapedClubs.id);

    const clubs: ScrapedClub[] = await mergeAdditionalClubInfo(rows);
    return popularTags.map((tag) => ({
        name: tag.name,
        type: tag.type,
        clubs: clubs.filter((c) => c.tags.find((t) => tag.name == t.name)),
    }));
}

async function mergeAdditionalClubInfo(
    clubs: (typeof scrapedClubs.$inferSelect)[],
) {
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

    const allAdvisors = await db
        .select({
            clubId: advisors.clubId,
            name: advisors.name,
            role: advisors.role,
        })
        .from(advisors)
        .where(inArray(advisors.clubId, clubIds));

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
    const advisorsMap = new Map<number, typeof allAdvisors>();

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

    for (const advisor of allAdvisors) {
        const list = advisorsMap.get(advisor.clubId) ?? [];
        list.push(advisor);
        advisorsMap.set(advisor.clubId, list);
    }

    // Step 4: Combine everything
    const result = clubs.map((club) => ({
        ...club,
        leaders: leadersMap.get(club.id) ?? [],
        socialLinks: socialsMap.get(club.id) ?? [],
        tags: tagsMap.get(club.id) ?? [],
        advisors: advisorsMap.get(club.id) ?? [],
    }));
    return result;
}
