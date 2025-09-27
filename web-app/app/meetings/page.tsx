"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";
import {
    Plus,
    Trash2,
    MoreHorizontal,
    Calendar as CalendarIcon,
    Edit,
} from "lucide-react";
import Link from "next/link";

type Meeting = {
    id: number;
    title: string;
    date: Date;
    startTime: string;
    endTime: string;
};

let ID_COUNTER = 0;

export default function MeetingsPage() {
    const [meetings, setMeetings] = useState<Meeting[]>([
        {
            id: ID_COUNTER++,
            title: "Meeting Placeholder",
            date: new Date(),
            startTime: "18:00",
            endTime: "19:00",
        },
    ]);
    const [title, setTitle] = useState(`Meeting #${meetings.length}`);
    const [date, setDate] = useState<Date | undefined>(undefined);
    const [startTime, setStartTime] = useState<string>("18:00");
    const [endTime, setEndTime] = useState<string>("19:00");

    // Control popovers
    const [formOpen, setFormOpen] = useState(false);
    const [calendarOpen, setCalendarOpen] = useState(false);

    const addMeeting = (): void => {
        if (!title || !date || !startTime || !endTime) return;
        setMeetings((prev) => [
            ...prev,
            { id: ID_COUNTER++, title, date, startTime, endTime },
        ]);
        setTitle(`Meeting #${meetings.length + 1}`);
        setDate(undefined);
        setStartTime("18:00");
        setEndTime("19:00");
        setFormOpen(false);
    };

    const deleteMeeting = (id: number): void => {
        setMeetings((prev) => prev.filter((m) => m.id !== id));
    };

    return (
        <div className="container mx-auto max-w-xl py-8">
            <h1 className="text-3xl font-bold mb-6">Club Meetings</h1>

            {/* Create New Meeting Popover */}
            <Popover open={formOpen} onOpenChange={setFormOpen}>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="mb-2 cursor-pointer">
                        <Plus /> Create New Meeting
                    </Button>
                </PopoverTrigger>

                <PopoverContent className="w-[300px] p-4">
                    <h2 className="text-lg font-semibold mb-4 text-center">
                        New Meeting
                    </h2>
                    <div className="flex flex-col gap-3">
                        <Input
                            placeholder="Meeting Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />

                        {/* Date Picker */}
                        <Popover
                            open={calendarOpen}
                            onOpenChange={setCalendarOpen}
                        >
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="w-full justify-start text-left font-normal cursor-pointer"
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date ? (
                                        format(date, "PPP")
                                    ) : (
                                        <span>Pick a date</span>
                                    )}
                                </Button>
                            </PopoverTrigger>

                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={(selectedDate) => {
                                        setDate(selectedDate);
                                        setCalendarOpen(false);
                                    }}
                                />
                            </PopoverContent>
                        </Popover>

                        <div className="flex items-center">
                            <Input
                                type="time"
                                step={60}
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                                className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                            />
                            <span className="px-2">to</span>
                            <Input
                                type="time"
                                step={60}
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                                className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                            />
                        </div>

                        <Button
                            onClick={addMeeting}
                            className="mt-2 cursor-pointer"
                        >
                            <Plus className="w-4 h-4 mr-2" /> Add Meeting
                        </Button>
                    </div>
                </PopoverContent>
            </Popover>

            {/* Meetings List */}
            <div className="space-y-4">
                {meetings.length === 0 && (
                    <p className="text-muted-foreground">
                        No meetings scheduled.
                    </p>
                )}
                {meetings.map((meeting) => (
                    <Card key={meeting.id}>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle className="pb-2">
                                    {meeting.title}
                                </CardTitle>
                                <p className="text-sm text-muted-foreground">
                                    {format(meeting.date, "PPP")} &middot;{" "}
                                    {meeting.startTime} - {meeting.endTime}
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    className="cursor-pointer"
                                    variant="link"
                                >
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
                                        <DropdownMenuItem className="cursor-pointer">
                                            <Edit className="w-4 h-4 mr-2" />
                                            Edit
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            className="cursor-pointer"
                                            onClick={() =>
                                                deleteMeeting(meeting.id)
                                            }
                                        >
                                            <Trash2 className="w-4 h-4 mr-2" />
                                            Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </div>
    );
}
