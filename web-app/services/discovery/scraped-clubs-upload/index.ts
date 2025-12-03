import { z } from "zod";
import scrapedClubsData from "../../../../data/club-list.json";
import { db } from "@/db";
import {
    tags,
    leaders,
    scrapedClubs as scrapedClubsTable,
    clubLeaders,
    advisors,
    socialLinks,
    clubTags,
    leaderRoleEnum,
} from "@/db/discovery/schema";
import { clubSchema } from "./scraped-club-zod";

export const scrapedClubsUploadService = {
    uploadScrapedClubs,
};

type Club = z.infer<typeof clubSchema>;

async function uploadScrapedClubs() {
    const scrapedClubs = z.array(clubSchema).parse(scrapedClubsData);
    const { tags: newTags, leaders: newLeaders } =
        collectUniqueTagsAndLeaders(scrapedClubs);

    await db.transaction(async (tx) => {
        if (newTags.length > 0) {
            await tx.insert(tags).values(newTags).onConflictDoNothing();
        }

        if (newLeaders.length > 0) {
            await tx
                .insert(leaders)
                .values(
                    newLeaders.map((l) => ({
                        name: l.name,
                        email: l.email,
                    })),
                )
                .onConflictDoNothing();
        }

        for (const club of scrapedClubs) {
            const clubDataForDb = mapClubData(club);
            if (!clubDataForDb) {
                continue;
            }

            const [insertedClub] = await tx
                .insert(scrapedClubsTable)
                .values(clubDataForDb)
                .returning({ id: scrapedClubsTable.id });

            const clubId = insertedClub.id;

            const leaders = getClubLeaders(club).map((l) => ({
                leaderId: l.email,
                role: l.role,
                clubId,
            }));

            if (leaders.length > 0) {
                await tx
                    .insert(clubLeaders)
                    .values(leaders)
                    .onConflictDoNothing();
            }

            const newAdvisors = getClubAdvisors(club).map((a) => ({
                ...a,
                clubId,
            }));
            if (newAdvisors.length > 0) {
                await tx
                    .insert(advisors)
                    .values(newAdvisors)
                    .onConflictDoNothing();
            }

            const socials = getClubSocials(club).map((s) => ({
                ...s,
                clubId,
            }));
            if (socials.length > 0) {
                await tx.insert(socialLinks).values(socials);
            }

            const tags = getClubTags(club);
            if (tags.length > 0) {
                await tx
                    .insert(clubTags)
                    .values(tags.map((t) => ({ ...t, clubId })))
                    .onConflictDoNothing();
            }
        }
    });
}

function collectUniqueTagsAndLeaders(clubs: Club[]) {
    const allTags = new Set<string>();
    const allLeaders = new Map<
        string,
        {
            name: string;
            email: string;
            role: (typeof leaderRoleEnum.enumValues)[number];
        }
    >();

    for (const club of clubs) {
        getClubTags(club).forEach((t) => allTags.add(t.tag));
        getClubLeaders(club).forEach((l) => {
            if (!allLeaders.has(l.email)) {
                allLeaders.set(l.email, l);
            }
        });
    }
    return {
        tags: Array.from(allTags).map((tag) => ({
            name: tag,
        })),
        leaders: Array.from(allLeaders.values()),
    };
}

// --- Mappers & Parsers ---

function mapClubData(club: Club) {
    return {
        name: club.name,
        purposeStatement: club.purpose_statement,
        campus: club.campus,
        status: club.status,
        imageUrl: club.image_url,
        url: club.url,
        primaryMakeUp: club.primary_make_up,
        meetingTimeAndPlace: club.meeting_time_and_place,
        officeLocation: club.office_location,
        membershipType: club.membership_type,
        membershipContact: club.membership_contact,
        timeOfYearForNewMembership: club.time_of_year_for_new_membership,
        howDoesAProspectiveMemberApply:
            club.how_does_a_prospective_member_apply,
        chargeDues: club.charge_dues === "Yes",
        organizationEmail: club.orgainization_email,
    };
}

function getClubLeaders(club: Club) {
    const leaders: {
        email: string;
        role: (typeof leaderRoleEnum.enumValues)[number];
        name: string;
    }[] = [];
    leaders.push({
        email: club.primary_leader_email,
        role: "Primary Leader" as const,
        name: club.primary_leader,
    });
    if (club.secondary_leader && club.secondary_leader_email) {
        leaders.push({
            email: club.secondary_leader_email,
            role: "Secondary Leader" as const,
            name: club.secondary_leader,
        });
    }
    if (club.treasurer_leader && club.treasurer_leader_email) {
        leaders.push({
            email: club.treasurer_leader_email,
            role: "Treasurer" as const,
            name: club.treasurer_leader,
        });
    }
    return leaders;
}

function getClubAdvisors(club: Club) {
    const advisors = [];
    if (club.advisor) {
        advisors.push({ name: club.advisor, role: "Advisor" });
    }
    if (club.co_advisor) {
        advisors.push({ name: club.co_advisor, role: "Co-Advisor" });
    }
    return advisors;
}

function getClubSocials(club: Club) {
    const socials = [];
    if (club.instagram) {
        socials.push({ platform: "Instagram", url: club.instagram });
    }
    if (club.facebook_group_page) {
        socials.push({ platform: "Facebook", url: club.facebook_group_page });
    }
    if (club.twitter) {
        socials.push({ platform: "Twitter", url: club.twitter });
    }
    if (club.website) {
        socials.push({ platform: "Website", url: club.website });
    }
    if (club.other) {
        socials.push({ platform: "Other", url: club.other });
    }
    return socials;
}

function getClubTags(club: Club) {
    const clubTags = new Set<string>();
    if (club.affiliation) {
        club.affiliation
            .split(",")
            .map((t) => t.trim())
            .filter((t) => t && t !== club.campus)
            .forEach((t) => clubTags.add(t));
    }
    if (club.primary_type) {
        clubTags.add(club.primary_type);
    }
    // if (club.secondary_type) {
    //     club.secondary_type
    //         .split(" ")
    //         .map((t) => t.trim())
    //         .filter(Boolean)
    //         .forEach((t) => clubTags.add(t));
    // }

    return Array.from(clubTags)
        .filter((tag) => !tag.toLowerCase().includes("columbus"))
        .map((tag) => ({
            tag,
            isPrimary: tag === club.primary_type,
        }));
}
