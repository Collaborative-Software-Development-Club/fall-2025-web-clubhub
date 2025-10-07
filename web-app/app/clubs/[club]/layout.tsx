import clubs from "@/mock/clubs.json";
import Image from "next/image";
import Link from "next/link";
import { changeStatus } from "@/components/clubProfile/changeStatus"

export default async function ClubLeaderLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ club: string }>;
}) {
    const clubData = clubs[0]; //use mock data until we setup the database
    const { club } =  await params;

    return (
        <div className="flex flex-col min-h-screen w-full items-center pt-4">
            <header className="w-full max-w-5xl">
                <div className="flex w-full justify-start p-4">
                    <Image
                        src="/default-club-logo.png"
                        alt="Club Logo"
                        width={200}
                        height={100}
                    />
                    <div className="flex flex-col w-full justify-center gap-3">
                        <div className="flex items-center gap-5">
                            <h1 className="text-3xl font-bold">
                                {clubData["Club Name"] + "(Leader)"}
                            </h1>
                            <div className="rounded-full bg-gray-200 px-3 py-1 w-fit text-sm font-medium text-gray-700">
                                {changeStatus("Hello")}
                            </div>
                        </div>
                        <h2 className="text-xl font-semibold">
                            {"Campus: " + clubData["Campus"]}
                        </h2>
                        <div>
                            {/* Club Tags(eg. rounded badges and modify button when hovered) */}
                            <p className="text-gray-600">tags here...</p>
                        </div>
                    </div>
                </div>
                <div className="w-full max-w-6xl px-4">
                    <nav className="flex gap-6 py-2 border-b border-gray-200">
                        <Link
                            href={"/clubs/" + club}
                            className="font-medium text-gray-700 hover:text-blue-600"
                        >
                            Overview
                        </Link>
                        <Link
                            href={"/clubs/" + club + "/members"}
                            className="font-medium text-gray-700 hover:text-blue-600"
                        >
                            Members
                        </Link>
                        <Link
                            href={"/clubs/" + club + "/attendance"}
                            className="font-medium text-gray-700 hover:text-blue-600"
                        >
                            Attendance
                        </Link>
                        <Link
                            href={"/clubs/" + club + "/contact"}
                            className="font-medium text-gray-700 hover:text-blue-600"
                        >
                            Contact Info
                        </Link>
                        {/* Add more links or Remove links as needed */}
                    </nav>
                </div>
            </header>
            <main className="w-full max-w-5xl px-4">{children}</main>
        </div>
    );
}


