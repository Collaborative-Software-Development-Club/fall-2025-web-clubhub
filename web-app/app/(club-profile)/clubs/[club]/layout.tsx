import { TagDialog } from "@/components/club-profile/TagDialog";
import Image from "next/image";
import Link from "next/link";
import ChangeStatus from "@/components/club-profile/ChangeStatus";
import { scrapedClubsService } from "@/services/discovery/scraped-clubs";
import React from "react";
import ClubProvider from "@/components/club-profile/ClubClientProvider";
import type { ScrapedClub } from "@/services/discovery/scraped-clubs";

export interface ClubInjectedProps {
    clubId: number;
    clubData: ScrapedClub;
    isLeader: boolean;
}

export default async function ClubLeaderLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { club: string };
}) {
    const { club } = params;
    const isLeader = true; // TODO: Replace with actual authentication logic
    const clubId = Number(club);
    const clubData = await scrapedClubsService.getClub(clubId);
    console.log(children);

    return (
        <div className="flex flex-col min-h-screen w-full items-center pt-4">
            <header className="w-full max-w-5xl">
                <div className="flex w-full justify-start p-4 gap-3">
                        <Image
                            src={
                                clubData["imageUrl"] || "/default-club-logo.png"
                            }
                            alt="Club Logo"
                            width={240}
                            height={240}
                        />
                    <div className="flex flex-col w-full justify-center gap-3">
                        <div className="flex items-center gap-5">
                            <h1 className="text-xl lg:text-3xl font-bold">
                                {clubData["name"]}
                            </h1>
                            {isLeader ? (
                                <ChangeStatus
                                    initialText={clubData["status"]}
                                />
                            ) : (
                                <div className="rounded-full bg-gray-200 px-3 py-1 w-fit text-sm font-medium text-gray-700">
                                    {/* Status Badge (Todo: Implement pop up for changing status) */}
                                    {clubData["status"]}
                                </div>
                            )}
                        </div>
                        <h2 className="text-xl font-semibold">
                            {"Campus: " + clubData["campus"]}
                        </h2>
                        <div className="flex flex-wrap pt-4 gap-2 mb-6">
                            {/* Club Tags(eg. rounded badges and modify button when hovered) */}
                            <TagDialog
                                data={
                                    (
                                        clubData["tags"] as { name: string }[]
                                    ).map((t) => t.name) || []
                                }
                            />
                        </div>
                    </div>
                </div>
                <div className="w-full max-w-6xl px-4">
                    <nav className="flex gap-6 py-2 border-b border-gray-200">
                        <Link
                            href={"/clubs/" + club}
                            className="font-medium text-gray-700 hover:text-blue-600"
                        >
                            Overview
                        </Link>
                        <Link
                            href={"/clubs/" + club + "/members"}
                            className="font-medium text-gray-700 hover:text-blue-600"
                        >
                            Members
                        </Link>
                        <Link
                            href={"/meetings/" + club}
                            className="font-medium text-gray-700 hover:text-blue-600"
                        >
                            Meetings
                        </Link>
                        <Link
                            href={"/clubs/" + club + "/announcements"}
                            className="font-medium text-gray-700 hover:text-blue-600"
                        >
                            Announcements
                        </Link>
                    </nav>
                </div>
            </header>
            <main className="w-full max-w-5xl px-4">
                <ClubProvider value={{ clubData, clubId, isLeader }}>
                    {children}
                </ClubProvider>
            </main>
        </div>
    );
}
