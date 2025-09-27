export type AttendanceStatus = "present" | "absent" | "late" | "no-response";

export interface StudentProps {
    name: string;
    dotNumber: string;
    status: AttendanceStatus;
    timestamp: string | null;
    streak: number;
    totalMeetings: number;
    attendanceRate: number; // percentage (0-100)
    email?: string;
}
