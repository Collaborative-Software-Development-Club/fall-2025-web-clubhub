import {
  pgSchema,
  pgEnum,
  serial,
  text,
  boolean,
  integer,
} from "drizzle-orm/pg-core";

export const makeUpEnum = pgEnum("make_up", ["Undergraduate", "Graduate", "Professional"]);
export const membershipEnum = pgEnum("membership", ["Open Membership", "Application/Selection Process"]);

export const clubsSchema = pgSchema("clubs");

// Main Club Table
export const clubs = clubsSchema.table("clubs", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  purposeStatement: text("purpose_statement").notNull(),
  campus: text("campus"),
  status: text("status"),
  imageUrl: text("image_url"),
  url: text("url"),
  primaryMakeUp: makeUpEnum("primary_make_up").notNull(),
  meetingTimeAndPlace: text("meeting_time_and_place"),
  officeLocation: text("office_location"),
  membershipType: membershipEnum("membership_type"),
  membershipContact: text("membership_contact"),
  timeOfYearForNewMembership: text("time_of_year_for_new_membership"),
  howDoesAProspectiveMemberApply: text("how_does_a_prospective_member_apply"),
  chargeDues: boolean("charge_dues").default(false).notNull(),
  organizationEmail: text("organization_email"),
});

// Leaders
export const leaders = clubsSchema.table("leaders", {
  id: serial("id").primaryKey(),
  clubId: integer("club_id").references(() => clubs.id).notNull(),
  role: text("role").notNull(), //enum?
  name: text("name").notNull(),
});

// Advisors
export const advisors = clubsSchema.table("advisors", {
  id: serial("id").primaryKey(),
  clubId: integer("club_id").references(() => clubs.id).notNull(),
  role: text("role").notNull(), //enum?
  name: text("name").notNull(),
});

// Social Links
export const socialLinks = clubsSchema.table("social_links", {
  id: serial("id").primaryKey(),
  clubId: integer("club_id").references(() => clubs.id).notNull(),
  platform: text("platform").notNull(), //enum?
  url: text("url").notNull(),
});

// Types
export const types = clubsSchema.table("types", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
});

// Many-to-many join for types
export const clubTypes = clubsSchema.table("club_types", {
  clubId: integer("club_id").references(() => clubs.id).notNull(),
  typeId: integer("type_id").references(() => types.id).notNull(),
  isPrimary: boolean("is_primary").default(false),
}); 
