import { ClubOverview } from "./ClubOverview";
import { mockClubsService } from "./mock-club-service";

export interface ClubsService {
    getPopularClubs(): Promise<ClubOverview[]>;
    getAllClubs(): Promise<ClubOverview[]>;
}

export const clubsService: ClubsService = mockClubsService;
