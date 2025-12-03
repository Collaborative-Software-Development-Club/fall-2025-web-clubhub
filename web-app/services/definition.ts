import { Account } from "./account/user-service/Account";
import { ClubOverview } from "./club-profile/clubs-service/ClubOverview";
import { AnnouncementOverview } from "./club-profile/clubs-service/AnnouncementOverview";
import { ClubPreview } from "./club-profile/clubs-service/ClubPreview";
import { FeaturedClubs, ScrapedClub } from "./discovery/scraped-clubs";
import { Tag } from "./discovery/tags-service/Tag";
import { ClubData } from "./club-profile/clubs-service";
import { Meeting } from "@/app/(attendance)/meetings/[club]/types";

// --- discovery ---

export interface TagsService {
    getAllTags(): Promise<Tag[]>;
    getMostPopularTags(limit: number): Promise<Tag[]>;
}

export interface ScrapedClubsService {
    getClub(id: number): Promise<ScrapedClub>;
    getAllClubs(): Promise<ScrapedClub[]>;
    getFeaturedClubs(): Promise<FeaturedClubs>;
    searchClubs(term: string | null, tags: string[]): Promise<ScrapedClub[]>;
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
    getClubData(clubId: number): Promise<ClubData>;
}

// --- attendance ---

export interface MembershipService {
    joinClub(clubId: number): Promise<void>;
    isMember(clubId: number): Promise<boolean>;
    addUserToRoster(
        email: string,
        clubId: number,
        userId?: number,
    ): Promise<void>;
    getClubsUserIsAMemberOf(userId: string): Promise<ScrapedClub[]>;
    getAllMembersFromClub(clubId: string): Promise<Account[]>;
}
export interface AttendanceService {
    getPopularClubs(limit: number): Promise<ScrapedClub[]>;
}
export interface MeetingsService {
    getMeetingsForDateRange(
        clubIds: number[],
        start: Date,
        end: Date,
    ): Promise<Meeting[]>;
}

// --- account ---

export interface AccountService {
    getUserForId(userId: string): Promise<Account>;
}