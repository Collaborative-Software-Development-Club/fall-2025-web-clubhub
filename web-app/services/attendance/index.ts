import { AttendanceService, MeetingsService, MembershipService } from "@/services/definition";
import { db } from "@/db";
<<<<<<< HEAD
import { meetings, roster } from "@/db/attendance/schema";
import { eq } from "drizzle-orm";
import { ScrapedClub, scrapedClubsService } from "@/services/discovery/scraped-clubs";
import { actualAccountService } from "@/services/account/user-service/account-service";
import { Account } from "@/services/account/user-service/Account";
import { Meeting } from "@/app/(attendance)/meetings/[club]/types";
import { and, between, inArray } from "drizzle-orm";
import { format } from "date-fns";
import { attendance } from "@/db/attendance/schema";
import { desc, count, sql } from "drizzle-orm";
=======
import { roster } from "@/db/attendance/schema";
import { and, eq } from "drizzle-orm";
import {
    ScrapedClub,
    scrapedClubsService,
} from "@/services/discovery/scraped-clubs";
import { actualAccountService } from "@/services/account/user-service/account-service";
import { Account } from "@/services/account/user-service/Account";
import { auth, currentUser } from "@clerk/nextjs/server";
>>>>>>> d9e7812 (functionality to join and manage clubs in view page)

export const membershipService: MembershipService = {
    addUserToRoster,
    joinClub,
    getClubsUserIsAMemberOf,
    getAllMembersFromClub,
    isMember,
};

<<<<<<< HEAD
export const attendanceService: AttendanceService = {
    getPopularClubs,
};

export const meetingsService: MeetingsService = {
    getMeetingsForDateRange,
};

async function addUserToRoster(email: string, clubId: number, userId?: string): Promise<void> {
=======
async function joinClub(clubId: number) {
    const email = await getUserEmail();
    addUserToRoster(email, clubId);
}

async function isMember(clubId: number) {
    const email = await getUserEmail();
    const rows = await db
        .select({})
        .from(roster)
        .where(and(eq(roster.email, email), eq(roster.club_id, clubId)));
    return rows.length > 0;
}

async function addUserToRoster(
    email: string,
    clubId: number,
    userId?: number,
): Promise<void> {
>>>>>>> d9e7812 (functionality to join and manage clubs in view page)
    await db.insert(roster).values({
        email: email,
        user_id: userId,
        club_id: clubId,
    });
}

async function getClubsUserIsAMemberOf(userId: string): Promise<ScrapedClub[]> {
    const clubIds = await db
        .select({ club_id: roster.club_id })
        .from(roster)
        .where(eq(roster.user_id, parseInt(userId)));

    return await Promise.all(
        clubIds.map((row) => scrapedClubsService.getClub(row.club_id)),
    );
}

async function getAllMembersFromClub(clubId: string): Promise<Account[]> {
    const userIds = await db
        .select({ user_id: roster.user_id })
        .from(roster)
        .where(eq(roster.club_id, parseInt(clubId)));

    if (userIds.length === 0 || userIds[0].user_id === null) return [];

    return await Promise.all(userIds.map((row) => actualAccountService.getUserForId(row.user_id!.toString())));
}

async function getPopularClubs(limit: number): Promise<ScrapedClub[]> {
    // Count present attendance per club
    const popularClubIds = await db
        .select({
            club_id: meetings.club_id,
            presentCount: count(attendance.id).as("present_count"),
        })
        .from(attendance)
        .innerJoin(meetings, eq(attendance.meeting_id, meetings.id))
        .where(eq(attendance.status, "present"))
        .groupBy(meetings.club_id)
        .orderBy(desc(sql`present_count`))
        .limit(limit);

    if (popularClubIds.length === 0) return [];

    // Fetch club details for each
    return await Promise.all(
        popularClubIds.map((row) => scrapedClubsService.getClub(row.club_id))
    );
}

async function getMeetingsForDateRange(clubIds: number[], start: Date, end: Date): Promise<Meeting[]> {
    if (clubIds.length === 0) return [];
    
    const meetingRecords = await db
        .select()
        .from(meetings)
        .where(and(
            inArray(meetings.club_id, clubIds),
            between(meetings.date, format(start, "yyyy-MM-dd"), format(end, "yyyy-MM-dd"))
        ))
        .orderBy(meetings.date);

    return meetingRecords;
}
    return await Promise.all(
        userIds.map((row) =>
            actualAccountService.getUserForId(row.user_id!.toString()),
        ),
    );
}

async function getUserEmail() {
    const { isAuthenticated } = await auth();
    if (!isAuthenticated) {
        throw new Error("User not signed in.");
    }
    const user = await currentUser();
    if (!user) {
        throw new Error("Unable to retrieve current user information.");
    }
    const email = user.primaryEmailAddress;
    if (!email) {
        throw new Error("User does not have an email address.");
    }
    return email.emailAddress;
}
