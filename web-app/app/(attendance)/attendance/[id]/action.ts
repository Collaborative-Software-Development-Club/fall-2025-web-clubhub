"use server";

import { attendance, meetings, roster } from "@/db/attendance/schema";
import { AttendanceStatus, PRESENT } from "./types";
import { db } from "@/db";
import { eq, and } from "drizzle-orm";

export async function updateAttendanceStatus(
    attendanceId: number, 
    newStatus: AttendanceStatus
) {
    await db
        .update(attendance)
        .set({
            status: newStatus,
        })
        .where(eq(attendance.id, attendanceId));

    return { success: true };
}

export async function submitAttendanceCode(
    inputCode: string,
    code: number,
    meetingId: number,
    email: string,
    userId?: number
) {
    if (parseInt(inputCode) !== code) {
        return { success: false, error: "Invalid code" };
    }

    const meeting = await db
    .select()
    .from(meetings)
    .where(eq(meetings.id, meetingId))
    .limit(1);

    // Check if user is on the roster; add them if not
    const rosterRecord = await db
        .select()
        .from(roster)
        .where(
            and(
                eq(roster.email, email),
                ...(userId != null ? [eq(roster.user_id, userId)] : []),
                eq(roster.club_id, meeting[0].club_id)
            )
        )
        .limit(1);

    if (rosterRecord.length === 0) {
        await db.insert(roster).values({
            email: email,
            user_id: userId,
            club_id: meeting[0].club_id,
        });
    }

    // Currenlty only allow users to submit attendance once
    const existingRecord = await db
        .select()
        .from(attendance)
        .where(
            and(
                eq(attendance.meeting_id, meetingId),
                eq(attendance.email, email)
            )
        )
        .limit(1);

    if (existingRecord.length > 0) {
        return { success: false, error: "You have already submitted your attendance" };
    }


    await db.insert(attendance).values({
        meeting_id: meetingId,
        email: email,
        user_id: userId,
        status: PRESENT,
    });

    return { success: true };
}

export async function submitAttendanceStatus(
    status: AttendanceStatus,
    meetingId: number,
    email: string,
    userId?: number,
) {
    if (status === PRESENT) {
        return { success: false, error: "Must use code to submit present status" };
    }

    const meeting = await db
        .select()
        .from(meetings)
        .where(eq(meetings.id, meetingId))
        .limit(1);

    // Check if user is on the roster; add them if not
    const rosterRecord = await db
        .select()
        .from(roster)
        .where(
            and(
                eq(roster.email, email),
                ...(userId != null ? [eq(roster.user_id, userId)] : []),
                eq(roster.club_id, meeting[0].club_id)
            )
        )
        .limit(1);

    if (rosterRecord.length === 0) {
        await db.insert(roster).values({
            email: email,
            user_id: userId,
            club_id: meeting[0].club_id,
        });
    }

    // Currenlty only allow users to submit attendance once
    const existingRecord = await db
        .select()
        .from(attendance)
        .where(
            and(
                eq(attendance.meeting_id, meetingId),
                eq(attendance.email, email)
            )
        )
        .limit(1);

    if (existingRecord.length > 0) {
        return { success: false, error: "You have already submitted your attendance" };
    }


    await db.insert(attendance).values({
        meeting_id: meetingId,
        email: email,
        user_id: userId,
        status: status,
    });

    return { success: true };
}