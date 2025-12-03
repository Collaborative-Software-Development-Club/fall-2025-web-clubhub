import { tagsService } from "@/services/discovery/tags-service";
import { HomePage } from "./home-page";
import { scrapedClubsService } from "@/services/discovery/scraped-clubs";

export default async function Home() {
    const tags = await tagsService.getAllTags();
    const clubs = await scrapedClubsService.getAllClubs();
    return <HomePage tags={tags} clubs={clubs} />;
}
