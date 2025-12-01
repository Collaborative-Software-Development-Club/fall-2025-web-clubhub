import { pgTable, pgEnum } from "drizzle-orm/pg-core";
import { serial, integer, text, boolean, timestamp, primaryKey } from "drizzle-orm/pg-core";

const withPrefix = (name: string) => "clubAddition_" + name;
export const timePeriodEnum = pgEnum("time_period_enum", ["Fall", "Spring", "Anytime"]);
export const clubStatusEnum = pgEnum("status_enum", ["Active", "Inactive", "Pending"]);

/* --------- Club Descriptions Table ---------*/
export const descriptions = pgTable(withPrefix("descriptions"), {
  clubId: integer("club_id").primaryKey(),
  description: text("description").notNull(),
});

/* --------- Social Media Links Table ---------*/
export const addedSocialLinks = pgTable(withPrefix("social_links"), {
    id: serial("id").primaryKey(),
    clubId: integer("club_id").notNull(),
    platform: text("platform").notNull(),
    url: text("url").notNull(),
});

/* ---------- Meeting Location Table ---------*/
export const meetingLocations = pgTable(withPrefix("meeting_locations"), {
    clubId: integer("club_id").primaryKey(),
    location: text("location").notNull(),
});

/* --------- Meeting Times Table ---------*/
export const meetingTimes = pgTable(withPrefix("meeting_times"), {
     clubId: integer("club_id").primaryKey(),
     time: text("meeting_time").notNull(),
});

/* --------- Tags Table ---------*/
export const addedTags = pgTable(withPrefix("tags"), {
    clubId: integer("club_id").notNull(),
    name: text("name").notNull().unique(),
}, (table) => [
      primaryKey({ columns: [table.clubId, table.name] })
  ]);


/*---------- Announcement Table ---------*/
export const announcements = pgTable(withPrefix("announcements"), {
  id: serial("id").primaryKey(),

  clubId: integer("club_id").notNull(),

  userId: text("user_id").notNull(),

  title: text("title").notNull(),
  content: text("content").notNull(),
  pinned: boolean("pinned").default(false),
  lastModified: timestamp("last_modified", { withTimezone: false }).defaultNow(),
});

/*---------- Contact Information Table ---------*/ 
export const contactInformation = pgTable(withPrefix("contact_information"), {
    id: serial("id").primaryKey(),
    clubId: integer("club_id").notNull(),
    method: text("contact_method").notNull(),
    detail: text("details").notNull(),
});

/*---------- Status Table ---------*/
export const clubStatus = pgTable(withPrefix("club_status"), {
    clubId: integer("club_id").primaryKey(),
    status: clubStatusEnum("status").notNull(),
});

/*---------- Time of Year for New Membership Table ---------*/
 export const timeOfYearForNewMembership = pgTable(withPrefix("time_of_year_for_new_membership"), {
     clubId: integer("club_id").primaryKey(),
     timePeriod: timePeriodEnum("time_period").notNull(),
 });

 
