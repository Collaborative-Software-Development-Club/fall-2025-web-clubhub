"use client";

import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  // types
  ClubDescriptionInput,
  MeetingLocationInput,
  MeetingTimeInput,
  SocialLinksInput,
  ClubTagsInput,
  AnnouncementInput,
  ContactInformationInput,
  ClubStatusInput,
  // actions
  getClubDescriptionAction,
  createClubDescriptionAction,
  updateClubDescriptionAction,
  deleteClubDescriptionAction,
  getSocialLinksAction,
  createSocialLinksAction,
  updateSocialLinksAction,
  deleteSocialLinksAction,
  getMeetingLocationAction,
  createMeetingLocationAction,
  updateMeetingLocationAction,
  deleteMeetingLocationAction,
  getMeetingTimeAction,
  createMeetingTimeAction,
  updateMeetingTimeAction,
  deleteMeetingTimeAction,
  getClubTagsAction,
  addClubTagsAction,
  deleteClubTagsAction,
  getAnnouncementsAction,
  createAnnouncementAction,
  updateAnnouncementAction,
  deleteAnnouncementAction,
  getContactInformationAction,
  createContactInformationAction,
  updateContactInformationAction,
  deleteContactInformationAction,
  getClubStatusAction,
  createClubStatusAction,
  updateClubStatusAction,
  deleteClubStatusAction,
} from "./clubActions";

/* -------------------------------------------------------------------------- */
/*                                 Query keys                                 */
/* -------------------------------------------------------------------------- */

export const clubKeys = {
  description: (clubId: number) => ["clubs", clubId, "description"] as const,
  socialLinks: (clubId: number) => ["clubs", clubId, "socialLinks"] as const,
  meetingLocation: (clubId: number) =>
    ["clubs", clubId, "meetingLocation"] as const,
  meetingTime: (clubId: number) =>
    ["clubs", clubId, "meetingTime"] as const,
  tags: (clubId: number) => ["clubs", clubId, "tags"] as const,
  announcements: (clubId: number) =>
    ["clubs", clubId, "announcements"] as const,
  contactInformation: (clubId: number) =>
    ["clubs", clubId, "contactInformation"] as const,
  clubStatus: (clubId: number) =>
    ["clubs", clubId, "clubStatus"] as const,
};

/* ---------------------------- Description hooks --------------------------- */

export function useClubDescription(clubId: number) {
  const {data, isLoading, error} = useQuery({
    queryKey: clubKeys.description(clubId),
    queryFn: () => getClubDescriptionAction(clubId),
    enabled: !!clubId,
  });

  return {data, isLoading, error};
}

export function useCreateClubDescription() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: ClubDescriptionInput) =>
      createClubDescriptionAction(input),
    onSuccess: (_data: { ok: boolean }, input: ClubDescriptionInput) => {
      qc.invalidateQueries({
        queryKey: clubKeys.description(input.clubId),
      });
    },
  });
}

export function useUpdateClubDescription() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: ClubDescriptionInput) =>
      updateClubDescriptionAction(input),
    onSuccess: (_data: { ok: boolean }, input: ClubDescriptionInput) => {
      qc.invalidateQueries({
        queryKey: clubKeys.description(input.clubId),
      });
    },
  });
}

export function useDeleteClubDescription() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (clubId: number) => deleteClubDescriptionAction(clubId),
    onSuccess: (_data: { ok: boolean }, clubId: number) => {
      qc.invalidateQueries({
        queryKey: clubKeys.description(clubId),
      });
    },
  });
}

/* ---------------------------- SocialLinks actions --------------------------- */
export function useSocialLinks(clubId: number) {
  const {data, isLoading, error} = useQuery({
    queryKey: clubKeys.socialLinks(clubId),
    queryFn: () => getSocialLinksAction(clubId),
    enabled: !!clubId,
  });

  return {data, isLoading, error};
}

export function useCreateSocialLinks() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: SocialLinksInput) => createSocialLinksAction(input),
    onSuccess: (_data: { ok: boolean }, input: SocialLinksInput) => {
      qc.invalidateQueries({
        queryKey: clubKeys.socialLinks(input.clubId),
      });
    },
  });
}

export function useUpdateSocialLinks() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: SocialLinksInput) => updateSocialLinksAction(input),
    onSuccess: (_data: { ok: boolean }, input: SocialLinksInput) => {
      qc.invalidateQueries({
        queryKey: clubKeys.socialLinks(input.clubId),
      });
    },
  });
}

export function useDeleteSocialLinks() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: SocialLinksInput) => deleteSocialLinksAction(input),
    onSuccess: (_data: { ok: boolean }, input: SocialLinksInput) => {
      qc.invalidateQueries({
        queryKey: clubKeys.socialLinks(input.clubId),
      });
    },
  });
}

/* ---------------------------- Meeting location hooks --------------------------- */

export function useMeetingLocation(clubId: number) {
  const {data, isLoading, error} = useQuery({
    queryKey: clubKeys.meetingLocation(clubId),
    queryFn: () => getMeetingLocationAction(clubId),
    enabled: !!clubId,
  });

  return {data, isLoading, error};
}

export function useCreateMeetingLocation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: MeetingLocationInput) =>
      createMeetingLocationAction(input),
    onSuccess: (_data: { ok: boolean }, input: MeetingLocationInput) => {
      qc.invalidateQueries({
        queryKey: clubKeys.meetingLocation(input.clubId),
      });
    },
  });
}

export function useUpdateMeetingLocation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: MeetingLocationInput) =>
      updateMeetingLocationAction(input),
    onSuccess: (_data: { ok: boolean }, input: MeetingLocationInput) => {
      qc.invalidateQueries({
        queryKey: clubKeys.meetingLocation(input.clubId),
      });
    },
  });
}

export function useDeleteMeetingLocation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (clubId: number) => deleteMeetingLocationAction(clubId),
    onSuccess: (_data: { ok: boolean }, clubId: number) => {
      qc.invalidateQueries({
        queryKey: clubKeys.meetingLocation(clubId),
      });
    },
  });
}

/* ---------------------------- Meeting time hooks --------------------------- */

export function useMeetingTime(clubId: number) {
  const {data, isLoading, error} = useQuery({
    queryKey: clubKeys.meetingTime(clubId),
    queryFn: () => getMeetingTimeAction(clubId),
    enabled: !!clubId,
  });

  return {data, isLoading, error};
}

export function useCreateMeetingTime() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: MeetingTimeInput) =>
      createMeetingTimeAction(input),
    onSuccess: (_data: { ok: boolean }, input: MeetingTimeInput) => {
      qc.invalidateQueries({
        queryKey: clubKeys.meetingTime(input.clubId),
      });
    },
  });
}

export function useUpdateMeetingTime() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: MeetingTimeInput) =>
      updateMeetingTimeAction(input),
    onSuccess: (_data: { ok: boolean }, input: MeetingTimeInput) => {
      qc.invalidateQueries({
        queryKey: clubKeys.meetingTime(input.clubId),
      });
    },
  });
}

export function useDeleteMeetingTime() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (clubId: number) => deleteMeetingTimeAction(clubId),
    onSuccess: (_data: { ok: boolean }, clubId: number) => {
      qc.invalidateQueries({
        queryKey: clubKeys.meetingTime(clubId),
      });
    },
  });
}

/* ---------------------------- Tags actions --------------------------- */

export function useClubTags(clubId: number) {
  const {data, isLoading, error} = useQuery({
    queryKey: clubKeys.tags(clubId),
    queryFn: () => getClubTagsAction(clubId),
    enabled: !!clubId,
  });

  return {data, isLoading, error};
}

export function useAddClubTags() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: ClubTagsInput) => addClubTagsAction(input),
    onSuccess: (_data: { ok: boolean }, input: ClubTagsInput) => {
      qc.invalidateQueries({
        queryKey: clubKeys.tags(input.clubId),
      });
    },
  });
}

export function useDeleteClubTags() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: ClubTagsInput) => deleteClubTagsAction(input),
    onSuccess: (_data: { ok: boolean }, input: ClubTagsInput) => {
      qc.invalidateQueries({
        queryKey: clubKeys.tags(input.clubId),
      });
    },
  });
}

/* ---------------------------- Announcements actions --------------------------- */

export function useAnnouncements(clubId: number) {
  return useQuery({
    queryKey: clubKeys.announcements(clubId),
    queryFn: () => getAnnouncementsAction(clubId),
    enabled: !!clubId,
  });
}

export function useCreateAnnouncement() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: AnnouncementInput) =>
      createAnnouncementAction(input),
    onSuccess: (_data: { ok: boolean }, input: AnnouncementInput) => {
      qc.invalidateQueries({
        queryKey: clubKeys.announcements(input.clubId),
      });
    },
  });
}

export function useUpdateAnnouncement() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: AnnouncementInput) =>
      updateAnnouncementAction(input),
    onSuccess: (_data: { ok: boolean }, input: AnnouncementInput) => {
      qc.invalidateQueries({
        queryKey: clubKeys.announcements(input.clubId),
      });
    },
  });
}

export function useDeleteAnnouncement() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: AnnouncementInput) =>
      deleteAnnouncementAction(input),
    onSuccess: (_data: { ok: boolean }, input: AnnouncementInput) => {
      qc.invalidateQueries({
        queryKey: clubKeys.announcements(input.clubId),
      });
    },
  });
}

/* ---------------------------- Contact Information actions --------------------------- */

export function useContactInformation(clubId: number) {
  const {data, isLoading, error} = useQuery({
    queryKey: clubKeys.contactInformation(clubId),
    queryFn: () => getContactInformationAction(clubId),
    enabled: !!clubId,
  });

  return {data, isLoading, error};
}

export function useCreateContactInformation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: ContactInformationInput) =>
      createContactInformationAction(input),
    onSuccess: (_data: { ok: boolean }, input: ContactInformationInput) => {
      qc.invalidateQueries({
        queryKey: clubKeys.contactInformation(input.clubId),
      });
    },
  });
}

export function useUpdateContactInformation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: ContactInformationInput) =>
      updateContactInformationAction(input),
    onSuccess: (_data: { ok: boolean }, input: ContactInformationInput) => {
      qc.invalidateQueries({
        queryKey: clubKeys.contactInformation(input.clubId),
      });
    },
  });
}

export function useDeleteContactInformation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: ContactInformationInput) =>
      deleteContactInformationAction(input),
    onSuccess: (_data: { ok: boolean }, input: ContactInformationInput) => {
      qc.invalidateQueries({
        queryKey: clubKeys.contactInformation(input.clubId),
      });
    },
  });
}

/* ---------------------------- Club Status actions --------------------------- */

export function useClubStatus(clubId: number) {
  const {data, isLoading, error} = useQuery({
    queryKey: clubKeys.clubStatus(clubId),
    queryFn: () => getClubStatusAction(clubId),
    enabled: !!clubId,
  });

  return {data, isLoading, error};
}

export function useCreateClubStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: ClubStatusInput) =>
      createClubStatusAction(input),
    onSuccess: (_data: { ok: boolean }, input: ClubStatusInput) => {
      qc.invalidateQueries({
        queryKey: clubKeys.clubStatus(input.clubId),
      });
    },
  });
}

export function useUpdateClubStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: ClubStatusInput) =>
      updateClubStatusAction(input),
    onSuccess: (_data: { ok: boolean }, input: ClubStatusInput) => {
      qc.invalidateQueries({
        queryKey: clubKeys.clubStatus(input.clubId),
      });
    },
  });
}

export function useDeleteClubStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (clubId: number) => deleteClubStatusAction(clubId),
    onSuccess: (_data: { ok: boolean }, clubId: number) => {
      qc.invalidateQueries({
        queryKey: clubKeys.clubStatus(clubId),
      });
    },
  });
}
