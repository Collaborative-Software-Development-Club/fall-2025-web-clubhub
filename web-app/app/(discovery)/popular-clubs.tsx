import React, { useMemo } from "react";
import { ClubCard } from "./club-card";
import { ClubCarousel } from "./club-carousel";
import { ClubCarouselHeader } from "./club-carousel-header";
import { PopularClubData } from "./PopularClubData";

// Page to show the popular clubs

export function PopularClubs(props: PopularClubsPageProps) {
    const { clubsList = sampleClubsData } = props;

    // Memoize the sorted clubs to avoid recalculating on every render
    const sortedClubs: PopularClubData[] = useMemo(() => {
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

type PopularClubsPageProps = {
    clubsList?: PopularClubData[]; // Replace this with the proper type for club in the future
};

/**
 * Sorts a list of clubs by their attributes
 * @param clubsList - List of clubs
 * @returns - list of clubs sorted by memberCount -> attendanceRate -> avgAttendance -> alphabetical
 *
 * Note: we could do a weighted sort as well
 */
function buildPopularClubs(clubsList: PopularClubData[]) {
    // Create a copy to avoid mutating the original array
    const sortedClubs = [...clubsList];

    // Sort by popularity (multiple criteria with fallbacks)
    return sortedClubs.sort((a, b) => {
        // Primary: Sort by member count (descending - more members = more popular)
        const memberDiff = (b.memberCount || 0) - (a.memberCount || 0);
        if (memberDiff !== 0) return memberDiff;

        // Secondary: Sort by attendance rate (descending - higher rate = more engaged)
        const attendanceRateDiff =
            (b.attendanceRate || 0) - (a.attendanceRate || 0);
        if (attendanceRateDiff !== 0) return attendanceRateDiff;

        // Tertiary: Sort by average attendance (descending)
        const avgAttendanceDiff =
            (b.avgAttendance || 0) - (a.avgAttendance || 0);
        if (avgAttendanceDiff !== 0) return avgAttendanceDiff;

        // Final: Alphabetical by name as tiebreaker
        return (a.name || "").localeCompare(b.name || "");
    });
}

// Sample data for testing
const sampleClubsData: PopularClubData[] = [
    {
        name: "Collaborative Software Development",
        tags: ["Programming", "Projects", "Collaboration", "Open Source"],
        memberCount: 150,
        avgAttendance: 120,
        attendanceRate: 0.8,
        meetingFrequency: 1,
        isOpen: true,
    },
    {
        name: "AI Club",
        tags: ["AI", "Machine Learning", "Research", "Innovation"],
        memberCount: 89,
        avgAttendance: 75,
        attendanceRate: 0.84,
        meetingFrequency: 1,
        isOpen: true,
    },
    {
        name: "OH/IO Hackathon",
        tags: ["Hackathon", "Competition", "Innovation", "Programming"],
        memberCount: 200,
        avgAttendance: 45,
        attendanceRate: 0.225,
        meetingFrequency: 4,
        isOpen: true,
    },
    {
        name: "Big Data Analytics Association",
        tags: ["Data Science", "Analytics", "Statistics", "Research"],
        memberCount: 67,
        avgAttendance: 52,
        attendanceRate: 0.78,
        meetingFrequency: 2,
        isOpen: true,
    },
    {
        name: "Cybersecurity Club",
        tags: ["Security", "Ethical Hacking", "Privacy", "Network Security"],
        memberCount: 95,
        avgAttendance: 68,
        attendanceRate: 0.72,
        meetingFrequency: 2,
        isOpen: false,
    },
    {
        name: "Buckeye CTF",
        tags: ["CTF", "Cybersecurity", "Competition", "Problem Solving"],
        memberCount: 45,
        avgAttendance: 38,
        attendanceRate: 0.84,
        meetingFrequency: 1,
        isOpen: true,
    },
];
