import { scrapedClubsUploadService } from "@/services/discovery/scraped-clubs";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await scrapedClubsUploadService.uploadScrapedClubs();
        return NextResponse.json({ message: "OK" });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: error instanceof Error ? error.message : error },
            { status: 500 },
        );
    }
}
