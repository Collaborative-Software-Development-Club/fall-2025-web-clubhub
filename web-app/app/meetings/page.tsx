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
import { MeetingCard } from "@/components/attendance/MeetingCard";

type Meeting = {
    id: number;
    title: string;
    date: Date;
    startTime: string;
    endTime: string;
    description?: string;
    location?: string;
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
            description: "enter description here",
            location: "enter location here",
        },
    ]);
    const [title, setTitle] = useState(`Meeting #${meetings.length}`);
    const [date, setDate] = useState<Date | undefined>(new Date(Date.now()));
    const [startTime, setStartTime] = useState<string>("18:00");
    const [endTime, setEndTime] = useState<string>("19:00");
    const [description, setDescription] = useState<string>("enter description here");
    const [location, setLocation] = useState<string>("enter location here");

    // Control popovers
    const [formOpen, setFormOpen] = useState(false);
    const [calendarOpen, setCalendarOpen] = useState(false);

    // Edit meeting state
    const [editFormOpen, setEditFormOpen] = useState(false);
    const [editCalendarOpen, setEditCalendarOpen] = useState(false);
    const [editingMeetingId, setEditingMeetingId] = useState<number | null>(null);
    const [editTitle, setEditTitle] = useState("");
    const [editDate, setEditDate] = useState<Date | undefined>();
    const [editStartTime, setEditStartTime] = useState("");
    const [editEndTime, setEditEndTime] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [editLocation, setEditLocation] = useState("");

    const addMeeting = (): void => {
        if (!title || !date || !startTime || !endTime) return;
        setMeetings((prev) => [
            ...prev,
            { id: ID_COUNTER++, title, date, startTime, endTime, description, location },
        ]);
        setTitle(`Meeting #${meetings.length + 1}`);
        setDate(new Date(Date.now()));
        setStartTime("18:00");
        setEndTime("19:00");
        setDescription("enter description here");
        setLocation("enter location here");
        setFormOpen(false);
    };

    const editMeeting = (id: number): void => {
        console.log("Edit meeting clicked for ID:", id); // Debug log
        const meeting = meetings.find(m => m.id === id);
        if (meeting) {
            setEditingMeetingId(id);
            setEditTitle(meeting.title);
            setEditDate(meeting.date);
            setEditStartTime(meeting.startTime);
            setEditEndTime(meeting.endTime);
            setEditDescription(meeting.description || "");
            setEditLocation(meeting.location || "");
            setEditFormOpen(true);
            
        }
    };

    const saveEditMeeting = (): void => {
        if (!editTitle || !editDate || !editStartTime || !editEndTime || !editingMeetingId) return;
        
        setMeetings(prev => prev.map(meeting => 
            meeting.id === editingMeetingId 
                ? { 
                    ...meeting, 
                    title: editTitle, 
                    date: editDate, 
                    startTime: editStartTime, 
                    endTime: editEndTime, 
                    description: editDescription,
                    location: editLocation,
                  }
                : meeting
        ));
        
        cancelEdit();
    };

    const cancelEdit = (): void => {
        setEditingMeetingId(null);
        setEditTitle("");
        setEditDate(undefined);
        setEditStartTime("");
        setEditEndTime("");
        setEditDescription("");
        setEditLocation("");
        setEditFormOpen(false);
        setEditCalendarOpen(false);
    };
    const deleteMeeting = (id: number): void => {
        setMeetings((prev) => prev.filter((m) => m.id !== id));
    };

    return (
        <main className="container mx-auto max-w-xl py-8">
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
                        <div className="flex items-center">
                            <Input
                                placeholder="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center">
                            <Input
                                placeholder="Location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                        </div>

                        <Button
                            onClick={addMeeting}
                            className="mt-2 cursor-pointer"
                            disabled={!title || !date || !startTime || !endTime}
                        >
                            <Plus className="w-4 h-4 mr-2" /> Add Meeting
                        </Button>
                    </div>
                </PopoverContent>
            </Popover>

            {/* Edit Meeting Popover-Style Overlay */}
            {editFormOpen && (
                <div className="fixed inset-0 z-50">
                    {/* Backdrop */}
                    <div 
                        className="fixed inset-0 bg-black/20" 
                        onClick={cancelEdit}
                    ></div>
                    
                    {/* Popover-style content */}
                    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="bg-white rounded-md border shadow-md p-4 w-[300px]">
                            <h2 className="text-lg font-semibold mb-4 text-center">
                                Edit Meeting
                            </h2>
                            <div className="flex flex-col gap-3">
                                <Input
                                    placeholder="Meeting Title"
                                    value={editTitle}
                                    onChange={(e) => setEditTitle(e.target.value)}
                                />

                                {/* Date Picker for Edit */}
                                <Popover
                                    open={editCalendarOpen}
                                    onOpenChange={setEditCalendarOpen}
                                >
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className="w-full justify-start text-left font-normal cursor-pointer"
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {editDate ? (
                                                format(editDate, "PPP")
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                        </Button>
                                    </PopoverTrigger>

                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={editDate}
                                            onSelect={(selectedDate) => {
                                                setEditDate(selectedDate);
                                                setEditCalendarOpen(false);
                                            }}
                                        />
                                    </PopoverContent>
                                </Popover>

                                <div className="flex items-center">
                                    <Input
                                        type="time"
                                        step={60}
                                        value={editStartTime}
                                        onChange={(e) => setEditStartTime(e.target.value)}
                                        className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                                    />
                                    <span className="px-2">to</span>
                                    <Input
                                        type="time"
                                        step={60}
                                        value={editEndTime}
                                        onChange={(e) => setEditEndTime(e.target.value)}
                                        className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                                    />
                                </div>
                                <div className="flex items-center">
                                    <Input
                                        placeholder="Description"
                                        value={editDescription}
                                        onChange={(e) => setEditDescription(e.target.value)}
                                    />
                                </div>
                                <div className="flex items-center">
                                    <Input
                                        placeholder="Location"
                                        value={editLocation}
                                        onChange={(e) => setEditLocation(e.target.value)}
                                    />
                                </div>

                                <div className="flex gap-2 mt-2">
                                    <Button
                                        onClick={saveEditMeeting}
                                        className="flex-1 cursor-pointer"
                                        disabled={!editTitle || !editDate || !editStartTime || !editEndTime}
                                    >
                                        <Edit className="w-4 h-4 mr-2" /> Save Changes
                                    </Button>
                                    <Button
                                        onClick={cancelEdit}
                                        variant="outline"
                                        className="flex-1 cursor-pointer"
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Meetings List */}
            <div className="space-y-4">
                {meetings.length === 0 && (
                    <p className="text-muted-foreground">
                        No meetings scheduled.
                    </p>
                )}
                {meetings.map((meeting) => (
                    <MeetingCard
                        key={meeting.id}
                        meeting={meeting}
                        editMeeting={editMeeting}
                        deleteMeeting={deleteMeeting}
                    />
                ))}
            </div>
        </main>
    );
}
