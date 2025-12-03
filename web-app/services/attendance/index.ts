import { AttendanceService, MembershipService } from "@/services/definition";
import { db } from "@/db";
import { roster } from "@/db/attendance/schema";
import { eq } from "drizzle-orm";
import { ScrapedClub, scrapedClubsService } from "@/services/discovery/scraped-clubs";
import { actualAccountService } from "@/services/account/user-service/account-service";
import { Account } from "@/services/account/user-service/Account";

export const membershipService: MembershipService = {
    addUserToRoster,
    getClubsUserIsAMemberOf,
    getAllMembersFromClub,
};

export const attendanceService: AttendanceService = {
    getPopularClubs,
};

async function addUserToRoster(email: string, clubId: number, userId?: string): Promise<void> {
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
        .where(eq(roster.user_id, userId))

    return await Promise.all(clubIds.map((row) => scrapedClubsService.getClub(row.club_id)));
}

async function getAllMembersFromClub(clubId: string): Promise<Account[]> {
    const userIds = await db
        .select({ user_id: roster.user_id })
        .from(roster)
        .where(eq(roster.club_id, parseInt(clubId)))

    if (userIds.length === 0 || userIds[0].user_id === null) return [];

    return await Promise.all(userIds.map((row) => actualAccountService.getUserForId(row.user_id!.toString())));
}

async function getPopularClubs(): Promise<string[]> {
    throw new Error("Not implemented");
}