export type AttendanceStatus = "present" | "absent" | "late" | "no-response";

export interface StudentProps {
    name: string;
    dotNumber: string;
    status: AttendanceStatus;
    timestamp: string | null;
    streak: number;
}

export interface Meeting {
    clubId: number;
    title: string;
    description: string | null;
    date: string;
    startTime: string;
    endTime: string;
    code: string;
    createdAt: string | Date;
    createdByUserId: number;
}