"use client";

import React, { useState, useEffect } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { useSelectedInterests } from "./use-selected-interests";

/* Mock interests data - in real app, this might come from an API or database */
const INTERESTS = [
    "Technology",
    "Sports",
    "Music",
    "Art",
    "Science",
    "Food",
    "Travel",
    "Gaming",
    "Photography",
    "Fitness",
    "Literature",
    "Movies",
    "Politics",
    "Fashion",
    "Education",
    "Volunteer",
    "Entrepreneurship",
    "Design",
    "Animals",
    "Nature",
];

export function InterestSelection({
    setDoneSelecting,
    setInterests: setSelected,
    interests: selected,
}: {
    setDoneSelecting: () => void;
    interests: string[];
    setInterests: (interests: string[]) => void;
}) {
    const REQUIRED = 3;

    /* toggle interest selection */
    function toggleInterest(interest: string) {
        setSelected(
            selected.includes(interest)
                ? selected.filter((i) => i !== interest)
                : [...selected, interest],
        );
    }

    return (
        <main className="flex items-center justify-center p-6">
            {/* Header */}
            <Card className="w-full max-w-3xl">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">
                        Choose your interests
                    </CardTitle>
                    <CardDescription>
                        Pick at least {REQUIRED} interests so we can show clubs
                        you might like.
                    </CardDescription>
                </CardHeader>

                {/* Interest Selection Buttons */}
                <CardContent>
                    <div className="flex flex-wrap gap-3 mb-6">
                        {selected &&
                            INTERESTS.map((interest) => {
                                const active = selected.includes(interest);
                                return (
                                    <Toggle
                                        key={interest}
                                        onClick={() => toggleInterest(interest)}
                                        pressed={active}
                                        variant="outline"
                                    >
                                        {interest}
                                    </Toggle>
                                );
                            })}
                    </div>

                    {/* Confirm Button */}
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <span className="font-semibold">
                                {selected && selected.length}
                            </span>
                            <span> / {REQUIRED} selected</span>
                            {selected && selected.length < REQUIRED && (
                                <div className="text-sm text-red-500 mt-1">
                                    Select {REQUIRED - selected.length} more
                                </div>
                            )}
                        </div>

                        <Button
                            disabled={!selected || selected.length < REQUIRED}
                            onClick={setDoneSelecting}
                        >
                            Continue
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </main>
    );
}
