export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const LINK_REGEX = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w-./?%&=]*)?$/i;

export const SOCIAL_MEDIA_PLATFORMS = [
    "Instagram",
    "Facebook Group Page",
    "Website",
    "Other",
] as const;

export type SocialMediaPlatform = typeof SOCIAL_MEDIA_PLATFORMS[number];
