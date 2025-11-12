import { mockTags } from "@/mock/tags";
import { TagsService } from "@/services/definition";

export const mockTagsService: TagsService = {
    getAllTags,
};

async function getAllTags() {
    return mockTags.map((t) => ({
        name: t,
    }));
}
