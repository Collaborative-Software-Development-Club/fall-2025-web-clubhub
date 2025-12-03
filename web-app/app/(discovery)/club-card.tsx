import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Calendar, Clock } from "lucide-react";
import { ScrapedClub } from "@/services/discovery/scraped-clubs";
import Link from "next/link";

type ClubCardProps = {
    club: ScrapedClub;
    mode?: "vertical" | "side";
};

export function ClubCard({ club, mode = "vertical" }: ClubCardProps) {
    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case "active":
                return "bg-green-100 text-green-800";
            case "inactive":
                return "bg-red-100 text-red-800";
            case "pending":
                return "bg-yellow-100 text-yellow-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const hasImage = Boolean(club.imageUrl);

    /** ─────────────────────────────
     * Shared subcomponents
     * ───────────────────────────── */
    const ClubImage = () =>
        hasImage ? (
            <div
                className={
                    mode === "side"
                        ? "relative sm:w-36 sm:h-auto w-full h-32 flex items-center justify-center"
                        : "relative flex items-center justify-center w-full px-3 pt-3"
                }
            >
                <div
                    className={
                        mode === "side"
                            ? "relative w-20 h-20 sm:w-24 sm:h-24 rounded-md overflow-hidden"
                            : "relative w-24 h-24 rounded-md overflow-hidden"
                    }
                >
                    <Image
                        src={club.imageUrl!}
                        alt={club.name}
                        fill
                        className="object-contain"
                        sizes="96px"
                    />
                </div>
            </div>
        ) : null;

    const ClubHeader = () => (
        <CardHeader className="p-0">
            <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-lg font-bold text-gray-900 leading-tight flex-1">
                    {club.name}
                </CardTitle>
                <Badge className={getStatusColor(club.status)}>
                    {club.status}
                </Badge>
            </div>

            {club.purposeStatement && (
                <CardDescription
                    className={`${mode === "side" ? "line-clamp-2" : "line-clamp-3"} text-sm`}
                >
                    {club.purposeStatement}
                </CardDescription>
            )}
        </CardHeader>
    );

    const ClubTags = () =>
        club.tags.length > 0 ? (
            <div className="flex flex-wrap gap-1">
                {club.tags
                    .slice(0, mode === "side" ? 3 : 5)
                    .map((tag, index) => (
                        <Badge
                            variant="secondary"
                            key={index}
                            className="text-xs"
                        >
                            {tag.name}
                        </Badge>
                    ))}
                {club.tags.length > (mode === "side" ? 3 : 5) && (
                    <Badge variant="outline" className="text-xs">
                        +{club.tags.length - (mode === "side" ? 3 : 5)}
                    </Badge>
                )}
            </div>
        ) : null;

    const ClubInfo = () => (
        <div className="space-y-3 text-sm">
            {club.meetingTimeAndPlace && (
                <div className="flex items-start gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <span
                        className={
                            mode === "side" ? "line-clamp-1" : "line-clamp-2"
                        }
                    >
                        {club.meetingTimeAndPlace}
                    </span>
                </div>
            )}

            {club.timeOfYearForNewMembership && (
                <div className="flex items-start gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <span
                        className={`text-muted-foreground ${
                            mode === "side" ? "line-clamp-1" : "line-clamp-2"
                        }`}
                    >
                        Recruitment: {club.timeOfYearForNewMembership}
                    </span>
                </div>
            )}
        </div>
    );

    const ClubMembership = () =>
        club.membershipType || club.chargeDues ? (
            <div className="space-y-2">
                {club.membershipType && (
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                            Membership:
                        </span>
                        <Badge variant="outline" className="text-xs">
                            {club.membershipType}
                        </Badge>
                    </div>
                )}
                {club.chargeDues && (
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Dues:</span>
                        <span className="text-amber-600 font-medium">
                            Required
                        </span>
                    </div>
                )}
            </div>
        ) : null;

    const ClubContent = () => (
        <CardContent className="space-y-4 p-0">
            <ClubTags />
            <ClubInfo />
            <ClubMembership />
        </CardContent>
    );

    /** ─────────────────────────────
     * Layout logic
     * ───────────────────────────── */
    if (mode === "side") {
        return (
            <Link href={`/view/${club.id}`}>
                <Card className="z-10 h-full gap-0 p-0 group flex flex-col sm:flex-row items-stretch  transition-all duration-200 cursor-pointer overflow-hidden">
                    <ClubImage />
                    <div className="flex-1 min-w-0 p-6 space-y-4">
                        <ClubHeader />
                        <ClubContent />
                    </div>
                </Card>
            </Link>
        );
    }

    // Default (vertical)
    return (
        <Link href={`/clubs/${club.id}`}>
            <Card className="z-10  transition-shadow duration-200 cursor-pointer overflow-hidden p-0 gap-0 h-full">
                <ClubImage />
                <div className="p-4 space-y-4">
                    <ClubHeader />
                    <ClubContent />
                </div>
            </Card>
        </Link>
    );
}
