"use server";

import { db } from "@/db";
import { meetings } from "@/db/attendance/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export type CreateMeetingInput = {
    club_id: number;
    title: string;
    description?: string;
    date: string;  // "YYYY-MM-DD"
    location: string;
    start_time: string;  // "HH:MM"
    end_time: string;    // "HH:MM"
    created_by_user_id: string;
};

export type UpdateMeetingInput = {
    id: number;
    title?: string;
    description?: string;
    date?: string;
    location?: string;
    start_time?: string;
    end_time?: string;
};

export async function createMeeting(input: CreateMeetingInput) {
    try {
        const [newMeeting] = await db
            .insert(meetings)
            .values({
                club_id: input.club_id,
                title: input.title,
                description: input.description ?? null,
                date: input.date,
                location: input.location,
                start_time: input.start_time,
                end_time: input.end_time,
                created_by_user_id: input.created_by_user_id,
            })
            .returning();

        revalidatePath(`/meetings/${input.club_id}`);
        return { success: true, meeting: newMeeting };
    } catch (error) {
        console.error("Failed to create meeting:", error);
        return { success: false, error: "Failed to create meeting" };
    }
}

export async function updateMeeting(input: UpdateMeetingInput) {
    try {
        const { id, ...updateData } = input;
        
        // Remove undefined values
        const cleanedData = Object.fromEntries(
            Object.entries(updateData).filter(([_, v]) => v !== undefined)
        );

        if (Object.keys(cleanedData).length === 0) {
            return { success: false, error: "No fields to update" };
        }

        const [updatedMeeting] = await db
            .update(meetings)
            .set(cleanedData)
            .where(eq(meetings.id, id))
            .returning();

        if (!updatedMeeting) {
            return { success: false, error: "Meeting not found" };
        }

        revalidatePath(`/meetings/${updatedMeeting.club_id}`);
        return { success: true, meeting: updatedMeeting };
    } catch (error) {
        console.error("Failed to update meeting:", error);
        return { success: false, error: "Failed to update meeting" };
    }
}

export async function deleteMeeting(meetingId: number) {
    try {
        const [deletedMeeting] = await db
            .delete(meetings)
            .where(eq(meetings.id, meetingId))
            .returning();

        if (!deletedMeeting) {
            return { success: false, error: "Meeting not found" };
        }

        revalidatePath(`/meetings/${deletedMeeting.club_id}`);
        return { success: true };
    } catch (error) {
        console.error("Failed to delete meeting:", error);
        return { success: false, error: "Failed to delete meeting" };
    }
}
