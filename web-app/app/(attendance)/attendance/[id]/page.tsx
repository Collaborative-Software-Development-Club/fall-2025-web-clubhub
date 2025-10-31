"use client";

import { useState } from "react";
import { mockAttendance } from "@/mock/sample-attendance";
import AttendanceCodeCard from "./response/AttendanceCodeCard";
import { StudentRow } from "./StudentRow";
import { AttendanceStatus } from "./types";

export default function AttendancePage() {
    const code = "0000";
    const meetingDate = new Date();
    const [isAdmin, setIsAdmin] = useState(false);

    // Keep copy of attendance state
    const [attendance, setAttendance] = useState(() =>
        // Clone it to avoid changing original data
        mockAttendance.map((s) => ({ ...s }))
    );

    
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
            
            <AttendanceCodeCard code={code} meetingDate={meetingDate} />

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
