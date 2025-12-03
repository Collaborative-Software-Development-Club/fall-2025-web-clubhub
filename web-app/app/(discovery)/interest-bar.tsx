"use client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import {
    X,
    Plus,
    Filter,
    Search,
    ChevronDown,
    ChevronRight,
    GraduationCap,
    Tag as TagIcon,
} from "lucide-react";
import { useState, useMemo } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tag } from "@/services/discovery/tags-service/Tag";

type Category = Tag["type"];

export function InterestBar({
    allTags,
    selectedInterests,
    onToggleInterest,
}: {
    allTags: Tag[];
    selectedInterests: string[];
    onToggleInterest: (interest: string) => void;
}) {
    const [open, setOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [openCategories, setOpenCategories] = useState<Set<Category>>(
        new Set(["DIRECTORY"]),
    );

    const clearAllInterests = () => {
        selectedInterests.forEach((interest) => onToggleInterest(interest));
    };

    const removeInterest = (interest: string) => {
        onToggleInterest(interest);
    };

    const toggleCategory = (category: Category) => {
        const newOpenCategories = new Set(openCategories);
        if (newOpenCategories.has(category)) {
            newOpenCategories.delete(category);
        } else {
            newOpenCategories.add(category);
        }
        setOpenCategories(newOpenCategories);
    };

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

        // Sort categories with Interests first, then Majors, then others alphabetically
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

    // Get category icons
    const CategoryIcon = ({ categoryName }: { categoryName: Category }) => {
        switch (categoryName) {
            case "MAJOR":
                return <GraduationCap className="h-4 w-4" />;
            case "DIRECTORY":
                return <TagIcon className="h-4 w-4" />;
            default:
                return <TagIcon className="h-4 w-4" />;
        }
    };

    return (
        <div className="flex flex-col w-full max-w-5xl space-y-3">
            {/* Main filter bar */}
            <div className="flex items-center space-x-2 py-2">
                {/* Selected interests as badges */}
                <div className="flex flex-wrap gap-1 flex-1 min-h-[32px]">
                    {selectedInterests.slice(0, 4).map((interest) => (
                        <Badge
                            key={interest}
                            variant="default"
                            className="rounded-full pr-1 text-xs"
                        >
                            {interest}
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-4 w-4 p-0 ml-1 hover:bg-destructive hover:text-destructive-foreground"
                                onClick={() => removeInterest(interest)}
                            >
                                <X className="h-3 w-3" />
                            </Button>
                        </Badge>
                    ))}
                    {selectedInterests.length > 4 && (
                        <Badge
                            variant="default"
                            className="rounded-full text-xs"
                        >
                            +{selectedInterests.length - 4} more
                        </Badge>
                    )}
                    {selectedInterests.length === 0 && (
                        <span className="text-sm text-muted-foreground italic">
                            No filters selected
                        </span>
                    )}
                </div>

                {/* Control buttons */}
                <div className="flex items-center space-x-2">
                    {/* Clear all button */}
                    {selectedInterests.length > 0 && (
                        <Button
                            variant="outline"
                            size="sm"
                            className="rounded-full text-xs"
                            onClick={clearAllInterests}
                        >
                            Clear all
                        </Button>
                    )}

                    {/* Advanced filters sheet */}
                    <Sheet open={open} onOpenChange={setOpen}>
                        <SheetTrigger asChild>
                            <Button
                                variant="outline"
                                className="rounded-full"
                                size="sm"
                            >
                                <Filter className="h-4 w-4 mr-1" />
                                Filter
                                <Plus className="h-4 w-4 ml-1" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent
                            side="right"
                            className="p-6 overflow-y-auto"
                        >
                            <SheetHeader>
                                <SheetTitle>Select Interests</SheetTitle>
                            </SheetHeader>
                            <div className="space-y-4">
                                {/* Search input */}
                                <div className="relative">
                                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Search interests and majors..."
                                        value={searchValue}
                                        onChange={(e) =>
                                            setSearchValue(e.target.value)
                                        }
                                        className="pl-10"
                                    />
                                </div>

                                {/* Header info */}
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-muted-foreground">
                                        {selectedInterests.length} selected •{" "}
                                        {allTags.length} total
                                    </span>
                                    {selectedInterests.length > 0 && (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={clearAllInterests}
                                        >
                                            Clear all
                                        </Button>
                                    )}
                                </div>

                                <Separator />

                                {/* Categorized interest list */}
                                <div className="space-y-3">
                                    {categorizedTags.map((category) => (
                                        <Collapsible
                                            key={category.name}
                                            open={openCategories.has(
                                                category.name,
                                            )}
                                            onOpenChange={() =>
                                                toggleCategory(category.name)
                                            }
                                        >
                                            <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-accent rounded-md">
                                                <div className="flex items-center space-x-2">
                                                    <CategoryIcon
                                                        categoryName={
                                                            category.name
                                                        }
                                                    />
                                                    <span className="font-medium text-sm">
                                                        {category.name ===
                                                        "MAJOR"
                                                            ? "Majors"
                                                            : "Types of Clubs"}
                                                    </span>
                                                    <Badge
                                                        variant="outline"
                                                        className="text-xs"
                                                    >
                                                        {category.tags.length}
                                                    </Badge>
                                                </div>
                                                {openCategories.has(
                                                    category.name,
                                                ) ? (
                                                    <ChevronDown className="h-4 w-4" />
                                                ) : (
                                                    <ChevronRight className="h-4 w-4" />
                                                )}
                                            </CollapsibleTrigger>
                                            <CollapsibleContent className="space-y-1 ml-4 mt-2">
                                                {category.tags.map(
                                                    (interest) => (
                                                        <div
                                                            key={interest}
                                                            className="flex items-center space-x-2 p-2 hover:bg-accent rounded-md cursor-pointer"
                                                            onClick={() =>
                                                                onToggleInterest(
                                                                    interest,
                                                                )
                                                            }
                                                        >
                                                            <Checkbox
                                                                checked={selectedInterests.includes(
                                                                    interest,
                                                                )}
                                                                onChange={() =>
                                                                    onToggleInterest(
                                                                        interest,
                                                                    )
                                                                }
                                                            />
                                                            <label className="text-sm leading-none cursor-pointer flex-1">
                                                                {interest}
                                                            </label>
                                                        </div>
                                                    ),
                                                )}
                                            </CollapsibleContent>
                                        </Collapsible>
                                    ))}
                                    {categorizedTags.length === 0 && (
                                        <p className="text-sm text-muted-foreground text-center py-8">
                                            No interests found matching "
                                            {searchValue}".
                                        </p>
                                    )}
                                </div>

                                {/* Quick stats at bottom */}
                                {selectedInterests.length > 0 && (
                                    <>
                                        <Separator />
                                        <div className="text-xs text-muted-foreground">
                                            Selected:{" "}
                                            {selectedInterests
                                                .slice(0, 3)
                                                .join(", ")}
                                            {selectedInterests.length > 3 &&
                                                ` and ${selectedInterests.length - 3} more`}
                                        </div>
                                    </>
                                )}
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>

            {/* Quick select interests - only show unselected ones */}
            {availableQuickFilters.length > 0 && (
                <div className="flex flex-wrap gap-2 py-2 border-t pt-3">
                    <span className="text-sm text-muted-foreground self-center mr-2">
                        Quick filters:
                    </span>
                    {availableQuickFilters.map((interest) => (
                        <Badge
                            key={interest}
                            variant="outline"
                            className="cursor-pointer hover:bg-accent text-xs px-3 py-1"
                            onClick={() => onToggleInterest(interest)}
                        >
                            {interest}
                        </Badge>
                    ))}
                    <Badge
                        variant="outline"
                        className="cursor-pointer hover:bg-accent text-xs px-3 py-1 text-muted-foreground"
                        onClick={() => setOpen(true)}
                    >
                        View all...
                    </Badge>
                </div>
            )}
        </div>
    );
}
