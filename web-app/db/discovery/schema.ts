import {
    pgTableCreator,
    pgSchema,
    pgEnum,
    serial,
    text,
    boolean,
    integer,
} from "drizzle-orm/pg-core";

const createDiscoveryTable = pgTableCreator(
    (name: string) => "discovery_" + name,
);

export const makeUpEnum = pgEnum("make_up", [
    "Undergraduate",
    "Graduate",
    "Professional",
]);
export const statusEnum = pgEnum("status", ["Active", "Inactive", "Pending"]);
export const membershipEnum = pgEnum("membership", [
    "Open Membership",
    "Application/Selection Process",
]);
export const leaderRoleEnum = pgEnum("leader_role", [
    "Primary Leader",
    "Secondary Leader",
    "Treasurer",
    "Secretary",
    "Other",
]);

// Main Club Table
export const clubs = createDiscoveryTable("scraped_clubs", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    purposeStatement: text("purpose_statement").notNull(),
    campus: text("campus"),
    status: statusEnum("status").notNull(),
    imageUrl: text("image_url"),
    url: text("url").notNull(),
    primaryMakeUp: makeUpEnum("primary_make_up").notNull(),
    meetingTimeAndPlace: text("meeting_time_and_place"),
    officeLocation: text("office_location"),
    membershipType: membershipEnum("membership_type").notNull(),
    membershipContact: text("membership_contact"),
    timeOfYearForNewMembership: text("time_of_year_for_new_membership"),
    howDoesAProspectiveMemberApply: text("how_does_a_prospective_member_apply"),
    chargeDues: boolean("charge_dues").default(false).notNull(),
    organizationEmail: text("organization_email"),
});

// Leaders
export const leaders = createDiscoveryTable("scraped_leaders", {
    id: serial("id").primaryKey(),
    clubId: integer("club_id")
        .references(() => clubs.id)
        .notNull(),
    role: leaderRoleEnum("leader_role").notNull(),
    name: text("name").notNull(),
    email: text("email").notNull(),
});

// Advisors
export const advisors = createDiscoveryTable("scraped_advisors", {
    id: serial("id").primaryKey(),
    clubId: integer("club_id")
        .references(() => clubs.id)
        .notNull(),
    role: text("role").notNull(),
    name: text("name").notNull(),
});

// Social Links
export const socialLinks = createDiscoveryTable("scraped_social_links", {
    id: serial("id").primaryKey(),
    clubId: integer("club_id")
        .references(() => clubs.id)
        .notNull(),
    platform: text("platform").notNull(),
    url: text("url").notNull(),
});

// Tags
export const tags = createDiscoveryTable("scraped_tags", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
});

// Many-to-many join for tags
export const clubTags = createDiscoveryTable("scraped_club_tags", {
    clubId: integer("club_id")
        .references(() => clubs.id)
        .notNull(),
    tagId: integer("tag_id")
        .references(() => tags.id)
        .notNull(),
    isPrimary: boolean("is_primary").default(false),
});
