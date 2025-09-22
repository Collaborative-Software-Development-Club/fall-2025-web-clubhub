"use client";

import { AttendanceStatus, StudentProps } from "@/types/student-attendance";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, XCircle, HelpCircle, Flame } from "lucide-react";

const StatusBadge = ({ status }: { status: AttendanceStatus }) => {
    const getVariantAndText = (status: AttendanceStatus) => {
        switch (status) {
            case "present":
                return {
                    variant: "default" as const,
                    text: "Present",
                    className: "bg-green-500 text-white",
                    icon: <CheckCircle size={14} />
                };
            case "late":
                return {
                    variant: "default" as const,
                    text: "Late",
                    className: "bg-yellow-500 text-white",
                    icon: <Clock size={14} />
                };
            case "absent":
                return {
                    variant: "destructive" as const,
                    text: "Absent",
                    icon: <XCircle size={14} />
                };
            case "no-response":
                return {
                    variant: "outline" as const,
                    text: "No Response",
                    className: "text-gray-500",
                    icon: <HelpCircle size={14} />
                };
            default:
                return {
                    variant: "outline" as const,
                    text: "Unknown",
                    icon: <HelpCircle size={14} />
                };
        }
    };

    const { variant, text, className, icon } = getVariantAndText(status);

    return (
        <Badge variant={variant} className={className}>
            {icon}
            {text}
        </Badge>
    );
}

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
