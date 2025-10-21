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
import { MoreHorizontal, Trash2, Edit } from "lucide-react";

export type Meeting = {
    id: number;
    title: string;
    date: Date;
    startTime: string;
    endTime: string;
    description?: string;
    location?: string;
};

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
    console.log(meeting);
    return (
        <Card key={meeting.id}>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle className="pb-2">{meeting.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                        {format(meeting.date, "PPP")} &middot;{" "}
                        {meeting.startTime} - {meeting.endTime}
                    </p>
                    <p className="text-sm text-muted-foreground">
                        {meeting.description ? ` · ${meeting.description}` : ""}
                    </p>
                    <p className="text-sm text-muted-foreground">
                        {meeting.location ? ` · ${meeting.location}` : ""}
                    </p>
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
