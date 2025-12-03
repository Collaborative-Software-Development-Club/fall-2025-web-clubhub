export default function DisplayMultipleText({
    title,
    text,
}: {
    title: string;
    text: string;
}) {
    return (
        <div className="w-full py-1 px-2 whitespace-pre-wrap">
            <div>
                <strong>{title}:</strong> {text || "No information provided"}
            </div>
        </div>
    );
}
