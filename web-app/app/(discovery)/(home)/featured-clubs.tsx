import { ClubCarousel } from "../club-carousel";
import { ClubCarouselHeader } from "../club-carousel-header";
import clubsData from "@/mock/clubs.json";
import { CarouselItem } from "@/components/ui/carousel";
import { ClubCard } from "../club-card";
import { PopularClubData } from "../PopularClubData";

export function FeaturedClubs() {
    const featuredCategories = [
        "Technology",
        "Academic/College",
        "Sports and Recreation",
    ]; //Can add more

    // Prepare data for category carousels
    const carouselsData = featuredCategories
        .map((category) => {
            const filteredClubs = clubsData
                .filter((club) => {
                    const primary = club.Categories?.["Primary Type"]?.trim();
                    const secondaryRaw = club.Categories?.["Secondary Types"];
                    let secondary: string[] = [];
                    if (Array.isArray(secondaryRaw)) {
                        secondary = secondaryRaw.map((s) => s.trim());
                    } else if (typeof secondaryRaw === "string") {
                        secondary = secondaryRaw
                            .split(",")
                            .map((s) => s.trim());
                    }
                    return primary === category || secondary.includes(category);
                })
                .map(mapClubData);

            return {
                name: category.replace("/", " & "),
                clubs: filteredClubs,
            };
        })
        .filter((carousel) => carousel.clubs.length > 0);
    // Get data for the "Featured" carousel
    const featuredClubs: PopularClubData[] = clubsData
        .slice(0, 6)
        .map(mapClubData);
    const sections = [
        {
            name: "Featured Clubs",
            clubs: featuredClubs,
        },
        ...carouselsData,
    ];

    return (
        <>
            {sections.map((section) =>
                section.clubs.length > 0 ? (
                    <section
                        className="container mx-auto py-8 flex flex-col gap-4"
                        key={section.name}
                    >
                        <ClubCarouselHeader name={section.name} />
                        <ClubCarousel>
                            {section.clubs.map((club, index) => (
                                <CarouselItem
                                    key={`featured-${index}`}
                                    className="pl-2 md:pl-4 basis-1/1 md:basis-1/2 lg:basis-1/3 h-full"
                                >
                                    <ClubCard club={club} />
                                </CarouselItem>
                            ))}
                        </ClubCarousel>
                    </section>
                ) : null,
            )}
        </>
    );
}

// Type definition for the structure of objects in mock/clubs.json
type ClubJsonData = {
    "Club Name": string;
    Campus?: string; // Optional fields marked with ?
    Status?: string;
    "Purpose Statement"?: string;
    Leaders?: {
        "Primary Leader"?: string;
        "Secondary Leader"?: string;
        "Treasurer Leader"?: string;
    };
    Advisors?: {
        Advisor?: string;
        "Co-Advisor"?: string;
    };
    "Contact Information": {
        // Assume this object always exists
        "Organization Email"?: string | string[]; // Can be string or array
        Instagram?: string;
        "Facebook Group Page"?: string;
        Twitter?: string;
        Other?: string;
        Website?: string;
    };
    Categories?: {
        "Primary Type"?: string;
        "Secondary Types"?: string | string[]; // Can be string or array
    };
    "Make Up"?: string;
    Constitution?: string; // Seems present in some entries
    "Meeting Information"?: {
        "Meeting Time and Place"?: string;
    };
    "Office Location"?: string;
    "Membership Details"?: {
        "Membership Type"?: string;
        "Membership Contact"?: string;
        "Time of Year for New Membership"?: string;
        "How does a Prospective Member Apply"?: string; // Corrected typo from mock data
        "Charge Dues"?: string; // Usually "Yes" or "No"
    };
    // Add any other potential fields if necessary
};

// --- Helper Function to Map JSON data to ClubType ---
const mapClubData = (clubJson: ClubJsonData): PopularClubData => {
    const primaryCategory = clubJson.Categories?.["Primary Type"]?.trim();
    const secondaryCategoriesRaw = clubJson.Categories?.["Secondary Types"];
    let secondaryCategories: string[] = [];
    if (Array.isArray(secondaryCategoriesRaw)) {
        secondaryCategories = secondaryCategoriesRaw.map((s) => s.trim());
    } else if (typeof secondaryCategoriesRaw === "string") {
        secondaryCategories = secondaryCategoriesRaw
            .split(",")
            .map((s) => s.trim());
    }

    const tags = Array.from(
        new Set(
            [primaryCategory, ...secondaryCategories].filter(
                Boolean,
            ) as string[],
        ),
    );

    const isOpen = clubJson.Status?.trim().toLowerCase() !== "inactive";

    return {
        name: clubJson["Club Name"],
        tags: tags,
        memberCount: undefined,
        avgAttendance: undefined,
        attendanceRate: undefined,
        meetingFrequency: undefined,
        isOpen: isOpen,
    };
};
