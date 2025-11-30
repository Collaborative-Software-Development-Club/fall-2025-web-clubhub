"use server";

import { attendance } from "@/db/attendance/schema";
import { AttendanceStatus } from "./types";
import { db } from "@/db";
import { eq } from "drizzle-orm";

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