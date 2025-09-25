import clubs from "@/mock/clubs.json";

export default async function MembersPage({
    params,
}: {
    params: { club: string };
}) {
    const clubId = params.club; // Dynamic route param(used for later fetching)
    const clubData = clubs[0]; // Mock data for now

    return (
        <div>
            Board Members(president, vp, treasurer, etc) + Advisors + General
            Body Members + Total Member Count?
        </div>
    );
}
