import { SOCIAL_MEDIA_PLATFORMS } from "./constants";

export default function DisplayContact({
    list,
    isEmail,
}: {
    list: string[];
    isEmail: boolean;
}) {
    const renderDisplayItem = (item: string, index: number) => {
        if (!item || item.trim() === "") return null;

        return (
            <li
                key={index}
                className={isEmail ? "list-disc list-inside" : "list-none"}
            >
                {!isEmail && (
                    <span className="font-semibold py-1">
                        {SOCIAL_MEDIA_PLATFORMS[index]}:
                    </span>
                )}{" "}
                {item}
            </li>
        );
    };

    const title = isEmail ? "Organization Email:" : "Social Media Links:";

    return (
        <div className="w-full">
            <label className="text-xl font-bold px-2">{title}</label>
            <hr className="border-gray-400 mt-2" />

            {list.length > 0 ? (
                <ul className={`p-2 ${isEmail ? "list-disc list-inside" : ""}`}>
                    {list.map(renderDisplayItem)}
                </ul>
            ) : (
                <p className="p-2 min-h-10 whitespace-pre-wrap">
                    Click to edit...
                </p>
            )}
        </div>
    );
}
