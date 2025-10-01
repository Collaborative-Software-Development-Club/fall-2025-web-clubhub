import React, { useMemo } from "react";
import ClubCarousel from "@/components/popular_clubs/ClubCarousel";
import ClubCard from "@/components/popular_clubs/ClubCard";
import ClubCarouselHeader from "@/components/popular_clubs/ClubCarouselHeader";

// Page to show the popular clubs

export function PopularClubsPage(props: PopularClubsPageProps) {
    const { clubsList = sampleClubsData } = props;

    // Memoize the sorted clubs to avoid recalculating on every render
    const sortedClubs: Club[] = useMemo(() => {
        return buildPopularClubs(clubsList).slice(0, 10);
    }, [clubsList]);

    // These club headers may be customized however needed
    // (we could generate them as well from the tags maybe)
    const popularClubPageHeader = "Most Popular Clubs";

    // This could be a grid as well if we want
    return (
        <div className="p-6">
            <ClubCarouselHeader name={popularClubPageHeader} />
            <ClubCarousel>
                {sortedClubs.map((club, index) => (
                    <ClubCard club={club} key={index} />
                ))}
            </ClubCarousel>
        </div>
    );
}

/*
I'm going to assume we will have a club interface/type like this:
(This is just what I thought of we can have more info too. images ideally)
*/
// Basic club type definition
export type Club = {
    name?: string; // - club name
    tags?: string[]; // - tags for club
    memberCount?: number; // (integer) - num members in club
    avgAttendence?: number; // (integer) - average attendence
    attendenceRate?: number; // (decimal: avgAttendence/memberCount) (can be derived ig)
    meetingFrequency?: number; // (idk if we need something like this just example)
    isOpen?: boolean; // - is the club open to joining/can you still apply or open registration
};

type PopularClubsPageProps = {
    clubsList?: Club[]; // Replace this with the proper type for club in the future
};

/**
 * Sorts a list of clubs by their attributes
 * @param clubsList - List of clubs
 * @returns - list of clubs sorted by memberCount -> attendenceRate -> avgAttendence -> alphabetical
 *
 * Note: we could do a weighted sort as well
 */
function buildPopularClubs(clubsList: Club[]) {
    // Create a copy to avoid mutating the original array
    const sortedClubs = [...clubsList];

    // Sort by popularity (multiple criteria with fallbacks)
    return sortedClubs.sort((a, b) => {
        // Primary: Sort by member count (descending - more members = more popular)
        const memberDiff = (b.memberCount || 0) - (a.memberCount || 0);
        if (memberDiff !== 0) return memberDiff;

        // Secondary: Sort by attendance rate (descending - higher rate = more engaged)
        const attendanceRateDiff =
            (b.attendenceRate || 0) - (a.attendenceRate || 0);
        if (attendanceRateDiff !== 0) return attendanceRateDiff;

        // Tertiary: Sort by average attendance (descending)
        const avgAttendanceDiff =
            (b.avgAttendence || 0) - (a.avgAttendence || 0);
        if (avgAttendanceDiff !== 0) return avgAttendanceDiff;

        // Final: Alphabetical by name as tiebreaker
        return (a.name || "").localeCompare(b.name || "");
    });
}

// Sample data for testing
const sampleClubsData: Club[] = [
    {
        name: "Collaborative Software Development",
        tags: ["Programming", "Projects", "Collaboration", "Open Source"],
        memberCount: 150,
        avgAttendence: 120,
        attendenceRate: 0.8,
        meetingFrequency: 1,
        isOpen: true,
    },
    {
        name: "AI Club",
        tags: ["AI", "Machine Learning", "Research", "Innovation"],
        memberCount: 89,
        avgAttendence: 75,
        attendenceRate: 0.84,
        meetingFrequency: 1,
        isOpen: true,
    },
    {
        name: "OH/IO Hackathon",
        tags: ["Hackathon", "Competition", "Innovation", "Programming"],
        memberCount: 200,
        avgAttendence: 45,
        attendenceRate: 0.225,
        meetingFrequency: 4,
        isOpen: true,
    },
    {
        name: "Big Data Analytics Association",
        tags: ["Data Science", "Analytics", "Statistics", "Research"],
        memberCount: 67,
        avgAttendence: 52,
        attendenceRate: 0.78,
        meetingFrequency: 2,
        isOpen: true,
    },
    {
        name: "Cybersecurity Club",
        tags: ["Security", "Ethical Hacking", "Privacy", "Network Security"],
        memberCount: 95,
        avgAttendence: 68,
        attendenceRate: 0.72,
        meetingFrequency: 2,
        isOpen: false,
    },
    {
        name: "Buckeye CTF",
        tags: ["CTF", "Cybersecurity", "Competition", "Problem Solving"],
        memberCount: 45,
        avgAttendence: 38,
        attendenceRate: 0.84,
        meetingFrequency: 1,
        isOpen: true,
    },
];
