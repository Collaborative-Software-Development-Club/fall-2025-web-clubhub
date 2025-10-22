"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "../ui/badge";

// OSU student organization sample tags
const tagOptions = [
    "Academic",
    "Activism",
    "Community Service",
    "Creative and Performing Arts",
    "Ethnic/Cultural",
    "Governance Organizations",
    "Honoraries/Honor Societies",
    "Media/Journalism",
    "Religious/Spiritual",
    "Social Fraternities/Sororities",
    "Special Interest",
    "Sports and Recreation",
    "Technology",
    "Graduate",
    "Professional",
    "Undergraduate",
];

interface TagDialogProps {
    data: string[];
}

export function TagDialog({ data }: TagDialogProps) {
    const [originalTags, setOriginalTags] = useState(data);
    const [tempTags, setTempTags] = useState(data);
    const [isOpen, setIsOpen] = useState(false);

    const toggleTag = (tag: string) => {
        setTempTags((prev) =>
            prev.includes(tag) ? prev.filter((i) => i !== tag) : [...prev, tag],
        );
    };

    const removeTag = (itemToRemove: string) => {
        setTempTags((prevItems) =>
            prevItems.filter((item) => item !== itemToRemove),
        );
    };

    const handleSave = () => {
        setOriginalTags(tempTags);
        setIsOpen(false);

        console.log(`Saved tags:`, tempTags);
    };

    const resetToOriginalState = () => {
        setTempTags(originalTags);
    };

    const handleCancel = () => {
        resetToOriginalState();
        setIsOpen(false);
    };

    const handleOpenChange = (open: boolean) => {
        setIsOpen(open);
        if (open) {
            resetToOriginalState();
        }
    };

    const title = "Change Tags";
    const dialogTitle = "Edit Your Organization's Tags";
    const sectionTitle = "Popular Tags";

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <div className="rounded-full cursor-pointer bg-gray-200 hover:bg-gray-100 min-h-5 max-w-30 whitespace-pre-wrap hover:shadow-sm py-1 text-center">
                    <label className="text-sm font-medium cursor-pointer px-2">
                        {title}
                    </label>
                </div>
            </DialogTrigger>
            <DialogTrigger asChild>
                <div className="flex flex-wrap gap-2">
                    {tempTags.map((tag) => (
                        <Badge key={tag} className="">
                            {tag}
                        </Badge>
                    ))}
                </div>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{dialogTitle}</DialogTitle>
                    <DialogDescription>
                        Make changes to your organization&apos;s tags here.
                        Click save when you&apos;re done.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col">
                    <div>
                        <h2 className="text-lg font-semibold">Your Tags</h2>
                        <div className="flex flex-wrap pt-4 gap-2 mb-6">
                            {tempTags.length === 0 ? (
                                <p className="text-gray-500 text-center">
                                    You haven't added any tags.
                                </p>
                            ) : (
                                tempTags.map((tag) => (
                                    <Button
                                        key={tag}
                                        variant="default"
                                        onClick={() => removeTag(tag)}
                                    >
                                        {tag}
                                    </Button>
                                ))
                            )}
                        </div>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold">
                            {sectionTitle}
                        </h2>
                        <div className="flex flex-wrap pt-4 gap-2 mb-6">
                            {tagOptions.map((tag) => (
                                <Button
                                    key={tag}
                                    onClick={() => toggleTag(tag)}
                                >
                                    {tag}
                                </Button>
                            ))}
                        </div>
                    </div>

                    <DialogFooter className="mt-2">
                        <DialogClose asChild>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleCancel}
                            >
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button type="button" onClick={handleSave}>
                            Save
                        </Button>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    );
}
