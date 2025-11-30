import type { StudentProps } from "@/app/(attendance)/attendance/[id]/types";

export const mockAttendance: StudentProps[] = [
    {
        name: "Alice Johnson",
        email: "johnson.123@example.com",
        status: "present",
        timestamp: "10:02",
        streak: 3,
    },
    {
        name: "Bob Smith",
        email: "smith.456@example.com",
        status: "late",
        timestamp: "10:05",
        streak: 1,
    },
    {
        name: "Charlie Kim",
        email: "kim.789@example.com",
        status: "absent",
        timestamp: "10:00",
        streak: 0,
    },
    {
        name: "Diana Lee",
        email: "lee.101@example.com",
        status: "present",
        timestamp: "10:01",
        streak: 5,
    },
    {
        name: "Ethan Chen",
        email: "chen.202@example.com",
        status: "no-response",
        timestamp: null,
        streak: 2,
    },
    {
        name: "Fiona Garcia",
        email: "garcia.303@example.com",
        status: "late",
        timestamp: "10:02",
        streak: 1,
    },
    {
        name: "George Patel",
        email: "patel.404@example.com",
        status: "present",
        timestamp: "10:00",
        streak: 4,
    },
    {
        name: "Hannah Martinez",
        email: "martinez.505@example.com",
        status: "no-response",
        timestamp: null,
        streak: 0,
    },
    {
        name: "Charlie Campbell",
        email: "campbell.2899@example.com",
        status: "late",
        timestamp: "10:01",
        streak: 9,
    },
];
