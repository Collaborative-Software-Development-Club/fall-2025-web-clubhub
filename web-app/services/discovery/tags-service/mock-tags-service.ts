import { TagsService } from ".";
import { mockTags } from "@/mock/tags";

export const mockTagsService: TagsService = {
    getAllTags,
};

async function getAllTags() {
    return mockTags.map((t) => ({
        name: t,
    }));
}
