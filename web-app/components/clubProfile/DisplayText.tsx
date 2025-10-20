export default function DisplayText({
    title,
    text,
}: {
    title: string;
    text: string;
}) {
    return (
        <div className="flex flex-col w-full px-5 mt-2">
            <label className="text-xl font-bold px-2">{title}:</label>
            <hr className="mt-2 border-gray-400" />
            <p className="p-2 min-h-10 whitespace-pre-wrap">
                {text || "Click to edit..."}
            </p>
        </div>
    );
}
