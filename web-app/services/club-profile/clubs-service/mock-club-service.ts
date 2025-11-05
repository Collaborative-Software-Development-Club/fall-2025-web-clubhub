import { ClubsService } from ".";
import mockClubs from "@/mock/clubs.json";
import { ClubOverview } from "./ClubOverview";

export const mockClubsService: ClubsService = {
    getAllClubs,
    async getPopularClubs() {
        return getAllClubs();
    },
};

async function getAllClubs() {
    return mockClubs.map(convertJsonToClub);
}

// HELPER FUNCTIONS

function convertJsonToClub(json: (typeof mockClubs)[number]): ClubOverview {
    return {
        clubName: json["Club Name"],
        campus: json["Campus"],
        status: json["Status"],
        purposeStatement: json["Purpose Statement"],
        leaders: {
            primaryLeader: json.Leaders["Primary Leader"],
            secondaryLeader: json.Leaders["Secondary Leader"],
            treasurerLeader: json.Leaders["Treasurer Leader"],
        },
        advisors: {
            advisor: json.Advisors["Advisor"],
            coAdvisor: json.Advisors["Co-Advisor"], // Will be undefined if not present, which is handled by optional chaining in the interface
        },
        contactInformation: {
            organizationEmail:
                json["Contact Information"]["Organization Email"],
            instagram: json["Contact Information"]["Instagram"],
            other: json["Contact Information"]["Other"],
            website: json["Contact Information"]["Website"],
            facebookGroupPage:
                json["Contact Information"]["Facebook Group Page"], // Access new field
        },
        categories: {
            primaryType: json.Categories["Primary Type"],
            secondaryTypes: json.Categories["Secondary Types"],
        },
        makeUp: json["Make Up"],
        constitution: json["Constitution"], // Access new field
        meetingInformation: {
            meetingTimeAndPlace:
                json["Meeting Information"]["Meeting Time and Place"],
        },
        officeLocation: json["Office Location"],
        membershipDetails: {
            membershipType: json["Membership Details"]["Membership Type"],
            membershipContact: json["Membership Details"]["Membership Contact"],
            timeOfYearForNewMembership:
                json["Membership Details"]["Time of Year for New Membership"],
            howDoesAProspectiveMemberApply:
                json["Membership Details"][
                    "How does a Prospective Member Apply"
                ],
            chargeDues: json["Membership Details"]["Charge Dues"],
        },
    };
}
