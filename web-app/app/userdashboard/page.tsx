"use client";
import React, { useState } from "react";
import ProfileCard from "@/components/userprofile/ProfileCard";
import { mockUsers } from "@/data/mock-users";
import clubs from "@/mock/clubs.json";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ClubCalendar from "@/components/calendar/ClubCalendar";

// Mock data for announcements and meetings
const announcements = [
    {
        text: "We will be in room Hitchcock 031 for next week’s meeting.",
        club: "CSD",
        date: "9/22/25"
    },
    {
        text: "Don’t forget to bring your project proposals!",
        club: "Robotics",
        date: "9/23/25"
    }
];

const meetings = [
    { date: "9/22/25", time: "4:00 PM", club: "CSD", conflict: false },
    { date: "9/22/25", time: "4:00 PM", club: "Robotics", conflict: true },
    { date: "9/23/25", time: "5:00 PM", club: "Chess", conflict: false }
];

function ClubCard({ club }: { club: any }) {
    return (
        <Card className="rounded-xl shadow-md bg-white border border-gray-100 min-w-[192px] w-[192px] mx-2">
            <CardContent className="flex flex-col items-center p-4">
                <div className="w-full h-20 bg-gray-200 rounded-lg mb-2 flex items-center justify-center">
                    <span className="text-gray-400">Logo</span>
                </div>
                <div className="font-bold text-lg mb-1 text-center">{club["Club Name"]}</div>
                <div className="text-sm text-gray-500 text-center">
                    Next: {club["Next Meeting Date"]} {club["Next Meeting Time"]} <br />
                    {club["Next Meeting Location"]}
                </div>
            </CardContent>
        </Card>
    );
}

function AddClubCard({ onClick }: { onClick: () => void }) {
    return (
        <Card
            className="rounded-xl shadow-md bg-white border border-gray-100 min-w-[192px] w-[192px] mx-2 cursor-pointer transition hover:bg-gray-50"
            onClick={onClick}
            tabIndex={0}
            role="button"
            aria-label="Add Club"
        >
            <CardContent className="flex flex-col items-center justify-center p-4 h-full min-h-[120px]">
                <span className="text-2xl text-gray-400">+</span>
            </CardContent>
        </Card>
    );
}

function AnnouncementCarousel({ announcements }: { announcements: any[] }) {
    const [index, setIndex] = useState(0);
    const total = announcements.length;
    const current = announcements[index];

    return (
        <div className="flex items-center w-full my-6">
            <Button
                variant="ghost"
                className="p-2"
                onClick={() => setIndex((i) => (i === 0 ? total - 1 : i - 1))}
                aria-label="Previous Announcement"
            >
                <span className="text-xl text-gray-500">←</span>
            </Button>
            <Card className="rounded-full shadow-lg flex-1 mx-4">
                <CardContent className="flex flex-col justify-between min-h-[80px] py-6 px-8">
                    <div className="text-base font-medium mb-2">{current.text}</div>
                    <div className="text-sm text-gray-500 mt-auto text-right">
                        {current.club} {current.date}
                    </div>
                </CardContent>
            </Card>
            <Button
                variant="ghost"
                className="p-2"
                onClick={() => setIndex((i) => (i === total - 1 ? 0 : i + 1))}
                aria-label="Next Announcement"
            >
                <span className="text-xl text-gray-500">→</span>
            </Button>
        </div>
    );
}

// function CalendarGrid({ meetings }: { meetings: any[] }) {
//    This function is replaced by ClubCalendar component
// }

function MeetingList({ meetings }: { meetings: any[] }) {
    return (
        <div className="flex flex-col gap-2">
            {meetings.map((m, idx) => (
                <Card key={idx} className="rounded-lg shadow-sm">
                    <CardContent className="flex items-center justify-between py-3 px-4">
                        <div>
                            <span className="font-semibold">{m.date} {m.time}</span> — {m.club}
                        </div>
                        {m.conflict && (
                            <span className="text-red-600 font-bold ml-2">CONFLICT</span>
                        )}
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

export default function UserProfile() {
    const currentUser = mockUsers[0]; // Replace with actual user logic
    const userClubs = clubs.filter(club => currentUser.clubs.includes(club["Club Name"]));
    const fellowMembers = mockUsers.filter(
        user => user.clubs.some(club => currentUser.clubs.includes(club)) && user.name !== currentUser.name
    );

    return (
        <main className="flex flex-col items-center p-8 w-full max-w-[80rem] mx-auto">
            <h1 className="text-2xl font-bold mb-8">User Dashboard</h1>
            <ProfileCard user={currentUser} />

            {/* User's Clubs Section */}
            <section className="w-full mt-12">
                <h2 className="text-xl font-bold mb-6">{currentUser.name}’s Clubs</h2>
                <div className="flex flex-row overflow-x-auto pb-2">
                    {userClubs.map(club => (
                        <ClubCard key={club["Club Name"]} club={club} />
                    ))}
                    <AddClubCard onClick={() => alert("Add club dialog")} />
                </div>
            </section>

            {/* Announcements Section */}
            <section className="w-full mt-12">
                <h2 className="text-lg font-semibold mb-4">Announcements</h2>
                <AnnouncementCarousel announcements={announcements} />
            </section>

            {/* Calendar Section */}
            <section className="w-full mt-12">
                <h2 className="text-lg font-semibold mb-4">Calendar</h2>
                <div className="grid gap-8 md:grid-cols-2">
                    <ClubCalendar meetings={meetings} />
                    <MeetingList meetings={meetings} />
                </div>
            </section>

            {/* Fellow Members Section */}
            <section className="w-full mt-12">
                <h2 className="text-lg font-semibold mb-4">Fellow Club Members</h2>
                <ul className="list-none p-0 m-0">
                    {fellowMembers.map(user => (
                        <li key={user.name} className="mb-4">
                            <ProfileCard user={user} />
                        </li>
                    ))}
                </ul>
            </section>
        </main>
    );
}
