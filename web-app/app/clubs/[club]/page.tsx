import clubs from "@/mock/clubs.json";
import EditableText from "@/components/clubProfile/EditableText";
import EditableMultipleText from "@/components/clubProfile/EditableMultipleText";
import EmailDialog from "@/components/clubProfile/EmailDialog";

export default async function ClubPage({
    params,
}: {
    params: Promise<{ club: string }>;
}) {
    const { club } = await params;
    const clubData = clubs[0];
    const socialMedia = Object.fromEntries(
        Object.entries(clubData["Contact Information"]).filter(
            ([key]) => key !== "Organization Email",
        ),
    ) as Record<string, string>;
    console.log(socialMedia);

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
                isLink={false}
            />
            <EditableText
                id={club}
                title="Meeting Time and Location"
                path="Meeting Time and Location"
                initialText={
                    clubData["Meeting Information"]["Meeting Time and Place"]
                }
            />
            <div id="contact" className="w-full grid grid-cols-2 items-start px-5 gap-4">
                <EmailDialog
                    emails={
                        clubData["Contact Information"]["Organization Email"]
                    }
                />
                <EditableMultipleText
                    id={club}
                    title="Social Media"
                    path="Contact Information"
                    initialData={socialMedia}
                    isLink={true}
                />
            </div>
        </div>
    );
}
