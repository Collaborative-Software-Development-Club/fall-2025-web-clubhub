"use client";

import { AttendanceStatus, StudentProps } from "@/types/student-attendance";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, XCircle, HelpCircle, Flame } from "lucide-react";

export function StudentRow({
    name,
    dotNumber,
    status,
    timestamp,
    streak,
}: StudentProps) {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
                <p className="font-medium">{name}</p>
                <p className="text-sm text-gray-400">{dotNumber}</p>
            </div>

            <div className="flex items-center gap-6">
                <StatusBadge status={status} />
                <p className="text-sm text-gray-600">{timestamp ?? "--:--"}</p>
                <Badge variant="default" className="bg-orange-100 text-orange-700 border-orange-200">
                    <Flame size={14} />
                    {streak}
                </Badge>
            </div>
        </div>
    );
}

const StatusBadge = ({ status }: { status: AttendanceStatus }) => {
    const statusConfig = {
        present: {
            variant: "default" as const,
            text: "Present",
            className: "bg-green-500 text-white",
            icon: <CheckCircle size={14} />,
        },
        late: {
            variant: "default" as const,
            text: "Late",
            className: "bg-yellow-500 text-white",
            icon: <Clock size={14} />,
        },
        absent: {
            variant: "destructive" as const,
            text: "Absent",
            icon: <XCircle size={14} />,
        },
        "no-response": {
            variant: "outline" as const,
            text: "No Response",
            className: "text-gray-500",
            icon: <HelpCircle size={14} />,
        },
    }[status] || {
        variant: "outline" as const,
        text: "Unknown",
        icon: <HelpCircle size={14} />,
    };

    return (
        <Badge variant={statusConfig.variant} className={statusConfig.className}>
            {statusConfig.icon}
            {statusConfig.text}
        </Badge>
    );
};