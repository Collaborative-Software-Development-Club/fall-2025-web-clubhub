"use client";
import React from "react";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Club } from "@/app/popular_clubs/popular-clubs-page";
import { Badge } from "@/components/ui/badge";

type ClubCardProps = {
    club: Club;
};

// Placeholder image from public
const PLACEHOLDER_IMAGE = "/default-club-logo.png";

export default function ClubCard({ club }: ClubCardProps) {
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

    // Build stat list only with available data
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
    const imageUrl = club.image || PLACEHOLDER_IMAGE;

    return (
        <Card className="h-full hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer gap-3 overflow-hidden flex flex-col border-2 border-transparent hover:border-gray-200">
            {/* Club Image */}
            <div className="relative w-full h-40 bg-white overflow-hidden flex items-center justify-center">
                <Image
                    src={imageUrl}
                    alt={club.name || "Club image"}
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>

            <CardHeader className="flex-1 flex flex-col">
                <CardTitle className="text-lg font-bold text-gray-900 leading-tight pb-1 border-b border-gray-300">
                    {club.name || "Unknown Club Name"}
                </CardTitle>
                {club.description && (
                    <CardDescription className="line-clamp-3 mt-2">
                        {club.description}
                    </CardDescription>
                )}
            </CardHeader>

            <CardContent className="flex flex-col gap-3">
                {/* Tags */}
                {club.tags && club.tags.length > 0 && (
                    <div>
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
                {club.isOpen !== undefined && (
                    <div className="pt-3 border-t border-gray-300">
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

                {/* Leader and Contact Info */}
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

