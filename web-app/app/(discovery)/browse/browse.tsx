"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { ClubCard } from "@/app/(discovery)/club-card"
import { Toggle } from "@/components/ui/toggle";

export function Browse({
    clubsData,
    interestOptions,
}: {
    clubsData: {
        id: number;
        name: string;
        description: string;
        interests: string[];
        leader: string;
        contact: string | undefined;
    }[];
    interestOptions: string[];
}) {
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
        const matchesSearch = club.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        const matchesInterests =
            selectedInterests.length === 0 ||
            selectedInterests.some((interest) =>
                club.interests.includes(interest),
            );
        return matchesSearch && matchesInterests;
    });

    return (
        <main className="flex flex-col items-center p-8 w-full max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">
                Browse Student Organizations
            </h1>

            {/* Search Input */}
            <Input
                type="text"
                placeholder="Search clubs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* Filters */}
            <div className="flex flex-wrap pt-4 gap-2 mb-6">
                {interestOptions.map((interest) => (
                    <Toggle
                        value={interest}
                        onClick={() => toggleInterest(interest)}
                        key={interest}
                        aria-label={interest}
                        variant="outline"
                    >
                        {interest}
                    </Toggle>
                ))}
            </div>

            {/* Club List */}
            <div className="w-full space-y-4">
                {filteredClubs.length === 0 ? (
                    <p className="text-gray-500 text-center">
                        No clubs match your search and filters.
                    </p>
                ) : (
                    filteredClubs.map((club) => (
                        <ClubCard
                            key={club.id}
                            club={club}
                        />
                    ))
                )}
            </div>
        </main>
    );
}
