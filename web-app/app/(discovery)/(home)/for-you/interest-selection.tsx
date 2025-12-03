"use client";

import React, { useState, useMemo } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
    Search,
    ChevronDown,
    ChevronRight,
    GraduationCap,
    Tag as TagIcon,
    X,
} from "lucide-react";
import { fetchInterests } from "./actions";
import { useQuery } from "@tanstack/react-query";
import { Tag } from "@/services/discovery/tags-service/Tag";

const REQUIRED = 3;
type Category = Tag["type"];

export function InterestSelection({
    setDoneSelecting,
    setInterests: setSelected,
    interests: selected,
}: {
    setDoneSelecting: () => void;
    interests: string[];
    setInterests: (interests: string[]) => void;
}) {
    const [searchValue, setSearchValue] = useState("");
    const [openCategories, setOpenCategories] = useState<Set<Category>>(
        new Set(["DIRECTORY", "MAJOR"]),
    );

    const { data: allInterests, isLoading } = useQuery({
        queryKey: ["interests"],
        queryFn: () => fetchInterests(),
    });

    const toggleInterest = (interest: string) => {
        setSelected(
            selected.includes(interest)
                ? selected.filter((i) => i !== interest)
                : [...selected, interest],
        );
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

    const removeInterest = (interest: string) => {
        setSelected(selected.filter((i) => i !== interest));
    };

    // Get popular interests for quick selection (first 8 from DIRECTORY type)
    const quickSelectInterests = useMemo(() => {
        if (!allInterests) return [];
        return allInterests
            .filter((tag) => tag.type === "DIRECTORY")
            .slice(0, 8)
            .map((tag) => tag.name)
            .filter((interest) => !selected.includes(interest));
    }, [allInterests, selected]);

    // Group tags by category and apply search filter
    const categorizedTags = useMemo(() => {
        if (!allInterests) return [];

        const filtered = allInterests.filter((tag) =>
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
    }, [allInterests, searchValue]);

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

    const getCategoryDisplayName = (categoryName: Category) => {
        switch (categoryName) {
            case "MAJOR":
                return "Majors";
            case "DIRECTORY":
                return "Types of Clubs";
            default:
                return categoryName;
        }
    };

    return (
        <main className="flex items-center justify-center p-6">
            <Card className="w-full max-w-4xl">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">
                        Choose your interests
                    </CardTitle>
                    <CardDescription>
                        Pick at least {REQUIRED} interests so we can show clubs
                        you might like.
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                    {/* Selected interests display */}
                    {selected.length > 0 && (
                        <div className="space-y-2">
                            <h3 className="text-sm font-medium">
                                Selected interests:
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {selected.map((interest) => (
                                    <Badge
                                        key={interest}
                                        variant="default"
                                        className="pr-1"
                                    >
                                        {interest}
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-4 w-4 p-0 ml-1 hover:bg-destructive hover:text-destructive-foreground"
                                            onClick={() =>
                                                removeInterest(interest)
                                            }
                                        >
                                            <X className="h-3 w-3" />
                                        </Button>
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Quick select interests */}
                    {quickSelectInterests.length > 0 && (
                        <div className="space-y-2">
                            <h3 className="text-sm font-medium">
                                Popular choices:
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {quickSelectInterests.map((interest) => (
                                    <Toggle
                                        key={interest}
                                        onClick={() => toggleInterest(interest)}
                                        pressed={false}
                                        variant="outline"
                                        size="sm"
                                    >
                                        {interest}
                                    </Toggle>
                                ))}
                            </div>
                        </div>
                    )}

                    <Separator />

                    {/* Search input */}
                    <div className="relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search all interests and majors..."
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            className="pl-10"
                        />
                    </div>

                    {/* Loading state */}
                    {isLoading && (
                        <div className="flex flex-wrap gap-2">
                            {[0, 1, 2, 3, 4, 5].map((i) => (
                                <div
                                    key={i}
                                    className="h-8 w-20 bg-muted animate-pulse rounded"
                                />
                            ))}
                        </div>
                    )}

                    {/* Categorized interests */}
                    {!isLoading && allInterests && (
                        <ScrollArea className="h-96">
                            <div className="space-y-3">
                                {categorizedTags.map((category) => (
                                    <Collapsible
                                        key={category.name}
                                        open={openCategories.has(category.name)}
                                        onOpenChange={() =>
                                            toggleCategory(category.name)
                                        }
                                    >
                                        <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-accent rounded-md">
                                            <div className="flex items-center space-x-2">
                                                <CategoryIcon
                                                    categoryName={category.name}
                                                />
                                                <span className="font-medium text-sm">
                                                    {getCategoryDisplayName(
                                                        category.name,
                                                    )}
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
                                        <CollapsibleContent className="space-y-2 ml-4 mt-2">
                                            <div className="flex flex-wrap gap-2">
                                                {category.tags.map(
                                                    (interest) => (
                                                        <Toggle
                                                            key={interest}
                                                            onClick={() =>
                                                                toggleInterest(
                                                                    interest,
                                                                )
                                                            }
                                                            pressed={selected.includes(
                                                                interest,
                                                            )}
                                                            variant="outline"
                                                            size="sm"
                                                        >
                                                            {interest}
                                                        </Toggle>
                                                    ),
                                                )}
                                            </div>
                                        </CollapsibleContent>
                                    </Collapsible>
                                ))}
                                {categorizedTags.length === 0 &&
                                    searchValue && (
                                        <p className="text-sm text-muted-foreground text-center py-8">
                                            No interests found matching "
                                            {searchValue}".
                                        </p>
                                    )}
                            </div>
                        </ScrollArea>
                    )}

                    {/* Progress and Continue Button */}
                    <div className="flex items-center justify-between gap-4 pt-4 border-t">
                        <div>
                            <span className="font-semibold text-lg">
                                {selected.length}
                            </span>
                            <span className="text-muted-foreground">
                                {" "}
                                / {REQUIRED} selected
                            </span>
                            {selected.length < REQUIRED && (
                                <div className="text-sm text-destructive mt-1">
                                    Select {REQUIRED - selected.length} more to
                                    continue
                                </div>
                            )}
                            {selected.length >= REQUIRED && (
                                <div className="text-sm text-green-600 mt-1">
                                    Great! You can continue or select more
                                    interests.
                                </div>
                            )}
                        </div>

                        <Button
                            disabled={selected.length < REQUIRED}
                            onClick={setDoneSelecting}
                            size="lg"
                        >
                            Continue
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </main>
    );
}
