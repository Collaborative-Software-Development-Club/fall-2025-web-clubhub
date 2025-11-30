"use client";

import {
    AttendanceStatus,
    AttendanceRecord,
    ATTENDANCE_STATUSES,
} from "@/app/(attendance)/attendance/[id]/types";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, XCircle, HelpCircle, Flame } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
} from "@/components/ui/select";

interface StudentRowProps extends AttendanceRecord {
    onStatusChange?: (newStatus: AttendanceStatus) => void;
}

export function StudentRow({
    name,
    email,
    status,
    timestamp,
    streak,
    onStatusChange,
}: StudentRowProps) {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2 basis-1/2 shrink-0 grow-0">
                <p className="font-medium">{name}</p>
                <p className="text-sm text-gray-400">
                    {email.toLowerCase()}
                </p>
            </div>

            <div className="flex items-center gap-6 basis-1/2 shrink-0 grow-0 justify-end">
                <StatusBadge status={status} onStatusChange={onStatusChange} />
                <p className="text-sm text-gray-600 basis-3/20 shrink-0 grow-0 whitespace-nowrap">
                    {timestamp ?? "--:--"}
                </p>
                <Badge
                    variant="default"
                    className="bg-orange-100 text-orange-700 border-orange-200 basis-3/20 shrink-0 grow-0"
                >
                    <Flame size={14} />
                    {streak}
                </Badge>
            </div>
        </div>
    );
}

const statusConfigs = {
    present: {
        variant: "default" as const,
        text: "Present",
        className: "bg-green-500 hover:bg-green-600 text-white",
        icon: <CheckCircle size={14} className="text-white" />,
    },
    late: {
        variant: "default" as const,
        text: "Late",
        className: "bg-yellow-500 hover:bg-yellow-600 text-white",
        icon: <Clock size={14} className="text-white" />,
    },
    absent: {
        variant: "destructive" as const,
        text: "Absent",
        className: "bg-red-500 hover:bg-red-600 text-white",
        icon: <XCircle size={14} className="text-white" />,
    },
    "no-response": {
        variant: "outline" as const,
        text: "No Answer",
        className: "bg-gray-500 hover:bg-gray-600 text-white",
        icon: <HelpCircle size={14} className="text-white" />,
    },
};

const StatusBadge = ({
    status,
    onStatusChange,
}: {
    status: AttendanceStatus;
    onStatusChange?: (newStatus: AttendanceStatus) => void;
}) => {
    const statusConfig = statusConfigs[status] || {
        variant: "outline" as const,
        text: "Unknown",
        icon: <HelpCircle size={14} />,
    };

    if (!onStatusChange) {
        return (
            <Badge
                variant={statusConfig.variant}
                className={`${statusConfig.className} basis-3/20 shrink-0 grow-0 min-w-[100px]`}
            >
                {statusConfig.icon}
                {statusConfig.text}
            </Badge>
        );
    }

    return (
        <Select value={status} onValueChange={onStatusChange}>
            <SelectTrigger
                className={`${statusConfig.className} basis-3/20 shrink-0 grow-0 min-w-[120px] hover:cursor-pointer [&>svg:last-child]:text-white [&>svg:last-child]:opacity-100 h-auto py-0.5 px-2.5 text-xs font-small`}>
                {statusConfig.icon}
                {statusConfig.text}
            </SelectTrigger>
            <SelectContent>
                {ATTENDANCE_STATUSES.map((key) => {
                    const config = statusConfigs[key];
                    return (
                        <SelectItem
                            key={key}
                            value={key}
                            className={`my-1 cursor-pointer ${config.className.replace('hover:', 'focus:')}
                                focus:brightness-90 hover:brightness-110 focus:text-white`}
                        >
                            <div className="flex items-center gap-2">
                                {config.icon}
                                {config.text}
                            </div>
                        </SelectItem>
                    );
                })}
            </SelectContent>
        </Select>
    );
};
