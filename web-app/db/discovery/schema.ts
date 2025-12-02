import {
    pgTableCreator,
    pgEnum,
    serial,
    text,
    boolean,
    integer,
    primaryKey,
    date,
} from "drizzle-orm/pg-core";

const createDiscoveryTable = pgTableCreator(
    (name: string) => "discovery_" + name,
);

// --- SCRAPED CLUB DATA ---

export const makeUpEnum = pgEnum("make_up", [
    "Undergraduate",
    "Graduate",
    "Professional",
]);
export const statusEnum = pgEnum("status", [
    "Active I",
    "Active - Established",
    "Active II",
    "Inactive",
    "Pending",
]);
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

export const clubs = createDiscoveryTable("scraped_clubs", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    purposeStatement: text("purpose_statement"),
    campus: text("campus"),
    status: statusEnum("status").notNull(),
    imageUrl: text("image_url"),
    url: text("url").notNull(),
    primaryMakeUp: makeUpEnum("primary_make_up"),
    meetingTimeAndPlace: text("meeting_time_and_place"),
    officeLocation: text("office_location"),
    // null because some clubs don't have it specified
    membershipType: membershipEnum("membership_type"),
    membershipContact: text("membership_contact"),
    timeOfYearForNewMembership: text("time_of_year_for_new_membership"),
    howDoesAProspectiveMemberApply: text("how_does_a_prospective_member_apply"),
    chargeDues: boolean("charge_dues").default(false).notNull(),
    organizationEmail: text("organization_email"),
    createdAt: date("created_at", {
        mode: "date",
    }).defaultNow(),
});

export const leaders = createDiscoveryTable("scraped_leaders", {
    email: text("email").primaryKey(),
    name: text("name").notNull(),
});

// Many-to-many join for leaders (since a leader can lead multiple clubs)
export const clubLeaders = createDiscoveryTable(
    "scraped_club_leaders",
    {
        clubId: integer("club_id")
            .references(() => clubs.id, { onDelete: "cascade" })
            .notNull(),
        leaderId: text("leader_id")
            .references(() => leaders.email, { onDelete: "no action" })
            .notNull(),
        role: leaderRoleEnum("leader_role").notNull(),
    },
    (table) => [primaryKey({ columns: [table.clubId, table.leaderId] })],
);

export const advisors = createDiscoveryTable(
    "scraped_advisors",
    {
        clubId: integer("club_id")
            .references(() => clubs.id, { onDelete: "cascade" })
            .notNull(),
        name: text("name").notNull(),
        role: text("role").notNull(),
    },
    (table) => [primaryKey({ columns: [table.clubId, table.name] })],
);

export const socialLinks = createDiscoveryTable("scraped_social_links", {
    id: serial("id").primaryKey(),
    clubId: integer("club_id")
        .references(() => clubs.id, { onDelete: "cascade" })
        .notNull(),
    platform: text("platform").notNull(),
    url: text("url").notNull(),
});

export const tags = createDiscoveryTable("scraped_tags", {
    name: text("name").notNull().primaryKey(),
});

// Many-to-many join for tags
export const clubTags = createDiscoveryTable(
    "scraped_club_tags",
    {
        clubId: integer("club_id")
            .references(() => clubs.id, { onDelete: "cascade" })
            .notNull(),
        tag: text("tag")
            .references(() => tags.name, { onDelete: "no action" })
            .notNull(),
        isPrimary: boolean("is_primary").notNull(),
    },
    (table) => [primaryKey({ columns: [table.clubId, table.tag] })],
);

// --- OUR OWN TAGS STUFF ---

/**
 * Custom tags created for our website
 */

export const clubHubTagsType = pgEnum("clubhub_tag_type", ["MAJOR"]);

export const clubHubTags = createDiscoveryTable("clubhub_tags", {
    name: text("name").notNull().primaryKey(),
    type: clubHubTagsType("type").notNull(),
});
