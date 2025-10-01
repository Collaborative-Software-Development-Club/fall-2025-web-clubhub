"use client";
import React from "react";
import ProfileCard from "@/components/userprofile/ProfileCard";
import { mockUsers } from "@/data/mock-users";
import clubs from "@/mock/clubs.json";
import { useState } from "react";
import { FaPlus, FaChevronLeft, FaChevronRight } from "react-icons/fa";

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
        <div className="flex flex-col items-center bg-white rounded-xl shadow-md p-4 mx-2 w-48 min-w-48">
            <div className="w-full h-20 bg-gray-200 rounded-md mb-2 flex items-center justify-center">
                {/* Placeholder for club logo/image */}
                <span className="text-gray-400">Logo</span>
            </div>
            <div className="font-bold text-lg mb-1 text-center">{club["Club Name"]}</div>
            <div className="text-sm text-gray-600 text-center">
                Next: {club["Next Meeting Date"]} {club["Next Meeting Time"]} <br />
                {club["Next Meeting Location"]}
            </div>
        </div>
    );
}

function AddClubCard({ onClick }: { onClick: () => void }) {
    return (
        <button
            className="flex flex-col items-center justify-center bg-white rounded-xl shadow-md p-4 mx-2 w-48 min-w-48 border-2 border-dashed border-gray-300 hover:bg-gray-100 transition"
            onClick={onClick}
            aria-label="Add Club"
        >
            <FaPlus className="text-3xl text-gray-400" />
        </button>
    );
}

function AnnouncementCarousel({ announcements }: { announcements: any[] }) {
    const [index, setIndex] = useState(0);
    const total = announcements.length;
    const current = announcements[index];

    return (
        <div className="flex items-center w-full my-6">
            <button
                className="p-2"
                onClick={() => setIndex((i) => (i === 0 ? total - 1 : i - 1))}
                aria-label="Previous Announcement"
            >
                <FaChevronLeft className="text-2xl text-gray-500" />
            </button>
            <div className="flex-1 mx-4 bg-white rounded-full shadow-md px-8 py-6 flex flex-col justify-between min-h-[80px]">
                <div className="text-lg font-medium mb-2">{current.text}</div>
                <div className="text-sm text-gray-500 mt-auto text-right">
                    {current.club} {current.date}
                </div>
            </div>
            <button
                className="p-2"
                onClick={() => setIndex((i) => (i === total - 1 ? 0 : i + 1))}
                aria-label="Next Announcement"
            >
                <FaChevronRight className="text-2xl text-gray-500" />
            </button>
        </div>
    );
}

function CalendarGrid({ meetings }: { meetings: any[] }) {
    // Simple 5x7 grid for demonstration
    const days = Array.from({ length: 35 }, (_, i) => i + 1);
    return (
        <div className="grid grid-cols-7 gap-2">
            {days.map((day) => (
                <div
                    key={day}
                    className="bg-white rounded-md border border-gray-200 h-16 w-16 flex flex-col items-center justify-center text-xs"
                >
                    <div className="font-bold">{day}</div>
                    {meetings
                        .filter((m) => parseInt(m.date.split("/")[1]) === day)
                        .map((m, idx) => (
                            <div key={idx} className="text-[10px] text-gray-600">
                                {m.club}
                            </div>
                        ))}
                </div>
            ))}
        </div>
    );
}

function MeetingList({ meetings }: { meetings: any[] }) {
    return (
        <div className="flex flex-col gap-2">
            {meetings.map((m, idx) => (
                <div
                    key={idx}
                    className="bg-white rounded-md shadow px-4 py-2 flex items-center justify-between"
                >
                    <div>
                        <span className="font-semibold">{m.date} {m.time}</span> — {m.club}
                    </div>
                    {m.conflict && (
                        <span className="text-red-600 font-bold ml-2">CONFLICT</span>
                    )}
                </div>
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
        <main className="flex flex-col items-center p-8 w-full max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">User Profile</h1>
            <ProfileCard user={currentUser} />

            {/* User's Clubs Section */}
            <section className="w-full mt-10">
                <h2 className="text-2xl font-bold mb-6">{currentUser.name}’s Clubs</h2>
                <div className="flex flex-row overflow-x-auto pb-2">
                    {userClubs.map(club => (
                        <ClubCard key={club["Club Name"]} club={club} />
                    ))}
                    <AddClubCard onClick={() => alert("Add club dialog")} />
                </div>
            </section>

            {/* Announcements Section */}
            <section className="w-full mt-12">
                <h2 className="text-xl font-semibold mb-4">Announcements</h2>
                <AnnouncementCarousel announcements={announcements} />
            </section>

            {/* Calendar Section */}
            <section className="w-full mt-12">
                <h2 className="text-xl font-semibold mb-4">Calendar</h2>
                <div className="flex flex-row gap-8">
                    <div className="flex-1">
                        <CalendarGrid meetings={meetings} />
                    </div>
                    <div className="flex-1">
                        <MeetingList meetings={meetings} />
                    </div>
                </div>
            </section>

            {/* Fellow Members Section (unchanged) */}
            <section className="w-full mt-12">
                <h2 className="text-xl font-semibold mb-4">Fellow Club Members</h2>
                <ul>
                    {fellowMembers.map(user => (
                        <li key={user.name}>
                            <ProfileCard user={user} />
                        </li>
                    ))}
                </ul>
            </section>
        </main>
    );
}
