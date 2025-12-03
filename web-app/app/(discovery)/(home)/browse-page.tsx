"use client";

import { FeaturedClubs as FeaturedClubsComponent } from "./featured-clubs";
import { ClubCard } from "@/app/(discovery)/club-card";
import { motion, AnimatePresence } from "framer-motion";
import { Tag } from "@/services/discovery/tags-service/Tag";
import { FeaturedClubs, ScrapedClub } from "@/services/discovery/scraped-clubs";

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

export function BrowsePage({
    searchedClubs,
    featuredClubs,
}: {
    featuredClubs: FeaturedClubs;
    searchedClubs: ScrapedClub[] | null;
}) {
    const isSearching = searchedClubs != null;

    return (
        <AnimatePresence mode="wait">
            {isSearching ? (
                <motion.div
                    key="searchResults" // Key is essential for AnimatePresence to work
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={sectionVariants}
                >
                    <SearchResultsList filteredClubs={searchedClubs} />
                </motion.div>
            ) : (
                <motion.div
                    key="featuredClubs" // Key is essential for AnimatePresence to work
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={sectionVariants}
                >
                    <FeaturedClubsComponent featuredClubs={featuredClubs} />
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// New component to render search results (logic from browse.tsx)
const SearchResultsList = ({
    filteredClubs,
}: {
    filteredClubs: ScrapedClub[];
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
                        <ClubCard club={club} mode="side" />
                    </motion.div>
                ))
            )}
        </div>
    </motion.main>
);
