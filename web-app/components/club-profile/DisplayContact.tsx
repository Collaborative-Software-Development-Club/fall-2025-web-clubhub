export default function DisplayContacts({
    list,
    isContact,
    placeholder = "",
}: {
    list: {
        prop1: string;
        prop2: string;
    }[];
    isContact: boolean;
    placeholder?: string;
}) {
    const renderDisplayItem = (
        item: { prop1: string; prop2: string },
        index: number,
    ) => {
        if (!item || item.prop1.trim() === "" || item.prop2.trim() === "")
            return null;

        return (
            <li key={index} className="list-none">
                <span className="font-semibold py-1 pr-1">{item.prop1}:</span>
                {item.prop2}
            </li>
        );
    };
    const title = isContact ? "Organization Contacts:" : "Social Media Links:";

    return (
        <div className="w-full px-5">
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
