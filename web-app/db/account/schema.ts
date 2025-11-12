import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

const withPrefix = (name: string) => "account_" + name;

/**
 * Run npx drizzle-kit push to push the schema to the database
 */
export const userMessages = pgTable(withPrefix("user_messages"), {
    user_id: text("user_id").primaryKey().notNull(),
    createTs: timestamp("create_ts").defaultNow().notNull(),
    message: text("message").notNull(),
});
