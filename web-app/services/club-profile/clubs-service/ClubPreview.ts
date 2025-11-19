export interface ClubPreview {
    name: string;
    meetingLocation?: string;
    meetingTime?: string;
    nextAnnouncement?: {
        title: string;
        body: string;
        date: Date;
        author: string;
    };
};