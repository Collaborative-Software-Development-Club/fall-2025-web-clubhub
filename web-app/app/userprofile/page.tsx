"use client";
import React, { useState } from "react";
import ProfileCard from "@/components/userprofile/ProfileCard";
import { mockUsers } from "@/data/mock-users";
import clubs from "@/mock/clubs.json";
import { FaPlus, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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

// Inline styles for layout and spacing
const styles = {
    main: {
        display: "flex",
        flexDirection: "column" as const,
        alignItems: "center",
        padding: "2rem",
        width: "100%",
        maxWidth: "80rem",
        margin: "0 auto",
    },
    section: {
        width: "100%",
        marginTop: "3rem",
    },
    sectionTitle: {
        fontSize: "1.5rem",
        fontWeight: 700,
        marginBottom: "1.5rem",
    },
    clubsRow: {
        display: "flex",
        flexDirection: "row" as const,
        overflowX: "auto" as const,
        paddingBottom: "0.5rem",
    },
    fellowList: {
        listStyle: "none",
        padding: 0,
        margin: 0,
    },
    fellowListItem: {
        marginBottom: "1rem",
    },
    calendarRow: {
        display: "flex",
        flexDirection: "row" as const,
        gap: "2rem",
    },
    flex1: {
        flex: 1,
    },
};

function ClubCard({ club }: { club: any }) {
    return (
        <Card style={{ borderRadius: "1rem", boxShadow: "0 4px 24px rgba(0,0,0,0.08)", minWidth: 192, width: 192, margin: "0 0.5rem" }}>
            <CardContent style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "1rem" }}>
                <div style={{
                    width: "100%",
                    height: 80,
                    background: "#e5e7eb",
                    borderRadius: "0.5rem",
                    marginBottom: "0.5rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <span style={{ color: "#9ca3af" }}>Logo</span>
                </div>
                <div style={{ fontWeight: "bold", fontSize: "1.125rem", marginBottom: "0.25rem", textAlign: "center" }}>{club["Club Name"]}</div>
                <div style={{ fontSize: "0.95rem", color: "#6b7280", textAlign: "center" }}>
                    Next: {club["Next Meeting Date"]} {club["Next Meeting Time"]} <br />
                    {club["Next Meeting Location"]}
                </div>
            </CardContent>
        </Card>
    );
}

function AddClubCard({ onClick }: { onClick: () => void }) {
    return (
        <Card style={{
            borderRadius: "1rem",
            boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
            minWidth: 192,
            width: 192,
            margin: "0 0.5rem",
            border: "2px dashed #d1d5db",
            cursor: "pointer",
            transition: "background 0.2s"
        }}
            onClick={onClick}
            tabIndex={0}
            role="button"
            aria-label="Add Club"
        >
            <CardContent style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "1rem",
                height: "100%",
                minHeight: 120,
            }}>
                <FaPlus style={{ fontSize: "2rem", color: "#9ca3af" }} />
            </CardContent>
        </Card>
    );
}

function AnnouncementCarousel({ announcements }: { announcements: any[] }) {
    const [index, setIndex] = useState(0);
    const total = announcements.length;
    const current = announcements[index];

    return (
        <div style={{ display: "flex", alignItems: "center", width: "100%", margin: "1.5rem 0" }}>
            <Button
                variant="ghost"
                style={{ padding: "0.5rem" }}
                onClick={() => setIndex((i) => (i === 0 ? total - 1 : i - 1))}
                aria-label="Previous Announcement"
            >
                <FaChevronLeft style={{ fontSize: "1.5rem", color: "#6b7280" }} />
            </Button>
            <Card style={{ borderRadius: "9999px", boxShadow: "0 4px 24px rgba(0,0,0,0.08)", flex: 1, margin: "0 1rem" }}>
                <CardContent style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    minHeight: 80,
                    padding: "1.5rem 2rem"
                }}>
                    <div style={{ fontSize: "1.125rem", fontWeight: 500, marginBottom: "0.5rem" }}>{current.text}</div>
                    <div style={{ fontSize: "0.95rem", color: "#6b7280", marginTop: "auto", textAlign: "right" }}>
                        {current.club} {current.date}
                    </div>
                </CardContent>
            </Card>
            <Button
                variant="ghost"
                style={{ padding: "0.5rem" }}
                onClick={() => setIndex((i) => (i === total - 1 ? 0 : i + 1))}
                aria-label="Next Announcement"
            >
                <FaChevronRight style={{ fontSize: "1.5rem", color: "#6b7280" }} />
            </Button>
        </div>
    );
}

function CalendarGrid({ meetings }: { meetings: any[] }) {
    // Simple 5x7 grid for demonstration
    const days = Array.from({ length: 35 }, (_, i) => i + 1);
    return (
        <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: "0.5rem"
        }}>
            {days.map((day) => (
                <Card key={day} style={{
                    background: "#fff",
                    borderRadius: "0.5rem",
                    border: "1px solid #e5e7eb",
                    height: 64,
                    width: 64,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.85rem"
                }}>
                    <CardContent style={{ padding: "0.5rem", width: "100%", textAlign: "center" }}>
                        <div style={{ fontWeight: "bold" }}>{day}</div>
                        {meetings
                            .filter((m) => parseInt(m.date.split("/")[1]) === day)
                            .map((m, idx) => (
                                <div key={idx} style={{ fontSize: "0.7rem", color: "#6b7280" }}>
                                    {m.club}
                                </div>
                            ))}
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

function MeetingList({ meetings }: { meetings: any[] }) {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {meetings.map((m, idx) => (
                <Card key={idx} style={{ borderRadius: "0.5rem", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                    <CardContent style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "0.75rem 1rem"
                    }}>
                        <div>
                            <span style={{ fontWeight: 600 }}>{m.date} {m.time}</span> — {m.club}
                        </div>
                        {m.conflict && (
                            <span style={{ color: "#dc2626", fontWeight: "bold", marginLeft: "0.5rem" }}>CONFLICT</span>
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
        <main style={styles.main}>
            <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "2rem" }}>User Profile</h1>
            <ProfileCard user={currentUser} />

            {/* User's Clubs Section */}
            <section style={styles.section}>
                <h2 style={styles.sectionTitle}>{currentUser.name}’s Clubs</h2>
                <div style={styles.clubsRow}>
                    {userClubs.map(club => (
                        <ClubCard key={club["Club Name"]} club={club} />
                    ))}
                    <AddClubCard onClick={() => alert("Add club dialog")} />
                </div>
            </section>

            {/* Announcements Section */}
            <section style={styles.section}>
                <h2 style={{ ...styles.sectionTitle, fontSize: "1.25rem", fontWeight: 600, marginBottom: "1rem" }}>Announcements</h2>
                <AnnouncementCarousel announcements={announcements} />
            </section>

            {/* Calendar Section */}
            <section style={styles.section}>
                <h2 style={{ ...styles.sectionTitle, fontSize: "1.25rem", fontWeight: 600, marginBottom: "1rem" }}>Calendar</h2>
                <div style={styles.calendarRow}>
                    <div style={styles.flex1}>
                        <CalendarGrid meetings={meetings} />
                    </div>
                    <div style={styles.flex1}>
                        <MeetingList meetings={meetings} />
                    </div>
                </div>
            </section>

            {/* Fellow Members Section */}
            <section style={styles.section}>
                <h2 style={{ ...styles.sectionTitle, fontSize: "1.25rem", fontWeight: 600, marginBottom: "1rem" }}>Fellow Club Members</h2>
                <ul style={styles.fellowList}>
                    {fellowMembers.map(user => (
                        <li key={user.name} style={styles.fellowListItem}>
                            <ProfileCard user={user} />
                        </li>
                    ))}
                </ul>
            </section>
        </main>
    );
}
