import { db } from "@/db";
import { and, eq } from "drizzle-orm";
import {
  meetingLocations, addedTags,
  announcements, descriptions,
  addedSocialLinks
} from "@/db/club-profile/schema";
import { z } from "zod";

/* ------------------------------- Validation ---------------------------- */

const ClubId = z.number().int().positive();
const UserId = z.string().min(1);

const ClubDescription = z.object({
  clubId: ClubId,
  description: z.string().min(1),
});

const MeetingLocation = z.object({
    clubId: ClubId,
    location: z.string().min(1),
});

const ClubTag = z.object({
  tagName: z.string().min(1)  
});

const ClubTagsParam = z.object({
  clubId: ClubId,
  tags: z.array(ClubTag).min(1),
});

const Announcement = z.object({
  announcementId: z.number().int().optional(),
  clubId: ClubId,
  authorId: UserId,
  title: z.string().min(1),
  content: z.string().min(1),
  pinned: z.boolean().optional(),
});

const SocialLink = z.object({
  socialId: z.number().int().positive().optional(),
  platform: z.string().min(1),
  url: z.string().min(1),
});

const SocialLinksParam = z.object({
  clubId: ClubId,
  links: z.array(SocialLink).min(1),
});

//TODO: Come up with Membership window and requirement schemas
// const UpsertMembershipWindow = z.object({
//   clubId: ClubId,
//
// });

// const UpsertMembershipRequirement = z.object({
//   clubId: ClubId,
//   requirementId: z.number().int().optional(),
//   label: z.string().min(1),         // e.g., "Application", "Audition"
//   details: z.string().optional(),   // free text
// });

/* ------------------------------- Command API ------------------------------ */

export const clubCommands = {

  /* club description commands */
  async getClubDescription(clubId: number){
    const record = await db.select()
      .from(descriptions)
      .where(eq(descriptions.clubId, clubId));
    return record.length > 0 ? record[0] : null;
  },

  async createClubDescription(input: z.infer<typeof ClubDescription>) {
    const i = ClubDescription.parse(input);

    await db
    .insert(descriptions)
    .values({
      clubId: i.clubId,
      description: i.description,
    });

    return { ok: true };
    }, 

  async updateClubDescription(input: z.infer<typeof ClubDescription>) {
    const i = ClubDescription.parse(input);

    await db
    .update(descriptions)
    .set({
      description: i.description,
    })
    .where(eq(descriptions.clubId, i.clubId));
    
    return { ok: true };
  }, 

  async deleteClubDescription(clubId: number) {
    await db.delete(descriptions).where(eq(descriptions.clubId, clubId));
    return { ok: true };
  },

  /* Social media links commands */
  async getAllSocialLinks(clubId: number){
    const records =  await db.select()
      .from(addedSocialLinks)
      .where(eq(addedSocialLinks.clubId, clubId));
    return records;
  },

  async createSocialLinks(input: z.infer<typeof SocialLinksParam>) {
    const i = SocialLinksParam.parse(input);
    const clubId = i.clubId;
    for (const link of i.links) {
        if (link.platform && link.url) {
            await db.insert(addedSocialLinks)
            .values({
                clubId: clubId,
                platform: link.platform,
                url: link.url,
            });
        }
    }
    return { ok: true };
  }, 
  
  async updateSocialLinks(input: z.infer<typeof SocialLinksParam>) {
    const i = SocialLinksParam.parse(input);
    const clubId = i.clubId;
    for (const link of i.links) {
        if (link.socialId) {
            await db.update(addedSocialLinks)
            .set({
                platform: link.platform,
                url: link.url,
            })
            .where(and(
                eq(addedSocialLinks.id, link.socialId),
                eq(addedSocialLinks.clubId, clubId)
            ));
        }
    }
    return { ok: true };
  },

  async deleteSocialLinks(input: z.infer<typeof SocialLinksParam>) {
    const i = SocialLinksParam.parse(input);
    for (const link of i.links) {
        if (link.socialId) {
            await db.delete(addedSocialLinks).where(and(
                eq(addedSocialLinks.id, link.socialId),
                eq(addedSocialLinks.clubId, i.clubId)
            ));
        }
    }
    return { ok: true };
  },

  /* Meeting locations */
  async getMeetingLocation(clubId: number){
    const record = await db.select()
      .from(meetingLocations)
      .where(eq(meetingLocations.clubId, clubId));
    return record.length > 0 ? record[0] : null;
  },

  async createMeetingLocation(input: z.infer<typeof MeetingLocation>) {
    const i = MeetingLocation.parse(input);

    await db
    .insert(meetingLocations)
    .values({
      clubId: i.clubId,
      location: i.location,
    });
    return { ok: true };
  },

  async updateMeetingLocation(input: z.infer<typeof MeetingLocation>) {
    const i = MeetingLocation.parse(input);

    await db
    .update(meetingLocations)
    .set({
      location: i.location,
    })
    .where(eq(meetingLocations.clubId, i.clubId));
    
    return { ok: true };
  },

  async deleteMeetingLocation(clubId: number) {
    await db.delete(meetingLocations).where(eq(meetingLocations.clubId, clubId));
    return { ok: true };
  },

  /* Club Tags Commands */
  async getAllAddedTags(clubId: number){
    const records =  await db.select()
      .from(addedTags)
      .where(eq(addedTags.clubId, clubId));
    return records;
  },

  async addClubTags(input: z.infer<typeof ClubTagsParam>) {
    const i = ClubTagsParam.parse(input);
    for (const tag of i.tags) {
        await db.insert(addedTags).values({
            clubId: i.clubId,
            name: tag.tagName,
        });
    }
    return { ok: true };
  },

  async deleteClubTags(input: z.infer<typeof ClubTagsParam>) {
    const i = ClubTagsParam.parse(input);
    for (const tag of i.tags) {
        await db.delete(addedTags).where(and(eq(addedTags.clubId, i.clubId), eq(addedTags.name, tag.tagName)));
    }
    return { ok: true };
  },

  /* Announcements commands */
  async getAllAnnouncements(clubId: number){
    const records =  await db.select()
      .from(announcements)
      .where(eq(announcements.clubId, clubId));
    return records.length > 0 ? records : null;
  },

  async createAnnouncement(input: z.infer<typeof Announcement>) {
    const i = Announcement.parse(input);
    await db.insert(announcements)
    .values({
      clubId: i.clubId,
      userId: i.authorId,
      title: i.title,
      content: i.content,
      pinned: i.pinned || false,
      lastModified: new Date(),
    })

    return { ok: true };
  },

  async updateAnnouncement(input: z.infer<typeof Announcement>) {
    const i = Announcement.parse(input);

    if(!i.announcementId) {
        throw new Error("Announcement ID is required for update.");
    }
      await db
      .update(announcements)
      .set({
        title: i.title,
        content: i.content,
        pinned: i.pinned || false,
        lastModified: new Date(),
        })
      .where(and(
        eq(announcements.id, i.announcementId),
        eq(announcements.clubId, i.clubId)
      ));
    return { ok: true };
  }, 

  async deleteAnnouncement(input: z.infer<typeof Announcement>) {
    const i = Announcement.parse(input);
    
    if(!i.announcementId) {
      throw new Error("Announcement ID is required for deletion.");
    }

    await db.delete(announcements)
      .where(and(eq(announcements.id, i.announcementId), eq(announcements.clubId, i.clubId)));
    return { ok: true };
  },

//TODO: Membership window, Membership requirement, and Meeting time
};