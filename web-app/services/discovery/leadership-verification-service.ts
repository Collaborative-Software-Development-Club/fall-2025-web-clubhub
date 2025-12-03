import { auth, currentUser } from "@clerk/nextjs/server";
import { LeadershipVerificationService } from "../definition";
import { db } from "@/db";
import { clubLeaders } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export const leadershipVerificationService: LeadershipVerificationService = {
    getClubsCurrentUserIsALeaderOf,
    isCurrentUserALeaderOfClub,
};

async function getClubsCurrentUserIsALeaderOf(): Promise<number[]> {
    const email = await getUserEmail();
    return await getLedClubsForEmail(email);
}

async function isCurrentUserALeaderOfClub(clubId: number): Promise<boolean> {
    const email = await getUserEmail();
    return isEmailInClubLeadership(email, clubId);
}

async function isEmailInClubLeadership(email: string, clubId: number) {
    const rows = await db
        .select({})
        .from(clubLeaders)
        .where(
            and(
                eq(clubLeaders.leaderId, email),
                eq(clubLeaders.clubId, clubId),
            ),
        );
    return rows.length > 0;
}

export async function getLedClubsForEmail(email: string): Promise<number[]> {
    const rows = await db
        .select({ clubId: clubLeaders.clubId })
        .from(clubLeaders)
        .where(eq(clubLeaders.leaderId, email));
    return rows.map((row) => row.clubId);
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
