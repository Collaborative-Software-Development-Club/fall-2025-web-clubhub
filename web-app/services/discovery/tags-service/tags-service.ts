import { db } from "@/db";
import { clubHubTags, clubTags, tags } from "@/db/schema";
import { TagsService } from "@/services/definition";
import { desc, eq, sql } from "drizzle-orm";

export const actualTagsService: TagsService = {
    getAllTags,
    getMostPopularTags,
};

async function getAllTags() {
    const customTags = await db.select().from(clubHubTags);
    const scrapedTags = (await db.select().from(tags)).map((t) => ({
        name: t.name,
        type: "DIRECTORY" as const,
    }));
    return [...scrapedTags, ...customTags];
}

async function getMostPopularTags(limit: number) {
    const rows = await db
        .select({
            name: tags.name,
            usageCount: sql<number>`count(${clubTags.clubId})`.as(
                "usage_count",
            ),
        })
        .from(tags)
        .innerJoin(clubTags, eq(clubTags.tag, tags.name))
        .groupBy(tags.name)
        .orderBy(desc(sql`usage_count`))
        .limit(limit);
    return rows.map((row) => ({
        ...row,
        type: "DIRECTORY" as const,
    }));
}
