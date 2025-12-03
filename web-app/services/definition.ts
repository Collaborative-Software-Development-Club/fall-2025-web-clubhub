import { Account } from "./account/user-service/Account";
import { ClubOverview } from "./club-profile/clubs-service/ClubOverview";
import { AnnouncementOverview } from "./club-profile/clubs-service/AnnouncementOverview";
import { ClubPreview } from "./club-profile/clubs-service/ClubPreview";
import { ScrapedClub } from "./discovery/scraped-clubs";
import { Tag } from "./discovery/tags-service/Tag";

// --- discovery ---

export interface TagsService {
    getAllTags(): Promise<Tag[]>;
}

export interface ScrapedClubsService {
    getClub(id: number): Promise<ScrapedClub>;
    getAllClubs(): Promise<ScrapedClub[]>;
}

/**
 * Responsible for checking whether a user is a verified leader of
 * a club as specified in the university registry
 */
export interface LeadershipVerificationService {
    getClubsCurrentUserIsALeaderOf(): Promise<number[]>;
    isCurrentUserALeaderOfClub(clubId: number): Promise<boolean>;
}

// --- club profile ---

/**
 * Responsible for the club information that combines scraped
 * data and leader-modified data
 */
export interface ClubsService {
    getClubPreviews(clubIds: string[]): Promise<ClubPreview[]>;
    getClubAnnouncements(clubId: string): Promise<AnnouncementOverview[]>;
}

// --- attendance ---

export interface MembershipService {
    getClubsUserIsAMemberOf(userId: string): Promise<string[]>;
    getAllMembersFromClub(clubId: string): Promise<Member[]>;
}
export interface AttendanceService {
    getPopularClubs(): Promise<string[]>;
}
export interface MeetingsService {
    getMeetingsForDateRange(
        clubIds: string[],
        start: Date,
        end: Date,
    ): Promise<Meeting>;
}

// --- account ---

export interface AccountService {
    getUserForId(userId: string): Promise<Account>;
}

// temporary types (remove when an actual one is created)
type Meeting = { _temp: "Meeting" };
type Member = { _temp: "Member" };
