"use client";

import React from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { fetchInterests } from "./actions";
import { useQuery } from "@tanstack/react-query";
import { Tag } from "@/services/discovery/tags-service/Tag";

const REQUIRED = 3;

export function InterestSelection({
    setDoneSelecting,
    setInterests: setSelected,
    interests: selected,
}: {
    setDoneSelecting: () => void;
    interests: string[];
    setInterests: (interests: string[]) => void;
}) {
    const { data: allInterests, isLoading } = useQuery({
        queryKey: ["interests"],
        queryFn: () => fetchInterests(),
    });

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
                        {isLoading &&
                            [0, 1, 2].map((_, i) => (
                                <Toggle
                                    key={i}
                                    variant="outline"
                                    className="w-10 animate-pulse"
                                ></Toggle>
                            ))}
                        {selected &&
                            allInterests &&
                            allInterests.map((interest) => {
                                const active = selected.includes(interest.name);
                                return (
                                    <Toggle
                                        key={interest.name}
                                        onClick={() =>
                                            toggleInterest(interest.name)
                                        }
                                        pressed={active}
                                        variant="outline"
                                    >
                                        {interest.name}
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
