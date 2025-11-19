"use client";

import { useCallback, useMemo, useState } from "react";
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
import { Plus } from "lucide-react";
import { LINK_REGEX } from "./constants";
import DisplaySocial from "@/components/club-profile/DisplaySocial";
import {
    useCreateSocialLinks,
    useUpdateSocialLinks,
    useDeleteSocialLinks,
} from "@/services/club-profile/clubs-hooks/useClubProfileData";

export interface SocialLink {
    id?: number;
    clubId?: number;
    platform: string;
    url: string;
}

interface SocialDialogProps {
    socialLinks: SocialLink[];
    addedSocialLinks: SocialLink[];
    clubId: number;
}

export default function SocialDialog({
    socialLinks,
    addedSocialLinks,
    clubId,
}: SocialDialogProps) {
    clubId = 1; // Temporary hardcode for clubId
    const [tempList, setTempList] = useState<SocialLink[]>(addedSocialLinks);
    const [errors, setErrors] = useState<boolean[]>([]);
    const [generalError, setGeneralError] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const createSocialLinks = useCreateSocialLinks();
    const updateSocialLinks = useUpdateSocialLinks();
    const deleteSocialLinks = useDeleteSocialLinks();

    const displaySocialLinks = useMemo(
        () => socialLinks.concat(addedSocialLinks),
        [socialLinks, addedSocialLinks],
    );

    const validateUrl = (url: string): boolean => {
        if (url.trim() === "") return true;
        return LINK_REGEX.test(url);
    };

    const resetToOriginalState = useCallback(() => {
        setTempList(addedSocialLinks);
        setGeneralError("");
        setErrors([]);
    }, [addedSocialLinks]);

    const handleOpenChange = (open: boolean) => {
        setIsOpen(open);
        if (open) {
            resetToOriginalState();
        }
    };

    const handleCancel = () => {
        resetToOriginalState();
        setIsOpen(false);
    };

    const addNewSocialLink = () => {
        setTempList((prev) => [...prev, { platform: "", url: "" }]);
        setErrors((prev) => [...prev, false]);
    };

    const updateSocialLink = (
        index: number,
        field: "platform" | "url",
        value: string,
    ) => {
        setTempList((prev) => {
            const newList = [...prev];
            newList[index] = { ...newList[index], [field]: value };
            return newList;
        });

        setErrors((prev) => {
            const newErrors = [...prev];
            newErrors[index] = false;
            return newErrors;
        });

        if (generalError) {
            setGeneralError("");
        }
    };

    const removeSocialLink = (index: number) => {
        setTempList((prev) => prev.filter((_, i) => i !== index));
        setErrors((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSave = async () => {
        const newErrors: boolean[] = [];
        let hasErrors = false;

        tempList.forEach((item, index) => {
            const isInvalid = !validateUrl(item.url);
            newErrors[index] = isInvalid;
            if (isInvalid) hasErrors = true;
        });

        setErrors(newErrors);

        if (hasErrors) {
            setGeneralError("Please enter valid URLs.");
            return;
        }

        try {
            const validSocialLinks = tempList.filter(
                (item) => item.platform.trim() !== "" && item.url.trim() !== "",
            );

            const newSocialLinks = validSocialLinks
                .filter((link) => !link.id)
                .map((link) => ({
                    platform: link.platform.trim(),
                    url: link.url.trim(),
                }));

            if (newSocialLinks.length > 0) {
                await createSocialLinks.mutateAsync({
                    clubId,
                    links: newSocialLinks,
                });
            }

            const updatedSocialLinks = validSocialLinks
                .filter((link) => !!link.id)
                .map((link) => ({
                    platform: link.platform.trim(),
                    url: link.url.trim(),
                    socialId: link.id!,
                }));

            if (updatedSocialLinks.length > 0) {
                await updateSocialLinks.mutateAsync({
                    clubId,
                    links: updatedSocialLinks,
                });
            }

            const linksToDelete = addedSocialLinks
                .filter(
                    (existingLink) =>
                        !validSocialLinks.some(
                            (link) => link.id === existingLink.id,
                        ),
                )
                .map((link) => ({
                    platform: link.platform,
                    url: link.url,
                    socialId: link.id!,
                }));

            if (linksToDelete.length > 0) {
                await deleteSocialLinks.mutateAsync({
                    clubId,
                    links: linksToDelete,
                });
            }

            setGeneralError("");
            setErrors([]);
            setIsOpen(false);
            console.log("Saved social links to database:", validSocialLinks);
        } catch (error) {
            console.error("Error saving social links:", error);
            setGeneralError("Failed to save social links. Please try again.");
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <div className="min-h-14 cursor-pointer rounded-md py-2 whitespace-pre-wrap hover:bg-gray-100 hover:shadow-sm">
                    <DisplaySocial
                        list={displaySocialLinks}
                        placeholder="Click to edit..."
                    />
                </div>
            </DialogTrigger>

            <DialogContent className="flex max-h-[80vh] flex-col sm:max-w-[425px]">
                <DialogHeader className="flex-shrink-0">
                    <DialogTitle>Edit Social Media Links</DialogTitle>
                    <DialogDescription>
                        Manage your club&apos;s social media links. These are
                        stored separately from your basic profile information
                        and can be updated independently.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-1 flex-col gap-2 overflow-hidden p-1">
                    <div className="flex flex-shrink-0 flex-row items-center justify-between">
                        <h2 className="text-lg font-semibold">Social Links</h2>
                        <Button
                            type="button"
                            className="bg-blue-100 text-blue-500 hover:bg-blue-400 hover:text-white"
                            onClick={addNewSocialLink}
                        >
                            <Plus />
                        </Button>
                    </div>

                    <div className="grid flex-1 gap-2 overflow-y-auto pr-2">
                        {tempList.map((item, index) => (
                            <div
                                key={item.id ?? index}
                                className="flex flex-col rounded-md border p-3"
                            >
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium">
                                        Link {index + 1}
                                    </p>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => removeSocialLink(index)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Remove
                                    </Button>
                                </div>

                                <div className="flex flex-col">
                                    <div>
                                        <label className="text-xs text-gray-500">
                                            Platform
                                        </label>
                                        <input
                                            type="text"
                                            value={item.platform}
                                            onChange={(e) =>
                                                updateSocialLink(
                                                    index,
                                                    "platform",
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="e.g. Instagram, Twitter, Facebook"
                                            className="w-full rounded-md border px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-xs text-gray-500">
                                            URL
                                        </label>
                                        <input
                                            type="url"
                                            value={item.url}
                                            onChange={(e) =>
                                                updateSocialLink(
                                                    index,
                                                    "url",
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="https://..."
                                            className={`w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                                errors[index]
                                                    ? "border-red-500"
                                                    : ""
                                            }`}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {generalError && (
                        <div className="flex w-full flex-shrink-0 items-center justify-center">
                            <p className="text-red-500">{generalError}</p>
                        </div>
                    )}

                    <DialogFooter className="mt-2 flex-shrink-0">
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
