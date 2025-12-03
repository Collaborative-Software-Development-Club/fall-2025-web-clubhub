"use client";
import { Input } from "@/components/ui/input";
import { InterestBar } from "./interest-bar";
import { Tag } from "@/services/discovery/tags-service/Tag";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

const TAGS_PARAM = "tags";

export function SearchAndFilter({ tags }: { tags: Tag[] }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set("query", term);
        } else {
            params.delete("query");
        }
        replace(`${pathname}?${params.toString()}`);
    }, 300);

    const searchTerm = searchParams.get("query")?.toString();
    const selectedInterests =
        searchParams
            .get(TAGS_PARAM)
            ?.split(",")
            .filter((interest) => interest !== "") || [];
    console.log(selectedInterests);

    const handleToggleInterest = useDebouncedCallback((interest: string) => {
        const params = new URLSearchParams(searchParams);
        if (selectedInterests.includes(interest)) {
            const newInterests = selectedInterests.filter(
                (i) => i !== interest,
            );
            if (newInterests.length > 0) {
                params.set(TAGS_PARAM, newInterests.join(","));
            } else {
                params.delete(TAGS_PARAM);
            }
        } else {
            params.set(TAGS_PARAM, [...selectedInterests, interest].join(","));
        }
        replace(`${pathname}?${params.toString()}`);
    }, 100);

    return (
        <section className="relative flex items-center justify-center text-center mt-4">
            <div className="relative z-10 flex w-full flex-col items-center space-y-4 px-4">
                <SearchBar
                    searchTerm={searchTerm}
                    handleSearch={handleSearch}
                />
                <InterestBar
                    allTags={tags}
                    selectedInterests={selectedInterests}
                    onToggleInterest={handleToggleInterest}
                />
            </div>
        </section>
    );
}

// Updated SearchBar to be controlled and have no button
const SearchBar = ({
    searchTerm,
    handleSearch,
}: {
    searchTerm: string | undefined;
    handleSearch: (term: string) => void;
}) => {
    return (
        <div className="w-full max-w-lg items-center space-x-2">
            <Input
                type="text"
                placeholder="Search clubs or keywords"
                className="shadow-primary/50 shadow-2xl flex-1 px-8 py-6 w-full rounded-full"
                onChange={(e) => handleSearch(e.target.value)}
                defaultValue={searchTerm}
            />
        </div>
    );
};
