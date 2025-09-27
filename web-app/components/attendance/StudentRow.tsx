"use client";

import { StudentProps } from "@/types/student-attendance";

export function StudentRow({
    name,
    dotNumber,
    status,
    timestamp,
    streak,
    totalMeetings,
    attendanceRate,
    email,
}: StudentProps) {
    // Status styling helper
    const getStatusStyle = (status: StudentProps["status"]) => {
        switch (status) {
            case "present":
                return {
                    bg: "bg-green-100",
                    text: "text-green-800",
                    border: "border-green-200",
                    icon: "✓",
                };
            case "late":
                return {
                    bg: "bg-yellow-100",
                    text: "text-yellow-800",
                    border: "border-yellow-200",
                    icon: "⏰",
                };
            case "absent":
                return {
                    bg: "bg-red-100",
                    text: "text-red-800",
                    border: "border-red-200",
                    icon: "✗",
                };
            case "no-response":
                return {
                    bg: "bg-gray-100",
                    text: "text-gray-600",
                    border: "border-gray-200",
                    icon: "?",
                };
            default:
                return {
                    bg: "bg-gray-100",
                    text: "text-gray-600",
                    border: "border-gray-200",
                    icon: "?",
                };
        }
    };

    const statusStyles = getStatusStyle(status);

    // Streak emoji helper
    const getStreakEmoji = (streak: number) => {
        if (streak >= 5) return "🔥";
        if (streak >= 3) return "⚡";
        if (streak >= 1) return "✨";
        return "💤";
    };

    // Attendance rate color helper
    const getAttendanceColor = (rate: number) => {
        if (rate >= 90) return "text-green-600";
        if (rate >= 70) return "text-yellow-600";
        return "text-red-600";
    };

    return (
        <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200">
            {/* Left side - Student info */}
            <div className="flex items-center gap-4">
                {/* Avatar placeholder */}
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                        .slice(0, 2)}
                </div>

                {/* Student details */}
                <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                        <p className="font-semibold text-gray-900">{name}</p>
                        {email && (
                            <span className="text-xs text-gray-500 hover:text-blue-600 cursor-pointer">
                                📧
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>{dotNumber}</span>
                        <span>•</span>
                        <span className={getAttendanceColor(attendanceRate)}>
                            {attendanceRate.toFixed(0)}% attendance
                        </span>
                        <span className="text-gray-400">
                            ({totalMeetings} meetings)
                        </span>
                    </div>
                </div>
            </div>

            {/* Right side - Status and stats */}
            <div className="flex items-center gap-4">
                {/* Streak indicator */}
                <div className="flex items-center gap-1">
                    <span className="text-lg">{getStreakEmoji(streak)}</span>
                    <span className="text-sm font-medium text-gray-700">
                        {streak}
                    </span>
                </div>

                {/* Timestamp */}
                <div className="text-sm text-gray-600 min-w-[50px] text-right">
                    {timestamp ? (
                        <span className="font-mono">{timestamp}</span>
                    ) : (
                        <span className="text-gray-400">--:--</span>
                    )}
                </div>

                {/* Status badge */}
                <div
                    className={`px-3 py-1.5 rounded-full border ${statusStyles.bg} ${statusStyles.text} ${statusStyles.border} font-medium text-sm min-w-[80px] text-center flex items-center justify-center gap-1`}
                >
                    <span className="text-xs">{statusStyles.icon}</span>
                    <span className="capitalize">{status.replace("-", " ")}</span>
                </div>
            </div>
        </div>
    );
}
