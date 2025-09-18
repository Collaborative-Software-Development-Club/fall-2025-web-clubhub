"use client";

import { StudentProps } from "@/types/student-attendance";

export function StudentRow({
    name,
    dotNumber,
    status,
    timestamp,
    streak,
}: StudentProps) {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <p className="font-medium">{name}</p>
                <p className="text-sm text-gray-400">{dotNumber}</p>
            </div>

            <div className="flex items-center gap-6">
                <span>{status}</span>
                <p className="text-sm text-gray-600">{timestamp ?? "--:--"}</p>
                <p className="text-sm text-gray-600">🔥 {streak}</p>
            </div>
        </div>
    );
}
