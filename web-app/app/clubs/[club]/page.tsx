import clubs from "@/mock/clubs.json";

export default async function ClubLeaderPage({
    params,
}: {
    params: { club: string };
}) {
    const clubId = params.club; // Dynamic route param(used for later fetching)
    const clubData = clubs[0]; // Mock data for now

    return (
        <div className="w-full max-w-6xl flex flex-col items-center">
            Purpose Statement + Membership Info + Meeting times + Meeting
            Location + etc
        </div>
    );
}
