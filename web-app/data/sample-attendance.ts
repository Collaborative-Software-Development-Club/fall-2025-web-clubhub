// /data/sample-attendance.ts
import { StudentProps } from "@/types/student-attendance";

export const mockAttendance: StudentProps[] = [
    {
        name: "Alice Johnson",
        dotNumber: "Johnson.123",
        status: "present",
        timestamp: "10:02",
        streak: 3,
    },
    {
        name: "Bob Smith",
        dotNumber: "Smith.456",
        status: "late",
        timestamp: "10:05",
        streak: 1,
    },
    {
        name: "Charlie Kim",
        dotNumber: "Kim.789",
        status: "absent",
        timestamp: "10:00",
        streak: 0,
    },
    {
        name: "Diana Lee",
        dotNumber: "Lee.101",
        status: "present",
        timestamp: "10:01",
        streak: 5,
    },
    {
        name: "Ethan Chen",
        dotNumber: "Chen.202",
        status: "no-response",
        timestamp: null,
        streak: 2,
    },
    {
        name: "Fiona Garcia",
        dotNumber: "Garcia.303",
        status: "late",
        timestamp: "10:02",
        streak: 1,
    },
    {
        name: "George Patel",
        dotNumber: "Patel.404",
        status: "present",
        timestamp: "10:00",
        streak: 4,
    },
    {
        name: "Hannah Martinez",
        dotNumber: "Martinez.505",
        status: "no-response",
        timestamp: null,
        streak: 0,
    },
    {
        name: "Charlie Campbell",
        dotNumber: "Campbell.2899",
        status: "late",
        timestamp: "10:01",
        streak: 9,
    },
];
