export function DisplayText({
    title,
    text,
    placeholder = "",
}: {
    title: string;
    text: string;
    placeholder?: string;
}) {
    return (
        <div className="flex flex-col w-full px-5 mt-2">
            <label className="text-xl font-bold px-2">{title}:</label>
            <hr className="mt-2 border-gray-400" />
            <p className="p-2 min-h-10 whitespace-pre-wrap">
                {text || placeholder}
            </p>
        </div>
    );
}
