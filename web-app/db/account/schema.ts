import { pgTableCreator, text, timestamp } from "drizzle-orm/pg-core";

const createAccountTable = pgTableCreator((name: string) => "account_" + name);

/**
 * Run npx drizzle-kit push to push the schema to the database
 */
export const userMessages = createAccountTable("user_messages", {
    user_id: text("user_id").primaryKey().notNull(),
    createTs: timestamp("create_ts").defaultNow().notNull(),
    message: text("message").notNull(),
});
