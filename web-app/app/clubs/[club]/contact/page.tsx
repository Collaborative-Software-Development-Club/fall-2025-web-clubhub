import clubs from "@/mock/clubs.json";

export default async function ContactPage({
    params,
}: {
    params: { club: string };
}) {
    const clubId = params.club; // Dynamic route param(used for later fetching)
    const clubData = clubs[0]; // Mock data for now

    return <div>Contact Info + Social Media Links?</div>;
}
