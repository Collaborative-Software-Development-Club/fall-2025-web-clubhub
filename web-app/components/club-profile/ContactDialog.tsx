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
import {
    useCreateSocialLinks,
    useUpdateSocialLinks,
    useDeleteSocialLinks,
    useCreateContactInformation,
    useUpdateContactInformation,
    useDeleteContactInformation,
} from "@/services/club-profile/clubs-hooks/useClubProfileData";
import DisplayContacts from "./DisplayContact";

export interface Dialog {
    id?: number;
    prop1: string; // platform for social, method for contact
    prop2: string; // url for social, detail for contact
}

interface DialogProps {
    data: Dialog[];
    addedData: Dialog[] | [];
    isContact: boolean;
    clubId: number;
}

export default function ContactDialog({
    data,
    addedData,
    isContact,
    clubId,
}: DialogProps) {
    const [tempList, setTempList] = useState<Dialog[]>(addedData);
    const [errors, setErrors] = useState<boolean[]>([]);
    const [generalError, setGeneralError] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const createSocialLinks = useCreateSocialLinks();
    const updateSocialLinks = useUpdateSocialLinks();
    const deleteSocialLinks = useDeleteSocialLinks();

    const createContactInfo = useCreateContactInformation();
    const updateContactInfo = useUpdateContactInformation();
    const deleteContactInfo = useDeleteContactInformation();

    const displaySocialLinks = useMemo(
        () => data.concat(addedData),
        [data, addedData],
    );

    const validateInput = (value: string): boolean => {
        if (value.trim() === "") return true;
        if (isContact) {
            return true; // For contact info, any non-empty string is valid
        } else {
            return LINK_REGEX.test(value); // For social links, validate URL
        }
    };

    const resetToOriginalState = useCallback(() => {
        setTempList(addedData);
        setGeneralError("");
        setErrors([]);
    }, [addedData]);

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
        setTempList((prev) => [...prev, { prop1: "", prop2: "" }]);
        setErrors((prev) => [...prev, false]);
    };

    const updateItem = (
        index: number,
        field: "prop1" | "prop2",
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
            const isProp1Invalid = !item.prop1 || item.prop1.trim() === "";
            const isProp2Invalid = !validateInput(item.prop2);
            const isInvalid = isProp1Invalid || isProp2Invalid;

            newErrors[index] = isInvalid;
            if (isInvalid) hasErrors = true;
        });

        setErrors(newErrors);

        if (hasErrors) {
            setGeneralError(
                isContact
                    ? "Please enter valid contact details."
                    : "Please enter valid URLs.",
            );
            return;
        }

        try {
            const validItems = tempList.filter(
                (item) => item.prop1.trim() !== "" && item.prop2.trim() !== "",
            );

            const newItems = validItems
                .filter((item) => !item.id)
                .map((item) => ({
                    [isContact ? "method" : "platform"]: item.prop1.trim(),
                    [isContact ? "detail" : "url"]: item.prop2.trim(),
                }));

            if (newItems.length > 0) {
                if (isContact) {
                    await createContactInfo.mutateAsync({
                        clubId,
                        contacts: newItems as Array<{
                            method: string;
                            detail: string;
                        }>,
                    });
                } else {
                    await createSocialLinks.mutateAsync({
                        clubId,
                        links: newItems as Array<{
                            platform: string;
                            url: string;
                        }>,
                    });
                }
            }

            const updatedItems = validItems
                .filter((item) => !!item.id)
                .map((item) => ({
                    [isContact ? "method" : "platform"]: item.prop1.trim(),
                    [isContact ? "detail" : "url"]: item.prop2.trim(),
                    [isContact ? "contactId" : "socialId"]: item.id!,
                }));

            if (updatedItems.length > 0) {
                if (isContact) {
                    await updateContactInfo.mutateAsync({
                        clubId,
                        contacts: updatedItems as Array<{
                            method: string;
                            detail: string;
                            contactId: number;
                        }>,
                    });
                } else {
                    await updateSocialLinks.mutateAsync({
                        clubId,
                        links: updatedItems as Array<{
                            platform: string;
                            url: string;
                            socialId: number;
                        }>,
                    });
                }
            }

            const itemsToDelete = addedData
                .filter(
                    (existingItem) =>
                        !validItems.some((item) => item.id === existingItem.id),
                )
                .map((item) => ({
                    [isContact ? "method" : "platform"]: item.prop1,
                    [isContact ? "detail" : "url"]: item.prop2,
                    [isContact ? "contactId" : "socialId"]: item.id!,
                }));

            if (itemsToDelete.length > 0) {
                if (isContact) {
                    await deleteContactInfo.mutateAsync({
                        clubId,
                        contacts: itemsToDelete as Array<{
                            method: string;
                            detail: string;
                            contactId: number;
                        }>,
                    });
                } else {
                    await deleteSocialLinks.mutateAsync({
                        clubId,
                        links: itemsToDelete as Array<{
                            platform: string;
                            url: string;
                            socialId: number;
                        }>,
                    });
                }
            }

            setGeneralError("");
            setErrors([]);
            setIsOpen(false);
            console.log(
                `Saved ${
                    isContact ? "contact information" : "social links"
                } to database:`,
                validItems,
            );
        } catch (error) {
            console.error(
                `Error saving ${
                    isContact ? "contact information" : "social links"
                }:`,
                error,
            );
            setGeneralError(
                `Failed to save ${
                    isContact ? "contact information" : "social links"
                }. Please try again.`,
            );
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <div className="min-h-14 cursor-pointer rounded-md py-2 whitespace-pre-wrap hover:bg-gray-100 hover:shadow-sm">
                    <DisplayContacts
                        list={displaySocialLinks}
                        isContact={isContact}
                        placeholder="Click to edit..."
                    />
                </div>
            </DialogTrigger>

            <DialogContent className="flex max-h-[80vh] flex-col sm:max-w-[425px]">
                <DialogHeader className="flex-shrink-0">
                    <DialogTitle>
                        {isContact
                            ? "Edit Contact Information"
                            : "Edit Social Media Links"}
                    </DialogTitle>
                    <DialogDescription>
                        Manage your club&apos;s{" "}
                        {isContact
                            ? "contact information"
                            : "social media links"}
                        . These are stored separately from your basic profile
                        information and can be updated independently.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-1 flex-col gap-2 overflow-hidden p-1">
                    <div className="flex flex-shrink-0 flex-row items-center justify-between">
                        <h2 className="text-lg font-semibold">
                            {isContact ? "Contact Methods" : "Social Links"}
                        </h2>
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
                                        {isContact ? "Contact" : "Link"}{" "}
                                        {index + 1}
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
                                            {isContact ? "Method" : "Platform"}
                                        </label>
                                        <input
                                            type="text"
                                            value={item.prop1}
                                            onChange={(e) =>
                                                updateItem(
                                                    index,
                                                    "prop1",
                                                    e.target.value,
                                                )
                                            }
                                            placeholder={
                                                isContact
                                                    ? "e.g. Email, Phone, Discord"
                                                    : "e.g. Instagram, Twitter, Facebook"
                                            }
                                            className="w-full rounded-md border px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-xs text-gray-500">
                                            {isContact ? "Details" : "URL"}
                                        </label>
                                        <input
                                            type={isContact ? "text" : "url"}
                                            value={item.prop2}
                                            onChange={(e) =>
                                                updateItem(
                                                    index,
                                                    "prop2",
                                                    e.target.value,
                                                )
                                            }
                                            placeholder={
                                                isContact
                                                    ? "contact details..."
                                                    : "https://..."
                                            }
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
