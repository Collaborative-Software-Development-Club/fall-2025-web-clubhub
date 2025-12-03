import { statusEnum } from "@/db/schema";
import { z } from "zod";

const nonEmptyString = z.string().min(1);
const emptyToNull = z.string().transform((val) => (val === "" ? null : val));

export const clubSchema = z.object({
    name: nonEmptyString,
    purpose_statement: emptyToNull,
    campus: nonEmptyString,
    status: z.enum(statusEnum.enumValues),
    image_url: z.url().nullable(),
    url: z.url(),
    primary_make_up: z
        .enum(["Undergraduate", "Graduate", "Professional", ""])
        .transform((val) => (val === "" ? null : val)),
    meeting_time_and_place: nonEmptyString,
    office_location: nonEmptyString,
    membership_type: z
        .enum(["Open Membership", "Application/Selection Process", ""])
        .transform((val) => (val === "" ? null : val)),
    membership_contact: nonEmptyString,
    time_of_year_for_new_membership: nonEmptyString,
    how_does_a_prospective_member_apply: nonEmptyString,
    charge_dues: z.enum(["Yes", "No", "Not Listed"]),
    orgainization_email: emptyToNull,
    primary_leader: nonEmptyString,
    primary_leader_email: z.email(),
    secondary_leader: emptyToNull,
    secondary_leader_email: emptyToNull,
    treasurer_leader: emptyToNull,
    treasurer_leader_email: emptyToNull,
    advisor: emptyToNull,
    co_advisor: emptyToNull,
    instagram: emptyToNull,
    facebook_group_page: emptyToNull,
    twitter: emptyToNull,
    website: emptyToNull,
    other: emptyToNull,
    affiliation: nonEmptyString,
    primary_type: emptyToNull,
    secondary_type: nonEmptyString,
});
