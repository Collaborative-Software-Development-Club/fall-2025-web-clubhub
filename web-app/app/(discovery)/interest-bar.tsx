"use client";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { useState } from "react";

export const InterestBar = ({ allTags }: { allTags: string[] }) => {
    const [showAll, setShowAll] = useState(false);
    const visibleInterests = showAll ? allTags : allTags.slice(0, 4);
    const hiddenInterestCount = allTags.length - visibleInterests.length;

    return (
        <div className="flex w-full max-w-5xl items-center space-x-2 py-2 flex-wrap gap-1">
            {visibleInterests.map((interest) => (
                <Toggle
                    key={interest}
                    variant="outline"
                    className="rounded-full"
                >
                    {interest}
                </Toggle>
            ))}
            {!showAll && hiddenInterestCount > 0 && (
                <Button
                    variant="outline"
                    className="rounded-full"
                    onClick={() => setShowAll(true)}
                >
                    + {hiddenInterestCount} more
                </Button>
            )}
            {/* Add styling for scrollbar hiding if needed */}
            <style jsx>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none; /* IE and Edge */
                    scrollbar-width: none; /* Firefox */
                }
            `}</style>
        </div>
    );
};
