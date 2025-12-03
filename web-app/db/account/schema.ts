import { pgTable, text, timestamp, integer, pgEnum } from "drizzle-orm/pg-core";

const withPrefix = (name: string) => "account_" + name;

export const profileVisibilityValues = ["public", "private", "club-members-only"] as const;
export type ProfileVisibility = (typeof profileVisibilityValues)[number];
export const profileVisibilityEnum = pgEnum("profile_visibility_enum", profileVisibilityValues);
/**
 * Run npx drizzle-kit push to push the schema to the database
 */
export const userDetails = pgTable(withPrefix("user_details"), {
    userId: text("user_id").primaryKey().notNull(),
    createTs: timestamp("create_ts").defaultNow().notNull(),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    email: text("email").notNull().unique(),
    year: integer("year"),
    major: text("major"),
    profileVisibility: profileVisibilityEnum("profile_visibility").default("private").notNull(),
    bio: text("bio"),
});