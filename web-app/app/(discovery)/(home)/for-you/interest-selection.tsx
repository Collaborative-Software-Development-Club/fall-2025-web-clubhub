"use client";

import React, { useState } from "react";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, X } from "lucide-react";
import { Tag } from "@/services/discovery/tags-service/Tag";
import { useInterestCategories } from "../(interests)/use-interest-categories";
import { CategorizedInterestList } from "../(interests)/categorized-list";

const REQUIRED = 3;
type Category = Tag["type"];

export function InterestSelection({
    allInterests,
    setDoneSelecting,
    setInterests: setSelected,
    interests: selected,
}: {
    allInterests: Tag[];
    setDoneSelecting: () => void;
    interests: string[];
    setInterests: (interests: string[]) => void;
}) {
    const [searchValue, setSearchValue] = useState("");
    const [openCategories, setOpenCategories] = useState<Set<Category>>(
        new Set(["DIRECTORY", "MAJOR"]),
    );

    const { availableQuickFilters, categorizedTags } = useInterestCategories(
        allInterests || [],
        searchValue,
        selected,
    );

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

    const renderInterest = (interest: string, isSelected: boolean) => (
        <Toggle
            key={interest}
            onClick={() => toggleInterest(interest)}
            pressed={isSelected}
            variant="outline"
            size="sm"
        >
            {interest}
        </Toggle>
    );

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
                    {/*{availableQuickFilters.length > 0 && (
                        <div className="space-y-2">
                            <h3 className="text-sm font-medium">
                                Popular choices:
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {availableQuickFilters
                                    .slice(0, 8)
                                    .map((interest) => (
                                        <Toggle
                                            key={interest}
                                            onClick={() =>
                                                toggleInterest(interest)
                                            }
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
*/}
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

                    {/* Categorized interests */}
                    <ScrollArea className="h-96">
                        <CategorizedInterestList
                            categorizedTags={categorizedTags}
                            openCategories={openCategories}
                            onToggleCategory={toggleCategory}
                            selectedInterests={selected}
                            onToggleInterest={toggleInterest}
                            renderInterest={renderInterest}
                            searchValue={searchValue}
                        />
                    </ScrollArea>

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
