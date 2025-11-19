import { sql } from "drizzle-orm";
import {
    date,
    integer,
    pgEnum,
    pgTable,
    pgTableCreator,
    serial,
    text,
    time,
    timestamp,
} from "drizzle-orm/pg-core";

const createAttendanceTable = pgTableCreator(
    (name: string) => "attendance_" + name,
);

export const attendanceStatusEnum = pgEnum("attendance_status", [
    "Present",
    "Absent",
    "Excused",
]);

/**
 * Run npx drizzle-kit push to push the schema to the database
 */
export const meetings = createAttendanceTable("meeting", {
    id: serial("id").primaryKey(),

    clubId: integer("club_id").notNull(),

    title: text("title").notNull(),
    description: text("description"),

    date: date("date").notNull(),
    startTime: time("start_time", { precision: 0 }).notNull(),
    endTime: time("end_time", { precision: 0 }).notNull(),
    // location: text("location").notNull(),

    code: integer("code")
        .notNull()
        .default(sql`FLOOR(RANDOM() * 9000 + 1000)::int`),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    createdByUserId: integer("created_by_user_id").notNull(),
});

export const attendance = createAttendanceTable("attendance", {
    id: serial("id").primaryKey(),

    userEmail: text("user_email").notNull(),
    userId: integer("user_id"),

    meetingId: integer("meeting_id")
        .references(() => meetings.id, { onDelete: "cascade" })
        .notNull(),

    status: attendanceStatusEnum("status").notNull(),

    timestamp: timestamp("timestamp").defaultNow().notNull(),
});
