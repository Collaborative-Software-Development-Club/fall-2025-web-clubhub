"use client";

import { startTransition, useState } from "react";
import AttendanceCodeCard from "./response/AttendanceCodeCard";
import { StudentRow } from "./StudentRow";
import { AttendanceStatus, AttendanceRecord } from "./types";
import { updateAttendanceStatus } from "./action";

interface AttendanceClientProps {
    meetingId: string;
    meetingTitle: string;
    meetingDescription: string | null;
    code: string;
    meetingDate: Date;
    attendanceData: AttendanceRecord[];
}

export default function AttendanceClient({
    meetingId,
    meetingTitle,
    meetingDescription,
    code,
    meetingDate,
    attendanceData,
}: AttendanceClientProps) {
    const [isAdmin, setIsAdmin] = useState(false);

    const [attendance, setAttendance] = useState(attendanceData);

    const handleStatusChange = (student: AttendanceRecord, newStatus: AttendanceStatus) => {
        // Optimistic update
        setAttendance((prev) =>
            prev.map((record) => {
                if (record.id === student.id || record.email === student.email) {
                    return {
                        ...record,
                        status: newStatus
                    }
                }
                return record;
            })
        );

        // Save to database
        startTransition(async () => {
            try {
                await updateAttendanceStatus(student.id, newStatus);
            } catch (error) {
                // Rollback optimistic update
                console.error("Failed to update attendance: ", error);
                setAttendance((prev) =>
                    prev.map((record) =>
                        record.id === student.id ? { ...record, status: record.status } : record
                    )
                );
            }
        });
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
            <AttendanceCodeCard 
                code={code} 
                meetingDate={meetingDate}
                meetingTitle={meetingTitle}
                meetingDescription={meetingDescription}
            />

            {/* Students who have responded */}
            <div className="w-full space-y-4">
                {attendance
                    .filter((student) => student.status != "no-response")
                    .sort((a, b) => {
                        const dateA = a.timestamp ? new Date(a.timestamp) : new Date(0);
                        const dateB = b.timestamp ? new Date(b.timestamp) : new Date(0);
                        return dateB.getTime() - dateA.getTime();
                    })
                    .map((student) => (
                        <StudentRow
                            key={student.email}
                            {...student}
                            onStatusChange={
                                isAdmin ? ((newStatus) => handleStatusChange(student, newStatus)) : undefined
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
                            key={student.email}
                            {...student}
                            onStatusChange={
                                isAdmin ? ((newStatus) => handleStatusChange(student, newStatus)) : undefined
                            }
                        />
                    ))}
            </div>
        </main>
    );
}
