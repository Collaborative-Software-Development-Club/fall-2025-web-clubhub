import { pgTable, text, timestamp, integer } from "drizzle-orm/pg-core";

const withPrefix = (name: string) => "account_" + name;

/**
 * Run npx drizzle-kit push to push the schema to the database
 */
export const userDetails = pgTable(withPrefix("user_details"), {
    userId: text("user_id").primaryKey().notNull(),
    createTs: timestamp("create_ts").defaultNow().notNull(),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    email: text("email").notNull(),
    year: integer("year"),
    major: text("major"),
    profileVisibility: text("profile_visibility").default("private").notNull(),
    bio: text("bio"),
});