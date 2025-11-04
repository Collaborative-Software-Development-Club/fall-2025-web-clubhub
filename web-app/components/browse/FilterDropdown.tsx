"use client";

import React from "react";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

type FilterDropdownProps = {
    label: string;
    options: string[];
    selected: string[];
    onToggle: (value: string) => void;
};

// Filter button dropdown used in browse
export default function FilterDropdown({
    label,
    options,
    selected,
    onToggle,
}: FilterDropdownProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="px-3 py-1">
                    {label}
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-72">
                {options.length === 0 ? (
                    <div className="p-2 text-sm text-gray-500">No options</div>
                ) : (
                    options.map((opt) => (
                        <DropdownMenuCheckboxItem
                            key={opt}
                            checked={selected.includes(opt)}
                            onCheckedChange={() => onToggle(opt)}
                        >
                            {opt}
                        </DropdownMenuCheckboxItem>
                    ))
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
