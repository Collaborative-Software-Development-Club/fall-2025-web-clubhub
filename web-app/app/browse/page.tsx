"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import ClubCard from "@/components/browse/ClubCard";
import mockClubs from "@/mock/clubs.json";

// Read and process mock club data from clubs.json
const clubsData = mockClubs.map((club, index) => {
  const primary = club.Categories?.["Primary Type"];
  const secondaryRaw = club.Categories?.["Secondary Types"];

  const secondary = Array.isArray(secondaryRaw)
    ? secondaryRaw
    : typeof secondaryRaw === "string"
    ? [secondaryRaw]
    : [];

  return {
    id: index + 1,
    ...club,
    interests: [primary, ...secondary].filter(Boolean),
  };
});

// OSU student organization interest categories
const interestOptions = ["Academic/College",
"Awareness/Activism",
"Community Service/Service Learning",
"Creative and Performing Arts",
"Ethnic/Cultural",
"Governance Organizations",
"Honoraries/Honor Societies",
"Media, Journalism, and Creative Writing",
"Religious/Spiritual",
"Social Fraternities/Sororities",
"Special Interest",
"Sports and Recreation",
"Technology",
"Graduate",
"Professional",
"Undergraduate"];

export default function Browse() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

    const toggleInterest = (interest: string) => {
        setSelectedInterests(prev =>
            prev.includes(interest)
                ? prev.filter(i => i !== interest)
                : [...prev, interest]
        );
    };

    const filteredClubs = clubsData.filter(club => {
        const matchesSearch = club["Club Name"].toLowerCase().includes(searchTerm.toLowerCase());
        const matchesInterests =
            selectedInterests.length === 0 ||
            selectedInterests.some(interest => club.interests.includes(interest));
        return matchesSearch && matchesInterests;
    });

    return (
        <main className="flex flex-col items-center p-8 w-full max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Browse Student Organizations</h1>

            {/* Search Input */}
            <Input type="text" placeholder="Search clubs..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>

            {/* Filters */}
            <div className="flex flex-wrap pt-4 gap-2 mb-6">
                {interestOptions.map((interest) => (
                    <Button key={interest} onClick={() => toggleInterest(interest)} variant={"outline"}
                        className={`${
                            selectedInterests.includes(interest)
                                ? "bg-blue-500 text-white border-blue-500"
                                : "bg-white text-gray-800 border-gray-300"
                        }`}
                    >
                        {interest}
                    </Button>
                ))}
            </div>

            {/* Club List */}
            <div className="w-full space-y-4">
                {filteredClubs.length === 0 ? (
                    <p className="text-gray-500 text-center">No clubs match your search and filters.</p>
                ) : (
                    filteredClubs.map((club) => (
                        <ClubCard key={club.id} name={club["Club Name"]} interests={club.interests}/>
                    ))
                )}
            </div>
        </main>
    );
}