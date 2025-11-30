"use server";

import { attendance } from "@/db/attendance/schema";
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