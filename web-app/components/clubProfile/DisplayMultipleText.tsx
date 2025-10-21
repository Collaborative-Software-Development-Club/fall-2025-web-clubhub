export default function DisplayMultipleText({
    title,
    initialData,
}: {
    title: string;
    initialData: Record<string, string>;
}) {
    return (
        <div className="flex flex-col w-full px-5 mt-2">
            <label className="text-xl font-bold px-2">{title}:</label>
            <hr className="mt-2 border-gray-400" />
            <div className="p-2 min-h-10 whitespace-pre-wrap">
                {Object.entries(initialData).map(([key, value]) => (
                    <div key={key}>
                        <strong>{key}:</strong> {value || "No information provided"}
                    </div>
                ))}
            </div>
        </div>
    );
}
