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
import { Separator } from "@/components/ui/separator";
import { X, Plus, Filter, Search } from "lucide-react";
import { useState } from "react";
import { Tag } from "@/services/discovery/tags-service/Tag";
import { useInterestCategories } from "./(interests)/use-interest-categories";
import { CategorizedInterestList } from "./(interests)/categorized-list";

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

    const { availableQuickFilters, categorizedTags } = useInterestCategories(
        allTags,
        searchValue,
        selectedInterests,
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

    const renderInterest = (interest: string, isSelected: boolean) => (
        <div
            key={interest}
            className="flex items-center space-x-2 p-2 hover:bg-accent rounded-md cursor-pointer"
            onClick={() => onToggleInterest(interest)}
        >
            <Checkbox
                checked={isSelected}
                onChange={() => onToggleInterest(interest)}
            />
            <label className="text-sm leading-none cursor-pointer flex-1">
                {interest}
            </label>
        </div>
    );

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
                                <CategorizedInterestList
                                    categorizedTags={categorizedTags}
                                    openCategories={openCategories}
                                    onToggleCategory={toggleCategory}
                                    selectedInterests={selectedInterests}
                                    onToggleInterest={onToggleInterest}
                                    renderInterest={renderInterest}
                                    searchValue={searchValue}
                                />

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

            {/* Quick select interests */}
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
