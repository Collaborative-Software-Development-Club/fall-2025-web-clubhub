export type AttendanceStatus = "present" | "absent" | "late" | "no-response";

export interface StudentProps {
    name: string;
    dotNumber: string;
    status: AttendanceStatus;
    timestamp: string | null;
    streak: number;
}
