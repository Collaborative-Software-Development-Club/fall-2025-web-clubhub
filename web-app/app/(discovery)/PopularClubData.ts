export type PopularClubData = {
    name?: string; // - club name
    tags?: string[]; // - tags for club
    memberCount?: number; // (integer) - num members in club
    avgAttendance?: number; // (integer) - average attendance
    attendanceRate?: number; // (decimal: avgAttendance/memberCount) (can be derived ig)
    meetingFrequency?: number; // (idk if we need something like this just example)
    isOpen?: boolean; // - is the club open to joining/can you still apply or open registration
    description?: string;
    leader?: string;
    contactEmail?: string;
    image?: string;
};
