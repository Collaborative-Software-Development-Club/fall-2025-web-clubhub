"use client";
import { useState } from "react";

// Example club data
const clubsData = [
    { id: 1, name: "Agricultural Education Society", interests: ["Academic/College", "Awareness/Activism", "Community Service/Service Learning", "Special Interest"] },
    { id: 2, name: "Design Collective", interests: ["Creative and Performing Arts", "Academic/College", "Technology"] },
    { id: 3, name: "Sailing - Sport Club", interests: ["Sports and Recreation", "Special Interest"] },
];

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
        const matchesSearch = club.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesInterests =
            selectedInterests.length === 0 ||
            selectedInterests.some(interest => club.interests.includes(interest));
        return matchesSearch && matchesInterests;
    });

    return (
        <main className="flex flex-col items-center p-8 w-full max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Browse Student Organizations</h1>

            {/* Search Input */}
            <input
                className="border-2 rounded w-full p-2 mb-4"
                type="text"
                placeholder="Search clubs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* Filters */}
            <div className="flex flex-wrap gap-2 mb-6">
                {interestOptions.map((interest) => (
                    <button
                        key={interest}
                        onClick={() => toggleInterest(interest)}
                        className={`px-3 py-1 border rounded-full text-sm ${
                            selectedInterests.includes(interest)
                                ? "bg-blue-500 text-white border-blue-500"
                                : "bg-white text-gray-800 border-gray-300"
                        }`}
                    >
                        {interest}
                    </button>
                ))}
            </div>

            {/* Club List */}
            <div className="w-full space-y-4">
                {filteredClubs.length === 0 ? (
                    <p className="text-gray-500 text-center">No clubs match your search and filters.</p>
                ) : (
                    filteredClubs.map((club) => (
                        <div key={club.id} className="p-4 border rounded shadow-sm">
                            <h2 className="text-xl font-semibold">{club.name}</h2>
                            <p className="text-sm text-gray-600">
                                Interests: {club.interests.join(", ")}
                            </p>
                        </div>
                    ))
                )}
            </div>
        </main>
    );
}