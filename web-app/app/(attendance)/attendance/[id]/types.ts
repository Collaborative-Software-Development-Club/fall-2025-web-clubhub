import { attendanceStatusEnum } from "@/db/attendance/schema";

export type AttendanceStatus = (typeof attendanceStatusEnum.enumValues)[number];

export const ATTENDANCE_STATUSES = attendanceStatusEnum.enumValues;

export const NO_RESPONSE: AttendanceStatus = "no-response";

export interface AttendanceRecord {
    id: number;
    name: string;
    email: string;
    status: AttendanceStatus;
    timestamp: string | null;
    streak: number;
}
