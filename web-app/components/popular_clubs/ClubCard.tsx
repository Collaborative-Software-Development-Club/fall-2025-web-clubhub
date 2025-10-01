"use client";
import React from "react";
import { Card, CardContent } from "../ui/card";
import { Club } from "../../app/popular_clubs/page";

type ClubCardProps = {
    club: Club;
};
/*
We should have an image, title, and some other information that would be useful
to display on the main page. I was thinking we could make some kind of clickable or hover
popout to show additional information but we need to define those types before I can
add it into this ClubCard.
*/

export default function ClubCard(props: ClubCardProps) {
    const { club } = props;

    // Formats attendance rate to percentage
    const formatAttendanceRate = (rate?: number) => {
        return rate ? `${(rate * 100).toFixed(1)}%` : "N/A";
    };

    // Formats meeting frequency to readable
    const formatMeetingFrequency = (frequency?: number) => {
        if (!frequency) return "N/A";
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

    // List of statistics/info to display about the club
    const statList = [
        { fieldTitle: "Members:", value: club.memberCount },
        {
            fieldTitle: "Attendance:",
            value: formatAttendanceRate(club.attendanceRate),
        },
        { fieldTitle: "Avg. Turnout:", value: club.avgAttendance },
        {
            fieldTitle: "Meetings:",
            value: formatMeetingFrequency(club.meetingFrequency),
        },
    ];

    return (
        <Card className="h-full hover:shadow-lg transition-shadow duration-200 cursor-pointer">
            <CardContent className="p-4 h-full flex flex-col">
                {/* Club Name */}
                <div className="mb-3">
                    <h3 className="text-lg font-bold text-gray-900 leading-tight">
                        {club.name || "Unknown Club"}
                    </h3>
                </div>

                {/* Tags */}
                {club.tags && club.tags.length > 0 && (
                    <div className="mb-3">
                        {/* Display 3 tags in blue bubbles */}
                        <div className="flex flex-wrap gap-1">
                            {club.tags.slice(0, 3).map((tag, index) => (
                                <span
                                    key={index}
                                    className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                                >
                                    {tag}
                                </span>
                            ))}
                            {/* If we have more tags then this shows that */}
                            {club.tags.length > 3 && (
                                <span className="text-xs text-gray-500 px-2 py-1">
                                    +{club.tags.length - 3} more
                                </span>
                            )}
                        </div>
                    </div>
                )}

                {/* Stats Grid */}
                <div className="flex-1 space-y-2 text-sm">
                    {statList.map((item, index) => {
                        // Skip null/undefined values but allow 0
                        if (item.value == null) return null;

                        return statField(
                            `stat-${index}`,
                            item.fieldTitle,
                            item.value as string | number,
                        );
                    })}
                </div>

                {/* Registration Status Badge */}
                <div className="mt-3 pt-3 border-t border-gray-100">
                    <div className="flex justify-center">
                        <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                                club.isOpen
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                            }`}
                        >
                            {club.isOpen
                                ? "✓ Open for Registration"
                                : "✗ Registration Closed"}
                        </span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
