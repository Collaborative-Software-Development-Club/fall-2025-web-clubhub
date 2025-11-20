import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import announcements from "@/mock/announcements.json";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import MyClubCard from "@/components/myClubs/myClubCard";

export default function Dashboard() {
    const user = "User"; // eventually grab from convex/auth
    const nowDate = new Date();

    const announcementRefined = announcements.map((item) => ({
        ...item,
        clubName: item.clubName,
        message: item.message,
        datePosted: new Date(item.datePosted),
        expiryDate: new Date(item.expiryDate),
    }));
    // .filter((item) => item.expiryDate >= nowDate);

    return (
        <>
            <div className="w-full flex flex-row justify-end px-8">
                <Button
                    asChild
                    variant="outline"
                    size="icon"
                    aria-label="Account Settings"
                >
                    <Link href="account">
                        <Settings />
                    </Link>
                </Button>
            </div>
            {/* User Clubs */}
            <section className="m-8 space-y-4">
                <h2 className="text-xl font-semibold">{`${user}'s Clubs`}</h2>

                <MyClubCard
                    key={1}
                    name="CSD"
                    logo="/default-club-logo.png"
                    nextMeeting="10/1/25 @6pm - Hitchcock 031"
                    attendance={85}
                    members={42}
                    pending={10}
                    leader={true}
                />
            </section>

            <Separator className="my-8" />

            {/* Announcements */}
            <section className="m-8 space-y-4">
                <h2 className="text-xl font-semibold">Announcements</h2>

                <ScrollArea className="h-[400px] pr-2">
                    <div className="space-y-3">
                        {announcementRefined.map((clubAnnouncement, i) => (
                            <Card key={i}>
                                <CardContent className="py-4">
                                    <p className="mb-2">
                                        {clubAnnouncement.message}
                                    </p>
                                    <Badge
                                        className="text-xs font-medium"
                                        variant="secondary"
                                    >
                                        {clubAnnouncement.clubName} • Posted:{" "}
                                        {clubAnnouncement.datePosted.toLocaleDateString()}
                                    </Badge>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </ScrollArea>
            </section>
        </>
    );
}
