import ClubCard from "@/components/dashboard/ClubCard";

export default function DashboardPage() {
    const meeting_date = "Sept. 31, 2025"
    const clubName = "Collaborative Software Engineering"

    return (<main className="flex flex-col items-center p-8 w-full max-w-3xl mx-auto"> 
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

        <ClubCard meetingTime={meeting_date} clubName={clubName} imageSrc="/Next.svg"></ClubCard>
    </main>)
}