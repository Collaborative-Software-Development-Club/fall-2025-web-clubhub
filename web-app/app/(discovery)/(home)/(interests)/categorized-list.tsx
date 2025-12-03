import React from "react";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronRight } from "lucide-react";
import { CategoryIcon, getCategoryDisplayName } from "./interest-utils";
import { Tag } from "@/services/discovery/tags-service/Tag";

type Category = Tag["type"];

interface CategorizedInterestListProps {
    categorizedTags: { name: Category; tags: string[] }[];
    openCategories: Set<Category>;
    onToggleCategory: (category: Category) => void;
    selectedInterests: string[];
    onToggleInterest: (interest: string) => void;
    renderInterest: (interest: string, isSelected: boolean) => React.ReactNode;
    searchValue?: string;
}

export function CategorizedInterestList({
    categorizedTags,
    openCategories,
    onToggleCategory,
    selectedInterests,
    onToggleInterest,
    renderInterest,
    searchValue,
}: CategorizedInterestListProps) {
    return (
        <div className="space-y-3">
            {categorizedTags.map((category) => (
                <Collapsible
                    key={category.name}
                    open={openCategories.has(category.name)}
                    onOpenChange={() => onToggleCategory(category.name)}
                >
                    <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-accent rounded-md">
                        <div className="flex items-center space-x-2">
                            <CategoryIcon categoryName={category.name} />
                            <span className="font-medium text-sm">
                                {getCategoryDisplayName(category.name)}
                            </span>
                            <Badge variant="outline" className="text-xs">
                                {category.tags.length}
                            </Badge>
                        </div>
                        {openCategories.has(category.name) ? (
                            <ChevronDown className="h-4 w-4" />
                        ) : (
                            <ChevronRight className="h-4 w-4" />
                        )}
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-2 ml-4 mt-2">
                        <div className="flex flex-wrap gap-2">
                            {category.tags.map((interest) =>
                                renderInterest(
                                    interest,
                                    selectedInterests.includes(interest),
                                ),
                            )}
                        </div>
                    </CollapsibleContent>
                </Collapsible>
            ))}
            {categorizedTags.length === 0 && searchValue && (
                <p className="text-sm text-muted-foreground text-center py-8">
                    No interests found matching "{searchValue}".
                </p>
            )}
        </div>
    );
}
