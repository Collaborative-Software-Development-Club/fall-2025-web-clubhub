"use client";

import Link from "next/link";
import { format } from "date-fns";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Trash2, Edit, MapPin, Clock } from "lucide-react";
import { Meeting } from "./types";

type MeetingCardProps = {
    meeting: Meeting;
    editMeeting: (id: number) => void;
    deleteMeeting: (id: number) => void;
};

export function MeetingCard({
    meeting,
    deleteMeeting,
    editMeeting,
}: MeetingCardProps) {
    const formatTime = (time: string) => {
        const [hours, minutes] = time.split(":");
        const date = new Date();
        date.setHours(parseInt(hours), parseInt(minutes));
        return date.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        });
    };

    const meetingDate = new Date(meeting.date);

    return (
        <Card className="p-4">
            <div className="flex items-center gap-4">
                {/* Date block */}
                <div className="flex-shrink-0 w-14 text-center">
                    <div className="text-xs font-medium text-muted-foreground uppercase">
                        {format(meetingDate, "MMM")}
                    </div>
                    <div className="text-2xl font-bold leading-none">
                        {format(meetingDate, "d")}
                    </div>
                    <div className="text-xs text-muted-foreground">
                        {format(meetingDate, "EEE")}
                    </div>
                </div>

                {/* Meeting info */}
                <div className="flex-1 min-w-0">
                    <h3 className="font-semibold truncate">{meeting.title}</h3>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {formatTime(meeting.start_time)} – {formatTime(meeting.end_time)}
                        </span>
                        {meeting.location && (
                            <span className="flex items-center gap-1 truncate">
                                <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                                {meeting.location}
                            </span>
                        )}
                    </div>
                    {meeting.description && (
                        <p className="text-sm text-muted-foreground truncate mt-0.5">
                            {meeting.description}
                        </p>
                    )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 flex-shrink-0">
                    <Button variant="outline" size="sm" asChild>
                        <Link href={`/attendance/${meeting.id}`}>
                            Attendance
                        </Link>
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="w-4 h-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => editMeeting(meeting.id)}>
                                <Edit className="w-4 h-4 mr-2" />
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => deleteMeeting(meeting.id)}>
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </Card>
    );
}
