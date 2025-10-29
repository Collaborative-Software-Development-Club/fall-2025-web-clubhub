import { tagsService } from "@/services/discovery/tags-service";
import { HomePage } from "./home-page";

export default async function Home() {
    const tags = (await tagsService.getAllTags()).map((t) => t.name);

    return <HomePage tags={tags} />;
}
