"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { mockAttendance } from "@/mock/sample-attendance";
import AttendanceCodeCard from "./response/AttendanceCodeCard";
import { StudentRow } from "./StudentRow";
import { AttendanceStatus, Meeting } from "./types";

const buildMeetingDate = (meeting: Meeting) => {
    const time = meeting.startTime ?? "00:00:00";
    const dateTimeString = `${meeting.date}T${time}`;
    const parsed = new Date(dateTimeString);

    if (Number.isNaN(parsed.getTime())) {
        return new Date(meeting.date);
    }

    return parsed;
};

export default function AttendancePage() {
    const params = useParams<{ id?: string }>();
    const rawMeetingId = params?.id;
    const meetingId = Array.isArray(rawMeetingId)
        ? rawMeetingId[0]
        : rawMeetingId;
    const [isAdmin, setIsAdmin] = useState(false);
    const [meeting, setMeeting] = useState<Meeting | null>(null);
    const [meetingError, setMeetingError] = useState<string | null>(null);
    const [isLoadingMeeting, setIsLoadingMeeting] = useState(true);

    // Keep copy of attendance state
    const [attendance, setAttendance] = useState(() =>
        // Clone it to avoid changing original data
        mockAttendance.map((s) => ({ ...s }))
    );

    useEffect(() => {
        if (!meetingId) {
            setIsLoadingMeeting(false);
            return;
        }

        let cancelled = false;

        const fetchMeeting = async () => {
            setIsLoadingMeeting(true);
            setMeetingError(null);

            try {
                const response = await fetch(`/api/meetings/${meetingId}`);
                const payload = (await response
                    .json()
                    .catch(() => null)) as { meeting?: Meeting; error?: string } | null;

                if (!response.ok) {
                    throw new Error(payload?.error ?? "Failed to load meeting");
                }

                if (!payload?.meeting) {
                    throw new Error("Meeting response is missing data");
                }

                if (!cancelled) {
                    setMeeting(payload.meeting);
                }
            } catch (error) {
                if (!cancelled) {
                    setMeetingError(
                        error instanceof Error
                            ? error.message
                            : "Failed to load meeting",
                    );
                }
            } finally {
                if (!cancelled) {
                    setIsLoadingMeeting(false);
                }
            }
        };

        void fetchMeeting();

        return () => {
            cancelled = true;
        };
    }, [meetingId]);

    const handleStatusChange = (dotNumber: string, newStatus: AttendanceStatus) => {
        // Update in-memory state so the UI reflects the change immediately
        setAttendance((prev) =>
            prev.map((s) => {
                let value = s;
                if (s.dotNumber === dotNumber) {
                    let timestamp = null;

                    if (newStatus !== "no-response") {
                        timestamp = new Date().toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit", 
                            hour12: false
                        });
                    }
                    
                    value = {
                        ...s,
                        status: newStatus,
                        timestamp,
                    };
                }
                return value;
            })
        );
    };

    return (
        <main className="flex flex-col items-center p-8 w-full max-w-3xl mx-auto">

            {/* Admin Toggle Radio Buttons */}
            <div>
                <div role="radiogroup" aria-label="Role">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            name="role"
                            value="user"
                            checked={!isAdmin}
                            onChange={() => setIsAdmin(false)}
                            className="h-4 w-4" />
                        <span>User</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            name="role"
                            value="admin"
                            checked={isAdmin}
                            onChange={() => setIsAdmin(true)}
                            className="h-4 w-4" />
                        <span>Admin</span>
                    </label>
                </div>
            </div>
            <h1 className="text-3xl font-bold mb-8">Attendance</h1>

            {meetingError ? (
                <div className="w-full text-center text-red-600">
                    {meetingError}
                </div>
            ) : meeting ? (
                <AttendanceCodeCard
                    code={meeting.code}
                    meetingDate={buildMeetingDate(meeting)}
                />
            ) : (
                <div className="w-full text-center text-muted-foreground">
                    {isLoadingMeeting ? "Loading meeting details..." : "Meeting not found."}
                </div>
            )}

            {/* Students who have responded */}
            <div className="w-full space-y-4">
                {attendance
                    .filter((student) => student.status != "no-response")
                    .sort((a, b) => {
                        const dateA = a.timestamp
                            ? new Date(a.timestamp)
                            : new Date(0);
                        const dateB = b.timestamp
                            ? new Date(b.timestamp)
                            : new Date(0);
                        return dateB.getTime() - dateA.getTime();
                    })
                    .map((student) => (
                        <StudentRow
                            key={student.dotNumber}
                            {...student}
                            onStatusChange={
                                isAdmin ? ((newStatus) => handleStatusChange(student.dotNumber, newStatus)) : undefined
                            }
                        />
                    ))}
            </div>

            <div className="flex items-center my-6 w-full">
                <div className="grow border-t border-gray-300"></div>
                <span className="mx-4 text-gray-500 font-medium">No Response</span>
                <div className="grow border-t border-gray-300"></div>
            </div>

            {/* No-response students */}
            <div className="w-full space-y-4">
                {attendance
                    .filter((student) => student.status == "no-response")
                    .map((student) => (
                        <StudentRow
                            key={student.dotNumber}
                            {...student}
                            onStatusChange={
                                isAdmin ? ((newStatus) => handleStatusChange(student.dotNumber, newStatus)) : undefined
                            }
                        />
                    ))}
            </div>
        </main>
    );
}
