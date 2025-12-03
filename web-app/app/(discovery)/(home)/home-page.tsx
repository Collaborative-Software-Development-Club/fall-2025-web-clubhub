"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { InterestBar } from "./interest-bar";
import { FeaturedClubs } from "./featured-clubs";
import { ClubCard } from "@/app/(discovery)/club-card";
import { motion, AnimatePresence } from "framer-motion";
import { Tag } from "@/services/discovery/tags-service/Tag";

// Define the ClubData type, matching what page.tsx provides
type ClubData = {
    id: number;
    name: string;
    description: string;
    interests: string[];
    leader: string;
    contact: string | undefined;
};

// Animation Variants for the overall section transition (Search vs. Featured)
const sectionVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: 20, transition: { duration: 0.3 } },
};

// Animation Variants for the staggered club card list container
const listContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.07, // Stagger effect on children
            delayChildren: 0.1,
        },
    },
};

// Animation Variants for individual club cards
const listItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

export function HomePage({
    tags,
    clubsData,
}: {
    tags: Tag[];
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

            {/* Use AnimatePresence to handle exit and entry animations of the content block */}
            <AnimatePresence mode="wait">
                {isSearching ? (
                    <motion.div
                        key="searchResults" // Key is essential for AnimatePresence to work
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        variants={sectionVariants}
                    >
                        <SearchResultsList filteredClubs={filteredClubs} />
                    </motion.div>
                ) : (
                    <motion.div
                        key="featuredClubs" // Key is essential for AnimatePresence to work
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        variants={sectionVariants}
                    >
                        <FeaturedClubs />
                    </motion.div>
                )}
            </AnimatePresence>
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
    <motion.main
        className="flex flex-col items-center p-8 w-full max-w-4xl mx-auto"
        variants={listContainerVariants} // container variant
        initial="hidden"
        animate="visible"
    >
        <div className="w-full space-y-4">
            {filteredClubs.length === 0 ? (
                <p className="text-gray-500 text-center">
                    No clubs match your search and filters.
                </p>
            ) : (
                filteredClubs.map((club) => (
                    <motion.div // motion.div wrapper for staggered animation
                        key={club.id}
                        variants={listItemVariants}
                    >
                        <ClubCard club={club} />
                    </motion.div>
                ))
            )}
        </div>
    </motion.main>
);
