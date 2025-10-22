"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ClubCardComponent from "@/components/popular_clubs/ClubCard";
import ClubCarousel from "@/components/popular_clubs/ClubCarousel";
import ClubCarouselHeader from "@/components/popular_clubs/ClubCarouselHeader";
import { Club as ClubType } from "./popular_clubs/popular-clubs-page";
import clubsData from "@/mock/clubs.json";
import { CarouselItem } from "@/components/ui/carousel";

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
  "Contact Information": { // Assume this object always exists
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
        <Button type="submit" className="rounded-full bg-red-500 px-4 py-2 hover:bg-red-600">
            Search
        </Button>
    </div>
);

// --- Interest Bar Component ---
const InterestBar = () => {
    const allPrimaryCategories = clubsData.map(club => club.Categories?.["Primary Type"]?.trim()).filter(Boolean) as string[];
    const uniqueInterests = Array.from(new Set(allPrimaryCategories));
    const visibleInterests = uniqueInterests.slice(0, 7);
    const hiddenInterestCount = uniqueInterests.length - visibleInterests.length;

    return (
        <div className="flex w-full max-w-3xl items-center space-x-2 overflow-x-auto py-2 scrollbar-hide">
            {visibleInterests.map((interest) => (
                <Button
                    key={interest}
                    variant="outline"
                    size="sm"
                    className="flex-shrink-0 rounded-full border-gray-300 bg-white text-gray-700 hover:border-gray-400 hover:bg-gray-50" // Updated background and hover
                >
                    {interest}
                </Button>
            ))}
            {hiddenInterestCount > 0 && (
                <Button
                    variant="outline"
                    size="sm"
                    className="flex-shrink-0 rounded-full border-gray-300 bg-white text-gray-700 hover:border-gray-400 hover:bg-gray-50" // Updated background and hover
                >
                    + {hiddenInterestCount} more
                </Button>
            )}
             {/* Add styling for scrollbar hiding if needed */}
             <style jsx>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none; /* IE and Edge */
                    scrollbar-width: none; /* Firefox */
                }
            `}</style>
        </div>
    );
};

// --- Helper Function to Map JSON data to ClubType ---
const mapClubData = (clubJson: ClubJsonData): ClubType => {
    const primaryCategory = clubJson.Categories?.["Primary Type"]?.trim();
    const secondaryCategoriesRaw = clubJson.Categories?.["Secondary Types"];
    let secondaryCategories: string[] = [];
    if (Array.isArray(secondaryCategoriesRaw)) {
        secondaryCategories = secondaryCategoriesRaw.map((s) => s.trim());
    } else if (typeof secondaryCategoriesRaw === "string") {
        secondaryCategories = secondaryCategoriesRaw.split(",").map((s) => s.trim());
    }

    const tags = Array.from(
        new Set(
            [primaryCategory, ...secondaryCategories].filter(Boolean) as string[],
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
export default function Home() {
    // Define the categories for carousels
    const featuredCategories = ["Technology", "Academic/College", "Sports and Recreation"]; //Can add more

    // Prepare data for category carousels
    const carouselsData = featuredCategories.map((category) => {
        const filteredClubs = clubsData
            .filter((club) => {
                const primary = club.Categories?.["Primary Type"]?.trim();
                const secondaryRaw = club.Categories?.["Secondary Types"];
                let secondary: string[] = [];
                 if (Array.isArray(secondaryRaw)) {
                    secondary = secondaryRaw.map(s => s.trim());
                } else if (typeof secondaryRaw === 'string') {
                    secondary = secondaryRaw.split(',').map(s => s.trim());
                }
                return primary === category || secondary.includes(category);
            })
            .map(mapClubData);

        return {
            name: category.replace("/", " & "),
            clubs: filteredClubs,
        };
    }).filter(carousel => carousel.clubs.length > 0);

    // Get data for the "Featured" carousel
    const featuredClubs: ClubType[] = clubsData.slice(0, 6).map(mapClubData);

    return (
        <div className="flex flex-col">
            {/* Section with Background, Search, and Interests */}
            <section className="relative flex h-[350px] items-center justify-center bg-gray-200 bg-cover bg-center text-center text-white md:h-[450px]"> {/* Increased height */}
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-800 opacity-80"></div>
                {/* Content Container */}
                <div className="relative z-10 flex w-full flex-col items-center space-y-4 px-4">
                    <h1 className="text-3xl font-bold md:text-4xl">
                        Find your community at OSU
                    </h1>
                    <SearchBar />
                    <InterestBar />
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
                                <ClubCardComponent club={club} />
                            </CarouselItem>
                        ))}
                    </ClubCarousel>
                </section>
            )}

            {/* 3. Carousels for Each Category */}
            {carouselsData.map((carousel) => (
                <section key={carousel.name} className="container mx-auto max-w-5xl px-4 py-8">
                    <ClubCarouselHeader name={carousel.name} />
                    <ClubCarousel>
                        {carousel.clubs.map((club, index) => (
                            <CarouselItem
                                key={`${carousel.name}-${index}-${club.name || index}`}
                                className="pl-2 md:pl-4 basis-1/1 md:basis-1/2 lg:basis-1/3 h-full"
                            >
                                <ClubCardComponent club={club} />
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