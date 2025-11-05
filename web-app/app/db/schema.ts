import { integer, pgTable, primaryKey, text, timestamp } from 'drizzle-orm/pg-core'

/**
 * Run npx drizzle-kit push to push the schema to the database
 */
export const Users = pgTable('users', {
  id: text('id').primaryKey().notNull(),
  username: text('username').notNull(),
  email: text('email').notNull(),
  year: integer('year'),
  major: text('major'),
  profile_visibility: text('profile_visibility').notNull().default('private'),
  bio: text('bio'),
})

export const Roles = pgTable('roles', {
  id: text('id').primaryKey().notNull(),
  name: text('name').notNull().unique(),
})

export const User_Club_Roles = pgTable('user_club_roles', {
  user_id: text('user_id')
    .notNull()
    .references(() => Users.id, { onDelete: 'cascade' }),
  club_id: integer('club_id')
    .notNull()
    .references(() => Clubs.id, { onDelete: 'cascade' }),
  role_id: text('role_id')
    .notNull()
    .references(() => Roles.id),
}, (table) => ([
  primaryKey({ columns: [table.user_id, table.club_id] }),
]))