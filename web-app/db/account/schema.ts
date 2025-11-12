import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

const withPrefix = (name: string) => "account_" + name;

/**
 * Run npx drizzle-kit push to push the schema to the database
 */
export const Users = pgTable(withPrefix('users'), {
  id: text('id').primaryKey().notNull(),
  username: text('username').notNull(),
  email: text('email').notNull(),
  year: integer('year'),
  major: text('major'),
  profile_visibility: text('profile_visibility').notNull().default('private'),
  bio: text('bio'),
})
