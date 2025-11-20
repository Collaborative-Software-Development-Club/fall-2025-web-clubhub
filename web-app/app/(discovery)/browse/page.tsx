import { clubsService } from "@/services/club-profile/clubs-service";
import { tagsService } from "@/services/discovery/tags-service";
import { ClubOverview } from "@/services/club-profile/clubs-service/ClubOverview";
import { Browse } from "./browse";

export default async function BrowsePage() {
    const clubsData = processClubData(await clubsService.getAllClubs());
    const interestOptions = (await tagsService.getAllTags()).map((t) => t.name);
    return <Browse clubsData={clubsData} interestOptions={interestOptions} />;
}

// Read and process mock club data from clubs.json

function processClubData(clubs: ClubOverview[]) {
    return clubs.map((club, index) => {
        const primary = club.categories.primaryType;
        const secondaryRaw = club.categories.secondaryTypes;

        const secondary = Array.isArray(secondaryRaw)
            ? secondaryRaw
            : typeof secondaryRaw === "string"
            ? [secondaryRaw]
            : [];

        const primaryLeader = club.leaders.primaryLeader;

        let contact: string | undefined;
        if (club.contactInformation) {
            const emails = club.contactInformation.organizationEmail;
            if (Array.isArray(emails)) {
                contact = emails[0];
            } else if (typeof emails === "string") {
                contact = emails;
            }
        }

        return {
            id: index + 1,
            name: club.clubName,
            description: club.purposeStatement,
            interests: Array.from(new Set([primary, ...secondary])),
            leader: primaryLeader,
            contact,
            // Additional fields used by the browse filters
            campus: club.campus,
            status: club.status,
            meetingTimeAndPlace:
                club.meetingInformation?.meetingTimeAndPlace || "",
            membershipType: club.membershipDetails?.membershipType || "",
            timeOfYearForNewMembership:
                club.membershipDetails?.timeOfYearForNewMembership || "",
            chargeDues: club.membershipDetails?.chargeDues || "",
        };
    });
}
