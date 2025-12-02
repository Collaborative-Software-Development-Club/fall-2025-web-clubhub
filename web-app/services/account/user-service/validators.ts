import { profileVisibilityValues, ProfileVisibility } from "@/db/account/schema";

export const isProfileVisibility = (v: unknown): v is ProfileVisibility => {
  return typeof v === "string" && (profileVisibilityValues as readonly string[]).includes(v);
};

export function parseProfileVisibility(v: unknown, fallback: ProfileVisibility = "private") {
  return isProfileVisibility(v) ? v : fallback;
}