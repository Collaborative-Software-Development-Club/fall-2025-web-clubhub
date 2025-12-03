import { useMemo } from "react";
import { Tag } from "@/services/discovery/tags-service/Tag";

type Category = Tag["type"];

export function useInterestCategories(
    allTags: Tag[],
    searchValue: string,
    selectedInterests: string[],
) {
    // Get available quick filter interests (exclude already selected ones)
    const availableQuickFilters = useMemo(() => {
        return allTags
            .filter((tag) => tag.type === "DIRECTORY")
            .slice(0, 12)
            .map((tag) => tag.name)
            .filter((interest) => !selectedInterests.includes(interest));
    }, [allTags, selectedInterests]);

    // Group tags by category and apply search filter
    const categorizedTags = useMemo(() => {
        const filtered = allTags.filter((tag) =>
            tag.name.toLowerCase().includes(searchValue.toLowerCase()),
        );

        const grouped = filtered.reduce(
            (acc, tag) => {
                const category = tag.type;
                if (!acc[category]) {
                    acc[category] = [];
                }
                acc[category].push(tag.name);
                return acc;
            },
            {} as Record<Category, string[]>,
        );

        const sortedCategories = Object.keys(grouped).sort((a, b) => {
            if (a === "DIRECTORY") return -1;
            if (b === "DIRECTORY") return 1;
            if (a === "MAJOR") return -1;
            if (b === "MAJOR") return 1;
            return a.localeCompare(b);
        }) as Category[];

        return sortedCategories.map((category) => ({
            name: category,
            tags: grouped[category].sort(),
        }));
    }, [allTags, searchValue]);

    return {
        availableQuickFilters,
        categorizedTags,
    };
}
