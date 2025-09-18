export interface StudentProps {
    name: string;
    dotNumber: string;
    status: "present" | "absent" | "late" | "no-response";
    timestamp: string | null;
    streak: number;
}
