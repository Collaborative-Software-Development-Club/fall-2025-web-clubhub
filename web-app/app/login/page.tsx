import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import clubsData from "@/mock/clubs.json";

interface ClubCategories {
    "Secondary Types": string | string[];
}

interface Club {
    "Club Name": string;
    Categories: ClubCategories;
}

// Utility to shuffle and pick N random clubs
function getRandomClubs(clubs: Club[], count: number = 3): Club[] {
    const shuffled = [...clubs].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}

export default function LoginPage(): React.JSX.Element {
    const randomClubs: Club[] = getRandomClubs(clubsData, 3);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
            {/* Floating panel */}
            <Card className="rounded-xl shadow-md p-8 flex flex-col items-center mb-12 min-w-[320px]">
                <CardHeader className="flex flex-col items-center w-full p-0">
                    <CardTitle className="text-2xl font-bold mb-2 w-full text-center">
                        Welcome
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center w-full">
                    <h3 className="text-lg font-semibold mb-4">
                        To access User Profile you must log in.
                    </h3>
                    <div className="grid grid-cols-3 gap-4 mb-4 w-full">
                        {/* Login Button */}
                        <Button className="w-full" variant="default">
                            Login
                        </Button>
                        {/* Register Button */}
                        <Button className="w-full" variant="default">
                            Register
                        </Button>
                        {/* Debug Mode Button */}
                        <Link href="/userdashboard" className="w-full">
                            <Button className="w-full" variant="secondary">
                                Debug Mode
                            </Button>
                        </Link>
                    </div>
                    <p className="text-xs text-gray-500">
                        Debug Mode lets you view the profile page without logging in.
                    </p>
                </CardContent>
            </Card>
            {/* Browse page below */}
            <div className="w-full max-w-3xl px-4">
                <h3 className="text-lg font-semibold mb-4">Browse Clubs</h3>
                <div className="flex flex-col gap-6">
                    {randomClubs.map((club) => (
                        <Card key={club["Club Name"]}>
                            <CardHeader>
                                <CardTitle>{club["Club Name"]}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    {(Array.isArray(club.Categories["Secondary Types"])
                                        ? club.Categories["Secondary Types"]
                                        : [club.Categories["Secondary Types"]]
                                    ).map((interest: string) => (
                                        <span
                                            key={interest}
                                            className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md text-sm"
                                        >
                                            {interest}
                                        </span>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}