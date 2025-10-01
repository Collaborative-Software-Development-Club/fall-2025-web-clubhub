import clubs from "@/mock/clubs.json";
import EditableText from "@/components/clubProfile/EditableText";
import EditableMultipleText from "@/components/clubProfile/EditableMultipleText";

export default async function ClubPage({
    params,
}: {
    params: Promise<{ club: string }>;
}) {
    const { club } = await params;
    const clubData = clubs[0];

    return (
        <div className="w-full max-w-6xl flex flex-col items-center py-5 gap-4">
            <EditableText
                id={club}
                title="Purpose Statement"
                path="Purpose Statement"
                initialText={clubData["Purpose Statement"]}
            />
            <EditableMultipleText
                id={club}
                title="Membership Details"
                path="Membership Details"
                initialData={clubData["Membership Details"]}
            />
            <EditableText
                id={club}
                title="Meeting Time and Location"
                path="Meeting Time and Location"
                initialText={
                    clubData["Meeting Information"]["Meeting Time and Place"]
                }
            />
        </div>
    );
}
