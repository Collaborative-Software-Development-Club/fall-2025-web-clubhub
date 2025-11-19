import { TagsService } from "@/services/definition";
import { actualTagsService } from "./tags-service";

export const tagsService: TagsService = actualTagsService;
