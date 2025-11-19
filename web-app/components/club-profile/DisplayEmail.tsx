export default function DisplayContact({
    list,
    placeholder = "",
}: {
    list: string[];
    placeholder?: string;
}) {
    const renderDisplayItem = (item: string, index: number) => {
        if (!item || item.trim() === "") return null;

        return (
            <li key={index} className="list-disc list-inside">
                {item}
            </li>
        );
    };

    const title = "Organization Emails:";

    return (
        <div className="w-full">
            <label className="text-xl font-bold px-2">{title}</label>
            <hr className="border-gray-400 mt-2" />

            {list.length > 0 ? (
                <ul className="p-2 list-disc list-inside">
                    {list.map(renderDisplayItem)}
                </ul>
            ) : (
                <p className="p-2 min-h-10 whitespace-pre-wrap">
                    {placeholder}
                </p>
            )}
        </div>
    );
}
