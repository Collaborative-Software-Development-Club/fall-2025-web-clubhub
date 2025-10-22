import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ClubCarousel } from "./club-carousel";
import { ClubCarouselHeader } from "./club-carousel-header";
import clubsData from "@/mock/clubs.json";
import { CarouselItem } from "@/components/ui/carousel";
import { ClubCard } from "./club-card";
import { PopularClubData } from "./PopularClubData";
import { tagsService } from "@/services/discovery/tags-service";
import { InterestBar } from "./interest-bar";

export default async function Home() {
    // Define the categories for carousels
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
    const tags = (await tagsService.getAllTags()).map((t) => t.name);

    return (
        <div className="flex flex-col">
            {/* Section with Background, Search, and Interests */}
            <section className="relative flex h-[350px] items-center justify-center  text-center  md:h-[450px]">
                {/* Increased height */}
                {/* Content Container */}
                <div className="relative z-10 flex w-full flex-col items-center space-y-4 px-4">
                    <SearchBar />
                    <InterestBar allTags={tags} />
                </div>
            </section>

            {/* Featured Clubs Carousel */}
            {featuredClubs.length > 0 && (
                <section className="container mx-auto max-w-5xl px-4 py-8">
                    <ClubCarouselHeader name="Featured Clubs" />
                    <ClubCarousel>
                        {featuredClubs.map((club, index) => (
                            <CarouselItem
                                key={`featured-${index}`}
                                className="pl-2 md:pl-4 basis-1/1 md:basis-1/2 lg:basis-1/3 h-full"
                            >
                                <ClubCard club={club} />
                            </CarouselItem>
                        ))}
                    </ClubCarousel>
                </section>
            )}

            {/* 3. Carousels for Each Category */}
            {carouselsData.map((carousel) => (
                <section
                    key={carousel.name}
                    className="container mx-auto max-w-5xl px-4 py-8"
                >
                    <ClubCarouselHeader name={carousel.name} />
                    <ClubCarousel>
                        {carousel.clubs.map((club, index) => (
                            <CarouselItem
                                key={`${carousel.name}-${index}-${club.name || index}`}
                                className="pl-2 md:pl-4 basis-1/1 md:basis-1/2 lg:basis-1/3 h-full"
                            >
                                <ClubCard club={club} />
                            </CarouselItem>
                        ))}
                    </ClubCarousel>
                </section>
            ))}

            {/* Call to Action */}
            <section className="bg-gray-100 py-12 text-center">
                <h2 className="mb-4 text-2xl font-semibold">
                    Don&apos;t see your club?
                </h2>
                <Button className="bg-red-600 hover:bg-red-700">
                    Register Your Club
                </Button>
            </section>
        </div>
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

// --- Simple Search Bar Component ---
const SearchBar = () => (
    <div className="flex w-full max-w-lg items-center space-x-2 rounded-full border border-gray-300 bg-white p-2 shadow-md transition-shadow hover:shadow-lg">
        <Input
            type="text"
            placeholder="Search clubs or keywords"
            className="flex-1 border-none bg-transparent px-4 py-2 text-gray-900 placeholder-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0" // Added text/placeholder colors
        />
        <Button type="submit" className="rounded-full">
            Search
        </Button>
    </div>
);

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

// --- Refactored Homepage ---
