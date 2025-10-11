export interface ClubOverview {
    clubName: string;
    campus: string;
    status: string;
    purposeStatement: string;
    leaders: {
        primaryLeader: string;
        secondaryLeader: string;
        treasurerLeader: string;
    };
    advisors: {
        advisor: string;
        coAdvisor?: string; // Made optional as it's not always present
    };
    contactInformation: {
        organizationEmail?: string | string[]; // Can be a string or an array of strings
        instagram?: string; // Made optional
        other?: string; // Made optional
        website?: string; // Made optional
        facebookGroupPage?: string; // Added new optional field
    };
    categories: {
        primaryType: string;
        secondaryTypes?: string | string[]; // Can be a string or an array of strings
    };
    makeUp: string;
    constitution?: string; // Added new optional field
    meetingInformation: {
        meetingTimeAndPlace: string;
    };
    officeLocation: string;
    membershipDetails: {
        membershipType: string;
        membershipContact: string;
        timeOfYearForNewMembership: string;
        howDoesAProspectiveMemberApply: string;
        chargeDues: string;
    };
}
