"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { InterestBar } from "../interest-bar";
import { FeaturedClubs } from "./featured-clubs";
import ClubCard from "@/app/(discovery)/browse/ClubCard";

// Define the ClubData type, matching what page.tsx provides
type ClubData = {
    id: number;
    name: string;
    description: string;
    interests: string[];
    leader: string;
    contact: string | undefined;
};

export function HomePage({
    tags,
    clubsData,
}: {
    tags: string[];
    clubsData: ClubData[];
}) {
    // --- Logic copied from browse.tsx ---
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

    const toggleInterest = (interest: string) => {
        setSelectedInterests((prev) =>
            prev.includes(interest)
                ? prev.filter((i) => i !== interest)
                : [...prev, interest],
        );
    };

    const filteredClubs = clubsData.filter((club) => {
        const matchesSearch =
            club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            club.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesInterests =
            selectedInterests.length === 0 ||
            selectedInterests.some((interest) =>
                club.interests.includes(interest),
            );
        return matchesSearch && matchesInterests;
    });
    // --- End of copied logic ---

    // Check if user is searching
    const isSearching = searchTerm.length > 0 || selectedInterests.length > 0;

    return (
        <div className="flex flex-col">
            <section className="relative flex items-center justify-center text-center mt-4">
                <div className="relative z-10 flex w-full flex-col items-center space-y-4 px-4">
                    <SearchBar
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                    />
                    <InterestBar
                        allTags={tags}
                        selectedInterests={selectedInterests}
                        onToggleInterest={toggleInterest}
                    />
                </div>
            </section>

            {isSearching ? (
                <SearchResultsList filteredClubs={filteredClubs} />
            ) : (
                <FeaturedClubs />
            )}
        </div>
    );
}

// Updated SearchBar to be controlled and have no button
const SearchBar = ({
    searchTerm,
    setSearchTerm,
}: {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
}) => (
    <div className="w-full max-w-lg items-center space-x-2">
        <Input
            type="text"
            placeholder="Search clubs or keywords"
            className="shadow-primary/50 shadow-2xl flex-1 px-8 py-6 w-full rounded-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />
    </div>
);

// New component to render search results (logic from browse.tsx)
const SearchResultsList = ({
    filteredClubs,
}: {
    filteredClubs: ClubData[];
}) => (
    <main className="flex flex-col items-center p-8 w-full max-w-4xl mx-auto">
        <div className="w-full space-y-4">
            {filteredClubs.length === 0 ? (
                <p className="text-gray-500 text-center">
                    No clubs match your search and filters.
                </p>
            ) : (
                filteredClubs.map((club) => (
                    <ClubCard
                        key={club.id}
                        name={club.name}
                        interests={club.interests}
                        description={club.description}
                        leader={club.leader}
                        contact={club.contact}
                    />
                ))
            )}
        </div>
    </main>
);