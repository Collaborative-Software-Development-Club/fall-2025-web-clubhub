import ProfileCard from "@/components/userprofile/ProfileCard";
import { mockUsers } from "@/data/mock-users";
import clubs from "@/mock/clubs.json";

export default function UserProfile() {
    const currentUser = mockUsers[0]; // Replace with actual user logic
    // Find clubs the user is in
    const userClubs = clubs.filter(club => currentUser.clubs.includes(club["Club Name"]));
    // Find fellow members (excluding self)
    const fellowMembers = mockUsers.filter(
        user => user.clubs.some(club => currentUser.clubs.includes(club)) && user.name !== currentUser.name
    );

    return (
        <main className="flex flex-col items-center p-8 w-full max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">User Profile</h1>
            <ProfileCard user={currentUser} />

            <section className="w-full mt-8">
                <h2 className="text-xl font-semibold mb-4">My Clubs</h2>
                <ul>
                    {userClubs.map(club => (
                        <li key={club["Club Name"]}>{club["Club Name"]}</li>
                    ))}
                </ul>
            </section>

            <section className="w-full mt-8">
                <h2 className="text-xl font-semibold mb-4">Fellow Club Members</h2>
                <ul>
                    {fellowMembers.map(user => (
                        <li key={user.name}>
                            <ProfileCard user={user} />
                        </li>
                    ))}
                </ul>
            </section>
        </main>
    );
}
