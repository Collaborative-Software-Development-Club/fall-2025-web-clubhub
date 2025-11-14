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
  SocialLinksInput,
  ClubTagsInput,
  AnnouncementInput,
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
  getClubTagsAction,
  addClubTagsAction,
  deleteClubTagsAction,
  getAnnouncementsAction,
  createAnnouncementAction,
  updateAnnouncementAction,
  deleteAnnouncementAction,
} from "./clubActions";

/* -------------------------------------------------------------------------- */
/*                                 Query keys                                 */
/* -------------------------------------------------------------------------- */

export const clubKeys = {
  description: (clubId: number) => ["clubs", clubId, "description"] as const,
  socialLinks: (clubId: number) => ["clubs", clubId, "socialLinks"] as const,
  meetingLocation: (clubId: number) =>
    ["clubs", clubId, "meetingLocation"] as const,
  tags: (clubId: number) => ["clubs", clubId, "tags"] as const,
  announcements: (clubId: number) =>
    ["clubs", clubId, "announcements"] as const,
};

/* ---------------------------- Description hooks --------------------------- */

export function useClubDescription(clubId: number) {
  const {data} = useQuery({
    queryKey: clubKeys.description(clubId),
    queryFn: () => getClubDescriptionAction(clubId),
    enabled: !!clubId,
  });

  return data;
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
  const {data} = useQuery({
    queryKey: clubKeys.socialLinks(clubId),
    queryFn: () => getSocialLinksAction(clubId),
    enabled: !!clubId,
  });

  return data;
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

/* ---------------------------- Description actions --------------------------- */

export function useMeetingLocation(clubId: number) {
  const {data} = useQuery({
    queryKey: clubKeys.meetingLocation(clubId),
    queryFn: () => getMeetingLocationAction(clubId),
    enabled: !!clubId,
  });

  return data;
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

/* ---------------------------- Tags actions --------------------------- */

export function useClubTags(clubId: number) {
  const {data} = useQuery({
    queryKey: clubKeys.tags(clubId),
    queryFn: () => getClubTagsAction(clubId),
    enabled: !!clubId,
  });

  return data;
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
