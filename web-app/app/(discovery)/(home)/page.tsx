import { tagsService } from "@/services/discovery/tags-service";
import { HomePage } from "./home-page";
import clubsJson from "@/mock/clubs.json";

// Define the type for the club data we will pass to the client
type ClubData = {
    id: number;
    name: string;
    description: string;
    interests: string[];
    leader: string;
    contact: string | undefined;
};

// Define a type for the raw club object from clubs.json
type MockClub = {
    "Club Name": string;
    "Purpose Statement": string;
    Categories: {
        "Primary Type": string;
        "Secondary Types"?: string | string[] | null;
    };
    Leaders: {
        "Primary Leader": string;
    };
    "Contact Information": {
        "Organization Email"?: string | string[] | null;
    };
};

// Update the function signature to use the new MockClub type
function getClubCategories(club: MockClub): string[] {
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
    const tags = await tagsService.getAllTags();

    // Cast the imported JSON to the new type
    const clubs: MockClub[] = clubsJson as MockClub[];

    const clubsData: ClubData[] = clubs.map((club, index) => ({
        id: index, // Add an ID
        name: club["Club Name"],
        description: club["Purpose Statement"],
        interests: getClubCategories(club),
        leader: club.Leaders["Primary Leader"],
        contact: Array.isArray(
            club["Contact Information"]["Organization Email"],
        )
            ? club["Contact Information"]["Organization Email"][0]
            : (club["Contact Information"]["Organization Email"] as
                  | string
                  | undefined),
    }));

    return <HomePage tags={tags.map((t) => t.name)} clubsData={clubsData} />;
}
