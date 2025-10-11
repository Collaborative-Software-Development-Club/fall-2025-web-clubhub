import { mockTagsService } from "./mock-tags-service";
import { Tag } from "./Tag";

export interface TagsService {
    getAllTags(): Promise<Tag[]>;
}

export const tagsService: TagsService = mockTagsService;
