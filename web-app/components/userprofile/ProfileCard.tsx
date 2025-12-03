import React from "react";

type User = {
    name: string;
    major: string;
    year: string;
    bio: string;
    clubs: string[];
};

export default function ProfileCard({ user }: { user: User }) {
    return (
        <div className="w-full bg-white rounded-xl shadow p-6 mb-6 flex flex-col gap-2 border">
            <div className="flex items-center gap-4 mb-2">
                <div className="h-14 w-14 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold text-gray-500">
                    {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                </div>
                <div>
                    <h2 className="text-xl font-semibold">{user.name}</h2>
                    <p className="text-gray-600 text-sm">
                        {user.major} &middot; {user.year}
                    </p>
                </div>
            </div>
            <p className="text-gray-700 mb-2">{user.bio}</p>
            <div>
                <span className="font-medium text-gray-800">Clubs: </span>
                <span className="text-gray-600">
                    {user.clubs.join(", ")}
                </span>
            </div>
        </div>
    );
}