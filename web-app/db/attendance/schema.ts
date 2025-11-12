import { sql } from "drizzle-orm";
import {
    date,
    integer,
    pgTable,
    serial,
    text,
    time,
    timestamp,
} from "drizzle-orm/pg-core";

const withPrefix = (name: string) => "attendance_" + name;

/**
 * Run npx drizzle-kit push to push the schema to the database
 */
export const meetings = pgTable(withPrefix("meeting"), {
    id: serial("id").primaryKey().notNull(),
    club_id: integer("club_id").notNull(), // references club table

    title: text("title").notNull(),
    description: text("description"),

    date: date("date").notNull(),
    start_time: time("start_time", { precision: 0 }).notNull(),
    end_time: time("end_time", { precision: 0 }).notNull(),

    code: text("code")
        .notNull()
        .default(sql`FLOOR(RANDOM() * 9000 + 1000)::int`), // random code 1000–9999

    // metadata
    created_at: timestamp("created_at").defaultNow().notNull(),
    created_by_user_id: integer("created_by_user_id").notNull(),
});

export const attendance = pgTable(withPrefix("meeting"), {
    attendanceID: serial("attendanceID").notNull(),
    userEmail: text("userEmail").notNull(),
    userID: integer("userID"),
    meetingID: integer("meetingID").notNull(),
    status: text("status").notNull(),
    timestamp: timestamp("timestamp").notNull(),
});