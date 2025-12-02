import { ProfileVisibility } from "@/db/schema";

export interface Account {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    year: number | null;
    major: string | null;
    profileVisibility: ProfileVisibility;
    bio: string | null;
}