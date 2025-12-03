"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Plus, Calendar as CalendarIcon, Edit } from "lucide-react";
import { MeetingCard } from "./MeetingCard";
import { Meeting } from "./types";
import { createMeeting, updateMeeting, deleteMeeting as deleteMeetingAction } from "./action";

interface MeetingsPageClientProps {
    meetingsData: Meeting[];
    clubId: number;
}

export default function MeetingsPageClient({ meetingsData, clubId }: MeetingsPageClientProps) {
    const { user } = useUser();
    
    const [meetings, setMeetings] = useState<Meeting[]>(meetingsData);

    const [title, setTitle] = useState(`Meeting #${meetings.length + 1}`);
    const [date, setDate] = useState<Date | undefined>(new Date(Date.now()));
    const [startTime, setStartTime] = useState<string>("18:00");
    const [endTime, setEndTime] = useState<string>("19:00");
    const [description, setDescription] = useState<string>("");
    const [location, setLocation] = useState<string>("");

    // Control popovers
    const [formOpen, setFormOpen] = useState(false);
    const [calendarOpen, setCalendarOpen] = useState(false);

    // Edit meeting state
    const [editFormOpen, setEditFormOpen] = useState(false);
    const [editCalendarOpen, setEditCalendarOpen] = useState(false);
    const [editingMeetingId, setEditingMeetingId] = useState<number | null>(
        null,
    );
    const [editTitle, setEditTitle] = useState("");
    const [editDate, setEditDate] = useState<Date | undefined>();
    const [editStartTime, setEditStartTime] = useState("");
    const [editEndTime, setEditEndTime] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [editLocation, setEditLocation] = useState("");

    // Add error state after existing state declarations
    const [formError, setFormError] = useState<string | null>(null);

    const addMeeting = async (): Promise<void> => {
        // Validate and show specific errors
        const missingFields: string[] = [];
        if (!title) missingFields.push("title");
        if (!date) missingFields.push("date");
        if (!startTime) missingFields.push("start time");
        if (!endTime) missingFields.push("end time");
        if (!location) missingFields.push("location");
        if (!user) missingFields.push("user (please sign in)");

        if (missingFields.length > 0) {
            setFormError(`Missing required fields: ${missingFields.join(", ")}`);
            return;
        }

        setFormError(null);  // Clear any previous error

        const result = await createMeeting({
            club_id: clubId,
            title,
            description: description || undefined,
            date: format(date!, "yyyy-MM-dd"),
            location,
            start_time: startTime,
            end_time: endTime,
            created_by_user_id: user!.id,
        });

        if (result.success && result.meeting) {
            setMeetings((prev) => [...prev, result.meeting!]);
            // Reset form...
            setTitle(`Meeting #${meetings.length + 2}`);
            setDate(new Date());
            setStartTime("18:00");
            setEndTime("19:00");
            setDescription("");
            setLocation("");
            setFormOpen(false);
        } else {
            setFormError(result.error || "Failed to create meeting");
        }
    };

    const editMeeting = (id: number): void => {
        const meeting = meetings.find((m) => m.id === id);
        if (meeting) {
            setEditingMeetingId(id);
            setEditTitle(meeting.title);
            setEditDate(new Date(meeting.date));
            setEditStartTime(meeting.start_time);
            setEditEndTime(meeting.end_time);
            setEditDescription(meeting.description || "");
            setEditLocation(meeting.location || "");
            setEditFormOpen(true);
        }
    };

    const saveEditMeeting = async (): Promise<void> => {
        if (
            !editTitle ||
            !editDate ||
            !editStartTime ||
            !editEndTime ||
            !editingMeetingId
        )
            return;

        const result = await updateMeeting({
            id: editingMeetingId,
            title: editTitle,
            date: format(editDate, "yyyy-MM-dd"),
            start_time: editStartTime,
            end_time: editEndTime,
            description: editDescription || undefined,
            location: editLocation || undefined,
        });

        if (result.success && result.meeting) {
            // Update local state with the returned meeting
            setMeetings((prev) =>
                prev.map((meeting) =>
                    meeting.id === editingMeetingId ? result.meeting! : meeting
                )
            );
            cancelEdit();
        } else {
            console.error("Failed to update meeting:", result.error);
        }
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
    const deleteMeeting = async (id: number): Promise<void> => {
        const result = await deleteMeetingAction(id);

        if (result.success) {
            setMeetings((prev) => prev.filter((m) => m.id !== id));
        } else {
            console.error("Failed to delete meeting:", result.error);
        }
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

                        {formError && (
                            <p className="text-sm text-destructive">{formError}</p>
                        )}

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
                                    onChange={(e) =>
                                        setEditTitle(e.target.value)
                                    }
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
                                        onChange={(e) =>
                                            setEditStartTime(e.target.value)
                                        }
                                        className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                                    />
                                    <span className="px-2">to</span>
                                    <Input
                                        type="time"
                                        step={60}
                                        value={editEndTime}
                                        onChange={(e) =>
                                            setEditEndTime(e.target.value)
                                        }
                                        className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                                    />
                                </div>
                                <div className="flex items-center">
                                    <Input
                                        placeholder="Description"
                                        value={editDescription}
                                        onChange={(e) =>
                                            setEditDescription(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="flex items-center">
                                    <Input
                                        placeholder="Location"
                                        value={editLocation}
                                        onChange={(e) =>
                                            setEditLocation(e.target.value)
                                        }
                                    />
                                </div>

                                <div className="flex gap-2 mt-2">
                                    <Button
                                        onClick={saveEditMeeting}
                                        className="flex-1 cursor-pointer"
                                        disabled={
                                            !editTitle ||
                                            !editDate ||
                                            !editStartTime ||
                                            !editEndTime
                                        }
                                    >
                                        <Edit className="w-4 h-4 mr-2" /> Save
                                        Changes
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
                {[...meetings]
                    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                    .map((meeting) => (
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
