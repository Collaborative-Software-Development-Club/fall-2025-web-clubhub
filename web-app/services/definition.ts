import { ClubOverview } from "./club-profile/clubs-service/ClubOverview";
import { Tag } from "./discovery/tags-service/Tag";

// --- discovery ---

export interface TagsService {
    getAllTags(): Promise<Tag[]>;
}

export interface ScrapedClubsService {
    getClub(id: string): Promise<ScrapedClub>;
    getAllClubs(): Promise<ScrapedClub[]>;
}

/**
 * Responsible for checking whether a user is a verified leader of
 * a club as specified in the university registry
 */
export interface LeadershipVerificationService {
    getClubsCurrentUserIsALeaderOf(): Promise<string[]>;
    isCurrentUserALeaderOfClub(clubId: string): Promise<boolean>;
}

// --- club profile ---

/**
 * Responsible for the club information that combines scraped
 * data and leader-modified data
 */
export interface ClubsService {
    getClubPreviews(clubIds: string[]): Promise<ClubOverview[]>;
    getClubAnnouncements(clubId: string): Promise<Announcement>;
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

// temporary types (remove when an actual one is created)
type ScrapedClub = { _temp: "Scraped Club" };
type Announcement = { _temp: "Announcement" };
type Meeting = { _temp: "Meeting" };
type Member = { _temp: "Member" };
