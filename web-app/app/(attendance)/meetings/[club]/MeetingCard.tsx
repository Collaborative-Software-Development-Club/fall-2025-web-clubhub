"use client";

import Link from "next/link";
import { format } from "date-fns";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Trash2, Edit, MapPin } from "lucide-react";
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
    // Format time (e.g., "14:00" -> "2:00 PM")
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

    return (
        <Card key={meeting.id}>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle className="pb-1">{meeting.title}</CardTitle>
                    {meeting.description && (
                        <p className="text-sm text-muted-foreground pb-2">
                            {meeting.description}
                        </p>
                    )}
                    <p className="text-sm text-muted-foreground">
                        {format(meeting.date, "PPP")} · {formatTime(meeting.start_time)} – {formatTime(meeting.end_time)}
                    </p>
                    {meeting.location && (
                        <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                            <MapPin className="w-3.5 h-3.5" />
                            {meeting.location}
                        </p>
                    )}
                </div>
                <div className="flex gap-2">
                    <Button className="cursor-pointer" variant="link">
                        <Link href={`/attendance/${meeting.id}`}>
                            Take Attendance
                        </Link>
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                className="cursor-pointer"
                                variant="ghost"
                                size="icon"
                            >
                                <MoreHorizontal className="w-4 h-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={() => editMeeting(meeting.id)}
                            >
                                <Edit className="w-4 h-4 mr-2" />
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={() => deleteMeeting(meeting.id)}
                            >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardHeader>
        </Card>
    );
}
