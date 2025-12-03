"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Settings, ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import ProfileCard from "@/components/userprofile/ProfileCard";
import ClubCalendar from "@/components/calendar/ClubCalendar";
import clubs from "@/mock/clubs.json";
import announcements from "@/mock/announcements.json";

// MOCK DATA - Replace with API calls in future

const mockUsers = [
    {
        name: "John Doe",
        major: "Computer Science",
        year: "Junior",
        bio: "Passionate about software development and robotics.",
        clubs: ["Collaborative Software Development Club", "Artificial Intelligence Club"]
    },
    {
        name: "Jane Smith",
        major: "Electrical Engineering",
        year: "Senior",
        bio: "Love building circuits and embedded systems.",
        clubs: ["The AutoDrive Challenge Team at The Ohio State University", "Artificial Intelligence Club"]
    },
    {
        name: "Alex Johnson",
        major: "Data Science",
        year: "Sophomore",
        bio: "Interested in machine learning and AI applications.",
        clubs: ["Collaborative Software Development Club", "Big Data and Analytics Association"]
    }
];


// TYPES

type Meeting = {
    date: string;   // MM/DD/YY
    time: string;   // e.g. "6:30 PM"
    club: string;
    conflict: boolean | number;
};

type User = {
    name: string;
    major: string;
    year: string;
    bio: string;
    clubs: string[];
};

type Club = {
    "Club Name": string;
    [key: string]: any;
};

type Announcement = {
    clubName: string;
    message: string;
    datePosted: Date;
    expiryDate: Date;
    text?: string;
    club?: string;
    date?: string;
};

// ============================================
// API INTEGRATION FUNCTIONS (Ready for future use)
// ============================================

/**
 * Fetch current user profile from API
 * TODO: Implement when user authentication is ready
 */
async function fetchCurrentUser(): Promise<User> {
    /* 
    try {
        const res = await fetch("/api/user/profile", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch user");
        return await res.json();
    } catch (error) {
        console.error("Error fetching user:", error);
        throw error;
    }
    */
    return mockUsers[0]; // Using mock data for now
}

/**
 * Fetch user's clubs from API
 * TODO: Implement when club membership API is ready
 */
async function fetchUserClubs(userId?: string): Promise<Club[]> {
    /*
    try {
        const res = await fetch(`/api/user/clubs${userId ? `?userId=${userId}` : ""}`, { 
            cache: "no-store" 
        });
        if (!res.ok) throw new Error("Failed to fetch clubs");
        return await res.json();
    } catch (error) {
        console.error("Error fetching clubs:", error);
        throw error;
    }
    */
    const currentUser = mockUsers[0];
    return clubs.filter(club => currentUser.clubs.includes(club["Club Name"]));
}

/**
 * Fetch announcements from API
 * TODO: Implement when announcements API is ready
 */
async function fetchAnnouncements(): Promise<Announcement[]> {
    /*
    try {
        const res = await fetch("/api/announcements", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch announcements");
        const data = await res.json();
        return data.map((item: any) => ({
            ...item,
            clubName: item.clubName,
            message: item.message,
            text: item.message,
            club: item.clubName,
            date: new Date(item.datePosted).toLocaleDateString(),
            datePosted: new Date(item.datePosted),
            expiryDate: new Date(item.expiryDate),
        }));
    } catch (error) {
        console.error("Error fetching announcements:", error);
        throw error;
    }
    */
    return announcements.map((item) => ({
        ...item,
        clubName: item.clubName,
        message: item.message,
        text: item.message,
        club: item.clubName,
        date: new Date(item.datePosted).toLocaleDateString(),
        datePosted: new Date(item.datePosted),
        expiryDate: new Date(item.expiryDate),
    }));
}

/**
 * Fetch fellow club members from API
 * TODO: Implement when member directory API is ready
 */
async function fetchFellowMembers(userClubs: string[]): Promise<User[]> {
    /*
    try {
        const res = await fetch("/api/members/fellow", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ clubs: userClubs }),
            cache: "no-store"
        });
        if (!res.ok) throw new Error("Failed to fetch fellow members");
        return await res.json();
    } catch (error) {
        console.error("Error fetching fellow members:", error);
        throw error;
    }
    */
    const currentUser = mockUsers[0];
    return mockUsers.filter(
        user => user.clubs.some(club => currentUser.clubs.includes(club)) && user.name !== currentUser.name
    );
}

/**
 * Add a new club for the user
 * TODO: Implement when club join API is ready
 */
async function joinClub(clubName: string): Promise<void> {
    /*
    try {
        const res = await fetch("/api/user/clubs/join", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ clubName })
        });
        if (!res.ok) throw new Error("Failed to join club");
    } catch (error) {
        console.error("Error joining club:", error);
        throw error;
    }
    */
    alert(`Join club: ${clubName} (API not implemented yet)`);
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function initials(name: string) {
    return name.split(" ").map(n => n[0]).join("");
}

function parseDate(dateStr: string) {
    const [m, d, y] = dateStr.split("/");
    return new Date(Number(`20${y}`), Number(m) - 1, Number(d));
}

function parseTimeToMinutes(timeStr: string) {
    const [hm, ap] = timeStr.trim().split(" ");
    const [hStr, mStr = "0"] = hm.split(":");
    let h = Number(hStr);
    const m = Number(mStr);
    if (ap?.toUpperCase() === "PM" && h !== 12) h += 12;
    if (ap?.toUpperCase() === "AM" && h === 12) h = 0;
    return h * 60 + m;
}

function meetingDateTime(meeting: Meeting) {
    const d = parseDate(meeting.date);
    const minutes = parseTimeToMinutes(meeting.time || "0:00 AM");
    d.setHours(Math.floor(minutes / 60), minutes % 60, 0, 0);
    return d;
}

function formatDateOffset(offsetDays: number) {
    const d = new Date();
    d.setDate(d.getDate() + offsetDays);
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    const yy = String(d.getFullYear()).slice(-2);
    return `${mm}/${dd}/${yy}`;
}

// ============================================
// COMPONENTS
// ============================================

function ClubCard({ club }: { club: Club }) {
    return (
        <Card className="rounded-xl shadow-md bg-white border border-gray-100 min-w-[192px] w-[192px] mx-2">
            <CardContent className="flex flex-col items-center p-4">
                <div className="w-full h-20 bg-gray-200 rounded-lg mb-2 flex items-center justify-center">
                    <span className="text-gray-400">Logo</span>
                </div>
                <div className="font-bold text-lg mb-1 text-center">{club["Club Name"]}</div>
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

function AnnouncementCarousel({ announcements }: { announcements: Announcement[] }) {
    const [index, setIndex] = useState(0);
    const total = announcements.length;
    const current = announcements[index];

    return (
        <div className="flex items-center w-full my-6">
            <Button
                variant="ghost"
                className="p-2 flex-shrink-0"
                onClick={() => setIndex((i) => (i === 0 ? total - 1 : i - 1))}
                aria-label="Previous Announcement"
            >
                <ChevronLeft className="text-gray-500" />
            </Button>
            <Card className="rounded-xl shadow-md flex-1 mx-4">
                <CardContent className="flex flex-col justify-between h-[140px] py-5 px-6">
                    <div className="text-base font-medium mb-2 leading-snug overflow-hidden text-ellipsis">
                        {current.text || current.message}
                    </div>
                    <div className="text-sm text-gray-500 mt-auto text-right">
                        {current.club || current.clubName} • {current.date || current.datePosted?.toLocaleDateString()}
                    </div>
                </CardContent>
            </Card>
            <Button
                variant="ghost"
                className="p-2 flex-shrink-0"
                onClick={() => setIndex((i) => (i === total - 1 ? 0 : i + 1))}
                aria-label="Next Announcement"
            >
                <ChevronRight className="text-gray-500" />
            </Button>
        </div>
    );
}

function UpcomingEventsPanel({ meetings }: { meetings: Meeting[] }) {
    const upcoming = useMemo(() => {
        const now = new Date();
        return [...meetings]
            .filter(m => meetingDateTime(m) >= new Date(now.getFullYear(), now.getMonth(), now.getDate()))
            .sort((a, b) => meetingDateTime(a).getTime() - meetingDateTime(b).getTime())
            .slice(0, 6);
    }, [meetings]);

    return (
        <div className="rounded-xl border border-gray-200 bg-white p-2 md:p-3 shadow-sm h-full">
            <div className="flex items-center justify-between px-1 pb-2">
                <h3 className="flex border rounded-xl border-white text-base font-semibold">Upcoming Events</h3>
            </div>
            <div className="flex flex-col gap-3">
                {upcoming.length === 0 && (
                    <Card className="rounded-lg shadow-none border-dashed">
                        <CardContent className="py-6 text-center text-gray-500">
                            No upcoming events
                        </CardContent>
                    </Card>
                )}
                {upcoming.map((m, idx) => (
                    <Card key={idx} className="rounded-lg shadow-sm">
                        <CardContent className="flex items-center justify-between h-[88px] py-3 px-4">
                            <div className="min-w-0">
                                <div className="font-semibold truncate">{m.club}</div>
                                <div className="text-sm text-gray-600">{m.date} • {m.time}</div>
                            </div>
                            {m.conflict ? (
                                <Badge variant="destructive">Conflict</Badge>
                            ) : (
                                <Badge variant="secondary">Planned</Badge>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}

// ============================================
// MAIN COMPONENT
// ============================================

export default function Dashboard() {
    // State management
    const [currentUser, setCurrentUser] = useState<User>(mockUsers[0]);
    const [userClubs, setUserClubs] = useState<Club[]>([]);
    const [announcementList, setAnnouncementList] = useState<Announcement[]>([]);
    const [fellowMembers, setFellowMembers] = useState<User[]>([]);
    const [meetings, setMeetings] = useState<Meeting[]>([]);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    // Generate sample meetings based on user's clubs
    const generateSampleMeetings = (clubs: Club[]): Meeting[] => {
        const topTwoClubs = clubs.slice(0, 2);
        return [
            {
                date: formatDateOffset(1),
                time: "6:30 PM",
                club: topTwoClubs[0]?.["Club Name"] || "CSD",
                conflict: false,
            },
            {
                date: formatDateOffset(3),
                time: "5:00 PM",
                club: topTwoClubs[1]?.["Club Name"] || "Robotics Club",
                conflict: false,
            },
            {
                date: formatDateOffset(3),
                time: "5:30 PM",
                club: "AI Guild",
                conflict: true,
            },
        ];
    };

    // Load all dashboard data
    const loadDashboardData = async () => {
        setIsLoading(true);
        try {
            // Fetch user profile
            const user = await fetchCurrentUser();
            setCurrentUser(user);

            // Fetch user's clubs
            const clubs = await fetchUserClubs();
            setUserClubs(clubs);

            // Fetch announcements
            const announcements = await fetchAnnouncements();
            setAnnouncementList(announcements);

            // Fetch fellow members
            const members = await fetchFellowMembers(user.clubs);
            setFellowMembers(members);

            // Generate sample meetings (will be replaced with API call)
            setMeetings(generateSampleMeetings(clubs));
        } catch (error) {
            console.error("Error loading dashboard data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Load meetings from API
    const loadMeetings = async () => {
        try {
            // const res = await fetch("/api/meetings", { cache: "no-store" });
            // if (!res.ok) throw new Error("Failed to fetch meetings");
            // const data = await res.json();
            // setMeetings(Array.isArray(data) && data.length > 0 ? data : generateSampleMeetings(userClubs));
        } catch (error) {
            console.error("Error loading meetings:", error);
            setMeetings(generateSampleMeetings(userClubs));
        }
    };

    // Initial data load
    useEffect(() => {
        loadDashboardData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Meetings-specific load (existing API endpoint)
    useEffect(() => {
        if (userClubs.length > 0) {
            loadMeetings();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userClubs]);

    // Calendar import/export handlers
    const onClickImport = () => fileInputRef.current?.click();

    const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const fd = new FormData();
        fd.append("file", file);
        try {
            await fetch("/api/meetings/import", {
                method: "POST",
                body: fd
            });
            await loadMeetings();
        } catch (error) {
            console.error("Error importing calendar:", error);
        }
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const onClickExport = () => {
        window.location.href = "/api/meetings/export";
    };

    const handleAddClub = async () => {
        // TODO: Open club selection dialog
        // await joinClub(selectedClubName);
        // await loadDashboardData();
        alert("Add club dialog (to be implemented)");
    };

    if (isLoading) {
        return (
            <main className="flex items-center justify-center min-h-screen">
                <div className="text-lg">Loading dashboard...</div>
            </main>
        );
    }

    return (
        <main className="flex flex-col items-center p-8 w-full max-w-[80rem] mx-auto">
            {/* Header */}
            <div className="w-full flex flex-row justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold text-gray-600">
                            {initials(currentUser.name)}
                        </div>
                        <div className="leading-tight">
                            <div className="font-medium">{currentUser.name}</div>
                            <div className="text-xs text-gray-500">{currentUser.major} • {currentUser.year}</div>
                        </div>
                    </div>
                    <Button asChild variant="outline" size="icon" aria-label="Account Settings">
                        <Link href="account">
                            <Settings />
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Your Clubs */}
            <section id="your-clubs" className="w-full">
                <h2 className="text-xl font-semibold mb-4">Your Clubs</h2>
                <div className="flex flex-row flex-nowrap overflow-x-auto pb-2">
                    {userClubs.map(club => (
                        <ClubCard key={club["Club Name"]} club={club} />
                    ))}
                    <AddClubCard onClick={handleAddClub} />
                </div>
            </section>

            <Separator className="my-8" />

            {/* Announcements */}
            <section className="w-full">
                <h2 className="text-xl font-semibold mb-4">Announcements</h2>
                <AnnouncementCarousel announcements={announcementList} />
                {isDetailsOpen && (
                    <Card className="rounded-xl shadow-md mt-4">
                        <CardHeader>
                            <CardTitle className="text-lg">Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ScrollArea className="h-[200px] w-full">
                                <ul className="list-none p-0 m-0 space-y-3">
                                    {announcementList.map((ann, idx) => (
                                        <li key={idx} className="border-b pb-2 last:border-b-0">
                                            <div className="font-medium">{ann.clubName}</div>
                                            <div className="text-sm text-gray-600">{ann.message}</div>
                                            <div className="text-xs text-gray-400 mt-1">{ann.date}</div>
                                        </li>
                                    ))}
                                </ul>
                            </ScrollArea>
                        </CardContent>
                    </Card>
                )}
                <div className="flex justify-center mt-4">
                    <Button
                        variant="outline"
                        className="rounded-full gap-2"
                        onClick={() => setIsDetailsOpen(!isDetailsOpen)}
                        aria-label={isDetailsOpen ? "Hide Details" : "Show More Details"}
                    >
                        {isDetailsOpen ? (
                            <>
                                Hide Details
                                <ChevronUp className="h-4 w-4" />
                            </>
                        ) : (
                            <>
                                Show More Details
                                <ChevronDown className="h-4 w-4" />
                            </>
                        )}
                    </Button>
                </div>
            </section>

            <Separator className="my-8" />

            {/* Calendar + Upcoming Events */}
            <section className="w-full">
                <div className="flex items-center justify-between gap-4 mb-4">
                    <h2 className="text-xl font-semibold">Calendar</h2>
                    <div className="flex items-center gap-2">
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept=".ics,text/calendar"
                            className="hidden"
                            onChange={onFileChange}
                        />
                        <Button variant="outline" onClick={onClickImport}>Import .ics</Button>
                        <Button onClick={onClickExport}>Export .ics</Button>
                    </div>
                </div>

                <div className="grid items-start gap-6 md:gap-8 grid-cols-1 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] min-w-0">
                    <div className="min-w-0 rounded-xl border border-gray-200 bg-white p-2 md:p-3 shadow-sm overflow-hidden">
                        <ClubCalendar meetings={meetings} className="w-full" />
                    </div>
                    <div className="min-w-0">
                        <UpcomingEventsPanel meetings={meetings} />
                    </div>
                </div>
            </section>

            <Separator className="my-8" />

            {/* Fellow Members */}
            <section className="w-full">
                <h2 className="text-xl font-semibold mb-4">Fellow Club Members</h2>
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
