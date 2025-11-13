import { scrapedClubsService } from "@/services/discovery/scraped-clubs";

export async function GET() {
    // add a try catch or something to give different responses on success and fail
    await scrapedClubsService.uploadScrapedClubs();
    return Response.json({ message: "Hello World" });
}
