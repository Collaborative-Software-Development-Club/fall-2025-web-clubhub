export const isProfileVisibility = (v: unknown): v is "public" | "private" | "club-members-only" => {
  return v === "public" || v === "private" || v === "club-members-only";
};

export function parseProfileVisibility(v: unknown, fallback: "public" | "private" | "club-members-only" = "private") {
  return isProfileVisibility(v) ? v : fallback;
}