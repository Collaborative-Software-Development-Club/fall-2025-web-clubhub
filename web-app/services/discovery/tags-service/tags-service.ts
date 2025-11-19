import { db } from "@/db";
import { clubHubTags, tags } from "@/db/schema";
import { mockTags } from "@/mock/tags";
import { TagsService } from "@/services/definition";

export const actualTagsService: TagsService = {
    getAllTags,
};

async function getAllTags() {
    const customTags = await db.select().from(clubHubTags);
    /*
    const scrapedTags = (await db.select().from(tags)).map((t) => ({
        name: t.name,
        type: "DIRECTORY" as const,
    }));
    */
    const scrapedTags = mockTags;
    return [...customTags, ...scrapedTags];
}
