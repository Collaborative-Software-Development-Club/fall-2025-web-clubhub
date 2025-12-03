import { sql } from "drizzle-orm";
import {
    date,
    integer,
    pgEnum,
    pgTable,
    serial,
    text,
    time,
    timestamp,
} from "drizzle-orm/pg-core";

const withPrefix = (name: string) => "attendance_" + name;

export const attendanceStatusEnum = pgEnum("attendance_status", [
    "present",
    "absent",
    "late",
    "no-response",
]);

/**
 * Run npx drizzle-kit push to push the schema to the database
 */
export const meetings = pgTable(withPrefix("meeting"), {
    id: serial("id").primaryKey().notNull(),
    club_id: integer("club_id").notNull(), // references club table

    title: text("title").notNull(),
    description: text("description"),

    date: date("date").notNull(),
    location: text("location").notNull(),
    start_time: time("start_time", { precision: 0 }).notNull(),
    end_time: time("end_time", { precision: 0 }).notNull(),

    code: text("code")
        .notNull()
        .default(sql`FLOOR(RANDOM() * 9000 + 1000)::int`), // random code 1000–9999

    // metadata
    created_at: timestamp("created_at").defaultNow().notNull(),
    created_by_user_id: text("created_by_user_id").notNull(),
});

export const attendance = pgTable(withPrefix("attendance"), {
    id: serial("id").primaryKey().notNull(),
    email: text("email").notNull(),
    user_id: text("user_id"),
    meeting_id: integer("meeting_id").notNull(),
    status: attendanceStatusEnum("attendance_status").notNull(),
    timestamp: timestamp("timestamp").defaultNow().notNull(),
});

export const roster = pgTable(withPrefix("roster"), {
    id: serial("id").primaryKey().notNull(),
    user_id: text("user_id"),
    email: text("email").notNull(),
    club_id: integer("club_id").notNull()
});