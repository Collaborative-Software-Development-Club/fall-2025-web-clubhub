import Link from "next/link";
import ClubCard from "@/components/browse/ClubCard";
import clubsData from "@/mock/clubs.json";

// Utility to shuffle and pick N random clubs
function getRandomClubs(clubs, count = 3) {
    const shuffled = [...clubs].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}

export default function LoginPage() {
    const randomClubs = getRandomClubs(clubsData, 3);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
            {/* Floating panel */}
            <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center mb-12"
                style={{ minWidth: 320 }}>
                <h2 className="text-2xl font-bold mb-6">Welcome</h2>
                <h3 className="text-l font-semibold mb-4">To access User Profile you must log in.</h3>
                <div className="grid grid-cols-3 gap-4 mb-4">
                    {/* Login Button */}
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl shadow transition"
                        // onClick={handleLogin} // TODO: Connect to API
                    >
                        Login
                    </button>
                    {/* Register Button */}
                    <button
                        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-xl shadow transition"
                        // onClick={handleRegister} // TODO: Connect to API
                    >
                        Register
                    </button>
                    {/* Debug Mode Button */}
                    <Link href="/userprofile">
                        <button
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 px-6 rounded-xl shadow transition"
                        >
                            Debug Mode
                        </button>
                    </Link>
                </div>
                <p className="text-xs text-gray-500">Debug Mode lets you view the profile page without logging in.</p>
            </div>
            {/* Browse page below */}
            <div className="w-full max-w-3xl px-4">
                <h3 className="text-lg font-semibold mb-4">Browse Clubs</h3>
                <div className="flex flex-col gap-6">
                    {randomClubs.map((club) => (
                        <ClubCard
                            key={club["Club Name"]}
                            name={club["Club Name"]}
                            interests={
                                Array.isArray(club.Categories["Secondary Types"])
                                    ? club.Categories["Secondary Types"]
                                    : [club.Categories["Secondary Types"]]
                            }
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}