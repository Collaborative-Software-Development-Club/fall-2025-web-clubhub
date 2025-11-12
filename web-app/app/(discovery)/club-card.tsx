"use client";
import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

// Unified Club type (combines PopularClubData + BrowseProps)
export type Club = {
    name?: string;
    description?: string;
    tags?: string[];
    interests?: string[]; 
    leader?: string;
    contactEmail?: string;
    contact?: string; 
    memberCount?: number;
    attendanceRate?: number;
    avgAttendance?: number;
    meetingFrequency?: number;
    isOpen?: boolean;
    image?: string;
};

type ClubCardProps = {
    club: Club;
};

export function ClubCard({ club }: ClubCardProps) {
    // Normalize tags and contact for backwards compatibility
    const displayTags = club.tags || club.interests || [];
    const contactEmail = club.contactEmail || club.contact;

    // Handle image with placeholder fallback
    const placeholderImage = "/default-club-logo.png";
    const clubImage = club.image || placeholderImage;

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
        <Card className="h-full hover:shadow-lg transition-shadow duration-200 cursor-pointer overflow-hidden">
            {/* Club Image */}
                <div className="relative w-full h-20 bg-white">
                <Image
                    src={clubImage}
                    alt={club.name || "Club image"}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                </div>


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
                {displayTags.length > 0 && (
                    <div className="mb-3">
                        <div className="flex flex-row flex-wrap gap-1">
                            {displayTags.map((tag: string, index: number) => (
                                <Badge variant="secondary" key={index}>
                                    {tag}
                                </Badge>
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
                {club.isOpen !== undefined && (
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
                {contactEmail && (
                    <p className="text-sm text-muted-foreground">
                        Contact:{" "}
                        <a
                            href={`mailto:${contactEmail}`}
                            className="underline"
                        >
                            {contactEmail}
                        </a>
                    </p>
                )}
            </CardContent>
        </Card>
    );
}