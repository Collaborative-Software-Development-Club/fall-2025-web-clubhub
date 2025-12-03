"use client";

import { useClub } from "@/components/club-profile/ClubClientProvider";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { advisors } from "@/db/schema";

export default function MembersPage() {
    const ctx = useClub();
    if (!ctx)
        return (
            <div className="w-full text-center py-5 text-gray-500">
                Loading Club Data...
            </div>
        );
    const { clubData, clubId, isLeader } = ctx;
    const leaders = clubData?.["leaders"] || [];
    //const advisors = clubData?.["advisors"] || [];
    const advisors = [{ name: "Dr. Smith", role: "Faculty Advisor" }];
    const memberCount = 100; // Placeholder for total member count

    console.log(leaders);

    return (
        <div
            className="w-full max-w-6xl flex flex-col items-center p-5 gap-4
        "
        >   
            <Card className="w-full gap-2">
                <CardHeader className="mb-0">
                    <CardTitle className="text-2xl font-bold border-b pb-2">
                        Club Members Stats
                    </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 mt-0">
                    <p className="text-lg">Total member count: {memberCount}</p>
                    <div>add a graph for member trend</div>
                </CardContent>
            </Card>
            <Card className="w-full gap-2">
                <CardHeader className="mb-0">
                    <CardTitle className="text-2xl font-bold border-b pb-2">
                        Club Leaders
                    </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 mt-0">
                    {leaders.length === 0 ? (
                        <p className="text-muted-foreground">
                            No leaders listed.
                        </p>
                    ) : (
                        <div className="flex flex-col gap-3">
                            <div className="grid grid-cols-3 font-bold">
                                <span>Role:</span>
                                <span>Name:</span>
                                <span>Email:</span>
                            </div>
                            {leaders.map(
                                (
                                    leader: {
                                        name: string;
                                        role: string;
                                        email: string;
                                    },
                                    index: number,
                                ) => (
                                    <div
                                        key={index}
                                        className="grid grid-cols-3"
                                    >
                                        <span>{leader.role}</span>
                                        <span>{leader.name}</span>
                                        <span>{leader.email}</span>
                                    </div>
                                ),
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>
            <Card className="w-full gap-2">
                <CardHeader className="mb-0">
                    <CardTitle className="text-2xl font-bold border-b pb-2">
                        Club Advisors
                    </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 mt-0">
                    {advisors.length === 0 ? (
                        <p className="text-muted-foreground">
                            No advisors listed.
                        </p>
                    ) : (
                        <div className="flex flex-col gap-3">
                            <div className="grid grid-cols-2 font-bold">
                                <span>Role:</span>
                                <span>Name:</span>
                            </div>
                            {advisors?.map(
                                (
                                    advisor: {
                                        name: string;
                                        role: string;
                                    },
                                    index: number,
                                ) => (
                                    <div
                                        key={index}
                                        className="grid grid-cols-2"
                                    >
                                        <span>{advisor.role}</span>
                                        <span>{advisor.name}</span>
                                    </div>
                                ),
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
