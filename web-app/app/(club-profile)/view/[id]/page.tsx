import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
    CalendarIcon,
    MapPinIcon,
    MailIcon,
    ExternalLinkIcon,
    UsersIcon,
    ClockIcon,
    DollarSignIcon,
    GlobeIcon,
    PhoneIcon,
    MessageCircleIcon,
    LinkedinIcon,
    FacebookIcon,
    TwitterIcon,
    InstagramIcon,
    CheckCircle2Icon,
} from "lucide-react";
import { ClubData, clubsService } from "@/services/club-profile/clubs-service";

interface ClubProfilePageProps {
    params: {
        id: string;
    };
}

// Helper to determine status styling
function getStatusColor(status: string) {
    switch (status?.toLowerCase()) {
        case "active":
            return "bg-green-100 text-green-700 border-green-200 hover:bg-green-100";
        case "inactive":
            return "bg-red-100 text-red-700 border-red-200 hover:bg-red-100";
        case "pending":
            return "bg-yellow-100 text-yellow-700 border-yellow-200 hover:bg-yellow-100";
        default:
            return "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-100";
    }
}

// Helper for Social Media Icons
function getSocialIcon(platform: string) {
    const p = platform.toLowerCase();
    if (p.includes("instagram")) return <InstagramIcon className="h-4 w-4" />;
    if (p.includes("twitter") || p.includes("x"))
        return <TwitterIcon className="h-4 w-4" />;
    if (p.includes("facebook")) return <FacebookIcon className="h-4 w-4" />;
    if (p.includes("linkedin")) return <LinkedinIcon className="h-4 w-4" />;
    if (p.includes("discord")) return <MessageCircleIcon className="h-4 w-4" />;
    if (p.includes("web")) return <GlobeIcon className="h-4 w-4" />;
    return <ExternalLinkIcon className="h-4 w-4" />;
}

// Helper for Dynamic Contact Info Icons
function getContactMethodIcon(method: string) {
    const m = method.toLowerCase();
    if (m.includes("email")) return <MailIcon className="h-4 w-4" />;
    if (m.includes("phone") || m.includes("mobile"))
        return <PhoneIcon className="h-4 w-4" />;
    if (m.includes("web") || m.includes("url"))
        return <GlobeIcon className="h-4 w-4" />;
    if (m.includes("discord") || m.includes("slack"))
        return <MessageCircleIcon className="h-4 w-4" />;
    return <MessageCircleIcon className="h-4 w-4" />;
}

export default async function ClubProfilePage({
    params,
}: ClubProfilePageProps) {
    const clubId = parseInt(params.id);

    if (isNaN(clubId)) {
        notFound();
    }

    let club: ClubData;

    try {
        club = await clubsService.getClubData(clubId);
    } catch (error) {
        notFound();
    }

    // Generate initials for avatar fallback
    const initials = club.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .substring(0, 2)
        .toUpperCase();

    return (
        <div className="min-h-screen bg-gray-50/50 pb-12">
            <div className="container mx-auto px-4 max-w-5xl">
                {/* Profile Header Block */}
                <div className="relative mt-4  mb-8 flex flex-col md:flex-row items-start gap-6">
                    <Avatar className="h-32 w-32 md:h-40 md:w-40 border-4 border-white shadow-xl bg-white rounded-2xl">
                        <AvatarImage
                            src={club.imageUrl || ""}
                            alt={club.name}
                            className="object-cover"
                        />
                        <AvatarFallback className="text-3xl font-bold text-primary  bg-primary/30 rounded-2xl">
                            {initials}
                        </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 pt-16 md:pt-20">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                                    {club.name}
                                </h1>
                                <div className="flex flex-wrap items-center gap-2 mt-2">
                                    <Badge
                                        variant="outline"
                                        className={getStatusColor(club.status)}
                                    >
                                        {club.status}
                                    </Badge>
                                    {club.campus && (
                                        <span className="flex items-center text-sm text-gray-500">
                                            <MapPinIcon className="h-3 w-3 mr-1" />
                                            {club.campus}
                                        </span>
                                    )}
                                    {club.primaryMakeUp && (
                                        <>
                                            <span className="text-gray-300">
                                                •
                                            </span>
                                            <span className="text-sm text-gray-500">
                                                {club.primaryMakeUp}
                                            </span>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3">
                                {club.url && (
                                    <Button asChild>
                                        <a
                                            href={club.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Official Page
                                            <ExternalLinkIcon className="ml-2 h-4 w-4" />
                                        </a>
                                    </Button>
                                )}
                                {/* Fallback to mailto if no URL, or add a secondary button */}
                                {!club.url && club.organizationEmail && (
                                    <Button asChild>
                                        <a
                                            href={`mailto:${club.organizationEmail}`}
                                        >
                                            Contact Us
                                        </a>
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* LEFT COLUMN - Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* About Section */}
                        <section className="space-y-4">
                            <h2 className="text-2xl font-semibold tracking-tight">
                                About Us
                            </h2>
                            <p className="text-lg text-muted-foreground">
                                {club.description ??
                                    "No description provided yet."}
                            </p>
                            {club.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 pt-2">
                                    {club.tags.map((tag, index) => (
                                        <Badge key={index} variant="default">
                                            {tag.name}
                                        </Badge>
                                    ))}
                                </div>
                            )}
                        </section>

                        <Separator />

                        {/* Leadership Section */}
                        {club.leaders.length > 0 && (
                            <section className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <UsersIcon className="h-5 w-5 text-primary" />
                                    <h2 className="text-xl font-semibold">
                                        Leadership
                                    </h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {club.leaders.map((leader, index) => (
                                        <Card
                                            key={index}
                                            className="overflow-hidden border-l-4 border-l-primary"
                                        >
                                            <CardContent className="p-4 flex justify-between items-start">
                                                <div>
                                                    <p className="font-semibold text-gray-900">
                                                        {leader.name}
                                                    </p>
                                                    <p className="text-sm text-primary font-medium">
                                                        {leader.role}
                                                    </p>
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-gray-400 hover:text-primary"
                                                    asChild
                                                >
                                                    <a
                                                        href={`mailto:${leader.email}`}
                                                    >
                                                        <MailIcon className="h-4 w-4" />
                                                    </a>
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Meeting Info Section */}
                        {club.meetingTime && (
                            <Card className="bg-gradient-to-br from-white to-gray-50">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-lg">
                                        <CalendarIcon className="h-5 w-5 text-primary" />
                                        Meetings
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex gap-4 items-start">
                                        <ClockIcon className="h-5 w-5 text-gray-400 mt-0.5" />
                                        <div>
                                            <p className="font-medium text-gray-900">
                                                When
                                            </p>
                                            <p className="text-gray-600">
                                                {club.meetingTime}
                                            </p>
                                        </div>
                                    </div>
                                    {club.officeLocation && (
                                        <div className="flex gap-4 items-start">
                                            <MapPinIcon className="h-5 w-5 text-gray-400 mt-0.5" />
                                            <div>
                                                <p className="font-medium text-gray-900">
                                                    Where
                                                </p>
                                                <p className="text-gray-600">
                                                    {club.officeLocation}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* RIGHT COLUMN - Sidebar */}
                    <div className="space-y-6">
                        {/* Membership Card */}
                        <Card className="border-t-4 border-t-green-500 shadow-md">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <CheckCircle2Icon className="h-5 w-5 text-green-500" />
                                    Membership
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-4 text-sm">
                                {club.membershipType && (
                                    <div className="flex justify-between py-1 border-b">
                                        <span className="text-gray-500">
                                            Type
                                        </span>
                                        <span className="font-medium">
                                            {club.membershipType}
                                        </span>
                                    </div>
                                )}
                                {club.membershipWindow && (
                                    <div className="flex justify-between py-1 border-b">
                                        <span className="text-gray-500">
                                            Window
                                        </span>
                                        <span className="font-medium text-right">
                                            {club.membershipWindow}
                                        </span>
                                    </div>
                                )}
                                <div className="flex justify-between py-1 border-b">
                                    <span className="text-gray-500">Dues</span>
                                    <span className="font-medium flex items-center gap-1">
                                        {club.chargeDues ? (
                                            <>
                                                <DollarSignIcon className="h-3 w-3" />{" "}
                                                Yes
                                            </>
                                        ) : (
                                            "Free"
                                        )}
                                    </span>
                                </div>
                                {club.membershipApplicationMethod && (
                                    <div className="pt-2">
                                        <span className="text-gray-500 block mb-1">
                                            How to Join
                                        </span>
                                        <p className="text-gray-900 bg-gray-50 p-2 rounded border">
                                            {club.membershipApplicationMethod}
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Connect / Contact Card */}
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-lg">
                                    Connect
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {/* Primary Email */}
                                {club.organizationEmail && (
                                    <div className="flex items-center gap-3 group">
                                        <div className="bg-primary/30 p-2 rounded-full group-hover:bg-primary/10 transition-colors">
                                            <MailIcon className="h-4 w-4 text-primary" />
                                        </div>
                                        <a
                                            href={`mailto:${club.organizationEmail}`}
                                            className="text-sm font-medium hover:underline truncate"
                                        >
                                            {club.organizationEmail}
                                        </a>
                                    </div>
                                )}

                                {/* Membership Specific Contact */}
                                {club.membershipContact && (
                                    <div className="flex items-center gap-3">
                                        <div className="bg-primary/30 p-2 rounded-full">
                                            <UsersIcon className="h-4 w-4 text-primary" />
                                        </div>
                                        <div className="text-sm">
                                            <p className="font-medium">
                                                Membership Contact
                                            </p>
                                            <p className="text-gray-500">
                                                {club.membershipContact}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* DYNAMIC CONTACT INFO ARRAY RENDERING */}
                                {club.contactInfo &&
                                    club.contactInfo.length > 0 && (
                                        <div className="space-y-3 pt-2">
                                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                                Additional Details
                                            </p>
                                            {club.contactInfo.map((info) => (
                                                <div
                                                    key={info.id}
                                                    className="flex items-start gap-3"
                                                >
                                                    <div className="bg-gray-100 p-2 rounded-full mt-0.5">
                                                        {getContactMethodIcon(
                                                            info.method,
                                                        )}
                                                    </div>
                                                    <div className="text-sm overflow-hidden">
                                                        <p className="font-medium capitalize">
                                                            {info.method}
                                                        </p>
                                                        <p className="text-gray-500 truncate">
                                                            {info.detail}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                {/* Social Links Grid */}
                                {club.socialLinks.length > 0 && (
                                    <>
                                        <Separator className="my-2" />
                                        <div className="grid grid-cols-2 gap-2">
                                            {club.socialLinks.map(
                                                (link, index) => (
                                                    <Button
                                                        key={index}
                                                        variant="outline"
                                                        size="sm"
                                                        className="w-full justify-start text-xs"
                                                        asChild
                                                    >
                                                        <a
                                                            href={link.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            <span className="mr-2">
                                                                {getSocialIcon(
                                                                    link.platform,
                                                                )}
                                                            </span>
                                                            {link.platform}
                                                        </a>
                                                    </Button>
                                                ),
                                            )}
                                        </div>
                                    </>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
