import { tagsService } from "@/services/discovery/tags-service";
import { HomePage } from "./home-page";
import { mockTags } from "@/mock/tags"; // Using mock tags as service isn't fully shown
import clubs from "@/mock/clubs.json"; // Import the mock club data

// Define the type for the club data we will pass to the client
type ClubData = {
    id: number;
    name: string;
    description: string;
    interests: string[];
    leader: string;
    contact: string | undefined;
};

// Helper function to get all categories from a club
function getClubCategories(club: any): string[] {
    const categories = new Set<string>();
    if (club.Categories["Primary Type"]) {
        categories.add(club.Categories["Primary Type"]);
    }
    const secondary = club.Categories["Secondary Types"];
    if (Array.isArray(secondary)) {
        secondary.forEach((type) => categories.add(type));
    } else if (typeof secondary === "string") {
        categories.add(secondary);
    }
    return Array.from(categories);
}

export default async function Home() {
    const tags = mockTags; // Using mock tags

    //Process mock clubs data
    const clubsData: ClubData[] = clubs.map((club, index) => ({
        id: index, // Add an ID
        name: club["Club Name"],
        description: club["Purpose Statement"],
        interests: getClubCategories(club),
        leader: club.Leaders["Primary Leader"],
        contact: Array.isArray(club["Contact Information"]["Organization Email"])
            ? club["Contact Information"]["Organization Email"][0]
            : club["Contact Information"]["Organization Email"],
    }));

    return <HomePage tags={tags} clubsData={clubsData} />;
}