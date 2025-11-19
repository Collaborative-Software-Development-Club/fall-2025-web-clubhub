import { SocialLink } from "./SocialDialog";

export default function DisplaySocial({
    list,
    placeholder = "",
}: {
    list: SocialLink[];
    placeholder?: string;
}) {
    const renderDisplayItem = (item: SocialLink, index: number) => {
        if (!item || item.url.trim() === "" || item.platform.trim() === "") return null;

        return (
            <li
                key={index}
                className="list-none"
            >
                <span className="font-semibold py-1 pr-1">
                    {item.platform}:
                </span>
                {item.url}
            </li>
        );
    };

    const title = "Social Media Links:";

    return (
        <div className="w-full">
            <label className="text-xl font-bold px-2">{title}</label>
            <hr className="border-gray-400 mt-2" />

            {list.length > 0 ? (
                <ul className="p-2">
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
