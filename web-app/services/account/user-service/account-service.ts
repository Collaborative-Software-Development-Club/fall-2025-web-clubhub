import { db } from "@/db";
import { AccountService } from "@/services/definition";
import { Account } from "./Account";
import { eq } from "drizzle-orm";
import { userDetails } from "@/db/account/schema";
import { isProfileVisibility, parseProfileVisibility } from "./validators";

export const actualAccountService: AccountService = {
    getUserForId,
};

async function getUserForId(userId: string): Promise<Account> {
    const rows = await db
        .select()
        .from(userDetails)
        .where(eq(userDetails.userId, userId))
        .limit(1);

    const row = rows[0];
    if (!row) throw new Error(`Account not found for userId: ${userId}`);

    const rawProfileVisibility = row.profileVisibility; // unknown/string
    if (!isProfileVisibility(rawProfileVisibility)) {
        // handle invalid value
        console.warn(
            "Invalid profileVisibility from DB, using default",
            { raw: rawProfileVisibility }
        );
        row.profileVisibility = "private";
    } else {
        row.profileVisibility = rawProfileVisibility;
    }

    return {
        id: row.userId,
        firstName: row.firstName,
        lastName: row.lastName,
        email: row.email,
        year: row.year,
        major: row.major,
        profileVisibility: parseProfileVisibility(row.profileVisibility, "private"),
        bio: row.bio,
    };
}