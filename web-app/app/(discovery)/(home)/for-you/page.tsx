import { tagsService } from "@/services/discovery/tags-service";
import { ForYouDisambiguation } from "./for-you-disambiguation";

export default async function ForYouPage() {
    const allInterests = await tagsService.getAllTags();
    return <ForYouDisambiguation allInterests={allInterests} />;
}
