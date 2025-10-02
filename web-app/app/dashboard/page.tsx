import announcements from "@/mock/announcements.json";
import Link from "next/link";

//TODO: Will match css/style to Bill's dashboard page

export default function Dashboard() {
const user = "User"; //make sure to eventually grab user from convex
const nowDate = new Date();
// Extract all datePosted & expiryDate dates and other stuff
const announcementRefined = announcements.map(item => ({
  ...item,
  clubName: item.clubName,
  message: item.message,
  datePosted: new Date(item.datePosted),
  expiryDate: new Date(item.expiryDate)
})).filter(item => item.expiryDate >= nowDate);;

  return (
    <main className="min-h-screen bg-background p-6">
        
        
        {/* Clubs hard coded random stuff*/}
        <section className="m-8 font-semibold">
        <h2 className="text-xl mb-4">{`${user}'s Clubs`}</h2>
            <div className="w-40 h-32 border items-center justify-center text-center p-2">
            <p className="font-medium">CSD</p>
            <p className="text-xs text-gray-500">Next Meeting: 10/1/25 @6pm<br/>Hitchcock 031</p>
        </div>
        </section>

        {/* Announcements */}
        <section className="m-8">
        <h2 className="text-xl font-semibold mb-4">Announcements</h2>
        <div className="space-y-3">
            {announcementRefined.map((clubAnnouncement, i) => (
            <div key={i} className="p-3 border rounded-lg bg-muted text-m shadow"
            >
                <p className="mb-1">{clubAnnouncement.message}</p>
                <p className="text-xs font-semibold border border-gray-270 inline bg-gray-200">
                {clubAnnouncement.clubName} - Posted: {clubAnnouncement.datePosted.toLocaleDateString()}
                </p>
            </div>
            ))}
        </div>
        </section>
    </main>
  );
}
