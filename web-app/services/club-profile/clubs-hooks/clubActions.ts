"use server";

import { clubCommands  } from "./commands";

export type ClubDescriptionInput = Parameters<
  (typeof clubCommands)["createClubDescription"]
>[0];

export type MeetingLocationInput = Parameters<
  (typeof clubCommands)["createMeetingLocation"]
>[0];

export type SocialLinksInput = Parameters<
  (typeof clubCommands)["createSocialLinks"]
>[0];

export type ClubTagsInput = Parameters<
  (typeof clubCommands)["addClubTags"]
>[0];

export type AnnouncementInput = Parameters<
  (typeof clubCommands)["createAnnouncement"]
>[0];

export type ContactInformationInput = Parameters<
  (typeof clubCommands)["createContactInformation"]
>[0];

export type ClubStatusInput = Parameters<
  (typeof clubCommands)["createClubStatus"]
>[0];

/* ---------------------------- Description actions --------------------------- */

export async function getClubDescriptionAction(clubId: number) {
  return clubCommands.getClubDescription(clubId);
}

export async function createClubDescriptionAction(input: ClubDescriptionInput) {
  return clubCommands.createClubDescription(input);
}

export async function updateClubDescriptionAction(input: ClubDescriptionInput) {
  return clubCommands.updateClubDescription(input);
}

export async function deleteClubDescriptionAction(clubId: number) {
  return clubCommands.deleteClubDescription(clubId);
}

/* --------------------------- Social links actions --------------------------- */

export async function getSocialLinksAction(clubId: number) {
  return clubCommands.getAllSocialLinks(clubId);
}

export async function createSocialLinksAction(input: SocialLinksInput) {
  return clubCommands.createSocialLinks(input);
}

export async function updateSocialLinksAction(input: SocialLinksInput) {
  return clubCommands.updateSocialLinks(input);
}

export async function deleteSocialLinksAction(input: SocialLinksInput) {
  return clubCommands.deleteSocialLinks(input);
}

/* ------------------------- Meeting location actions ------------------------- */

export async function getMeetingLocationAction(clubId: number) {
  return clubCommands.getMeetingLocation(clubId);
}

export async function createMeetingLocationAction(input: MeetingLocationInput) {
  return clubCommands.createMeetingLocation(input);
}

export async function updateMeetingLocationAction(input: MeetingLocationInput) {
  return clubCommands.updateMeetingLocation(input);
}

export async function deleteMeetingLocationAction(clubId: number) {
  return clubCommands.deleteMeetingLocation(clubId);
}

/* ------------------------------- Tags actions ------------------------------- */

export async function getClubTagsAction(clubId: number) {
  return clubCommands.getAllAddedTags(clubId);
}

export async function addClubTagsAction(input: ClubTagsInput) {
  return clubCommands.addClubTags(input);
}

export async function deleteClubTagsAction(input: ClubTagsInput) {
  return clubCommands.deleteClubTags(input);
}

/* --------------------------- Announcements actions -------------------------- */

export async function getAnnouncementsAction(clubId: number) {
  return clubCommands.getAllAnnouncements(clubId);
}

export async function createAnnouncementAction(input: AnnouncementInput) {
  return clubCommands.createAnnouncement(input);
}

export async function updateAnnouncementAction(input: AnnouncementInput) {
  return clubCommands.updateAnnouncement(input);
}

export async function deleteAnnouncementAction(input: AnnouncementInput) {
  return clubCommands.deleteAnnouncement(input);
}

/* ---------------------------- Contact Information actions --------------------------- */

export async function getContactInformationAction(clubId: number) {
  return clubCommands.getContactInformation(clubId);
}

export async function createContactInformationAction(input: ContactInformationInput) {
  return clubCommands.createContactInformation(input);
}

export async function updateContactInformationAction(input: ContactInformationInput) {
  return clubCommands.updateContactInformation(input);
}

export async function deleteContactInformationAction(input: ContactInformationInput) {
  return clubCommands.deleteContactInformation(input);
}

/* ---------------------------- Club Status actions --------------------------- */

export async function getClubStatusAction(clubId: number) {
  return clubCommands.getClubStatus(clubId);
}

export async function createClubStatusAction(input: ClubStatusInput) {
  return clubCommands.createClubStatus(input);
}

export async function updateClubStatusAction(input: ClubStatusInput) {
  return clubCommands.updateClubStatus(input);
}

export async function deleteClubStatusAction(clubId: number) {
  return clubCommands.deleteClubStatus(clubId);
}
