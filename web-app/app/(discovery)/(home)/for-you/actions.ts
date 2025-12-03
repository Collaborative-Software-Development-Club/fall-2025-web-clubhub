"use server";

import { tagsService } from "@/services/discovery/tags-service";

export async function fetchInterests() {
    return await tagsService.getAllTags();
}
