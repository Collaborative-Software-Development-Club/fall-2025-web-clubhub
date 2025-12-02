export interface Account {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    year: number | null;
    major: string | null;
    profileVisibility: "public" | "private" | "club-members-only";
    bio: string | null;
}