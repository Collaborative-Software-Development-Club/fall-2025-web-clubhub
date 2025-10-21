"use client";
import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { Club } from "@/app/popular_clubs/popular-clubs-page";
import { Badge } from "@/components/ui/badge";

// Support two usages:
// - Popular page: <ClubCard club={club} />
// - Browse page:  <ClubCard name=.. description=.. interests=.. />
type BrowseProps = {
    name: string;
    description: string;
    interests: string[];
    leader?: string;
    contact?: string;
};

type PopularProps = {
    club: Club;
};

type ClubCardProps = PopularProps | BrowseProps;
/*
We should have an image, title, and some other information that would be useful
to display on the main page. I was thinking we could make some kind of clickable or hover
popout to show additional information but we need to define those types before I can
add it into this ClubCard.
*/

export default function ClubCard(props: ClubCardProps) {
    // Normalize props into a `club` object used by this component
    let club: Club;

    if ("club" in props) {
        club = props.club;
    } else {
        // props is BrowseProps
        club = {
            name: props.name,
            description: props.description,
            tags: props.interests,
            leader: props.leader,
            contactEmail: props.contact,
        };
    }

    // Formats attendance rate to percentage
    const formatAttendanceRate = (rate?: number) => {
        return rate ? `${(rate * 100).toFixed(1)}%` : null;
    };

    // Formats meeting frequency to readable
    const formatMeetingFrequency = (frequency?: number) => {
        if (!frequency) return null;
        if (frequency === 1) return "Weekly";
        if (frequency === 2) return "Bi-weekly";
        if (frequency === 4) return "Monthly";
        return `Every ${frequency} weeks`;
    };

    // Displays a particular field of info
    const statField = (
        key: string | number,
        fieldTitle: string,
        value: string | number,
    ) => {
        return (
            <div
                key={String(key)}
                className="flex justify-between items-center"
            >
                <span className="text-gray-600">{fieldTitle}</span>
                <span className="font-semibold text-gray-900">{value}</span>
            </div>
        );
    };

    // inside ClubCard component, after helpers
    type StatItem = { fieldTitle: string; value: string | number };

    function buildStatList(club: Club): StatItem[] {
        const out: StatItem[] = [];

        if (club.memberCount != null)
            out.push({ fieldTitle: "Members:", value: club.memberCount });
        const attendance = formatAttendanceRate(club.attendanceRate);
        if (attendance != null)
            out.push({ fieldTitle: "Attendance:", value: attendance });
        if (club.avgAttendance != null)
            out.push({
                fieldTitle: "Avg. Turnout:",
                value: club.avgAttendance,
            });
        const meeting = formatMeetingFrequency(club.meetingFrequency);
        if (meeting != null)
            out.push({ fieldTitle: "Meetings:", value: meeting });

        return out;
    }

    const statList = buildStatList(club);
    return (
        <Card className="h-full hover:shadow-lg transition-shadow duration-200 cursor-pointer gap-3">
            <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-900 leading-tight pb-1 border-b border-gray-300">
                    {club.name || "Unknown Club Name"}
                </CardTitle>
                {club.description && (
                    <CardDescription className="line-clamp-3">
                        {club.description}
                    </CardDescription>
                )}
            </CardHeader>

            <CardContent>
                {/* Tags */}
                {club.tags && club.tags.length > 0 && (
                    <div className="mb-3">
                        {/* Display 3 tags in blue bubbles */}
                        <div className="flex flex-row flex-wrap gap-1">
                            {club.tags.map((tag: string, index: number) => (
                                <Badge key={index}>{tag}</Badge>
                            ))}
                        </div>
                    </div>
                )}

                {/* Stats Grid (render only when there's at least one stat) */}
                {statList.length > 0 && (
                    <div className="flex-1 space-y-2 text-sm">
                        {statList.map((item, index) =>
                            statField(
                                `stat-${index}`,
                                item.fieldTitle,
                                item.value,
                            ),
                        )}
                    </div>
                )}

                {/* Registration Status Badge */}
                {club.isOpen != undefined && (
                    <div className="mt-3 pt-3 border-t border-gray-300">
                        <div className="flex justify-center">
                            <Badge
                                className={`h-8 text-xs font-medium ${
                                    club.isOpen
                                        ? "bg-green-100 text-green-800"
                                        : "bg-red-100 text-red-800"
                                }`}
                            >
                                {club.isOpen
                                    ? "✓ Open for Registration"
                                    : "✗ Registration Closed"}
                            </Badge>
                        </div>
                    </div>
                )}

                {club.leader && (
                    <p className="text-sm font-medium">Leader: {club.leader}</p>
                )}
                {club.contactEmail && (
                    <p className="text-sm text-muted-foreground">
                        Contact:{" "}
                        <a
                            href={`mailto:${club.contactEmail}`}
                            className="underline"
                        >
                            {club.contactEmail}
                        </a>
                    </p>
                )}
            </CardContent>
        </Card>
    );
}
