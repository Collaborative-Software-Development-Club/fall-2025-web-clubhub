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
import DialogInput from "./DialogInput";
import { Plus } from "lucide-react";
import DisplayContact from "./DisplayContact";
import { EMAIL_REGEX, LINK_REGEX, SOCIAL_MEDIA_PLATFORMS } from "./constants";

interface ContactDialogProps {
    data: string[];
    isEmail: boolean;
}

export default function ContactDialog({ data, isEmail }: ContactDialogProps) {
    const [list, setList] = useState(data);
    const [tempList, setTempList] = useState(data);
    const [errors, setErrors] = useState<boolean[]>([]);
    const [generalError, setGeneralError] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const validateItem = (item: string): boolean => {
        if (isEmail) {
            return EMAIL_REGEX.test(item);
        }
        if (item.trim() === "") return true;
        return LINK_REGEX.test(item);
    };

    const getErrorMessage = (): string => {
        return isEmail
            ? "Please enter valid email addresses."
            : "Please enter valid URLs.";
    };

    const handleSave = () => {
        const newErrors: boolean[] = [];
        let hasErrors = false;

        tempList.forEach((item, index) => {
            const isInvalid = !validateItem(item);
            newErrors[index] = isInvalid;
            if (isInvalid) hasErrors = true;
        });

        setErrors(newErrors);

        if (hasErrors) {
            setGeneralError(getErrorMessage());
            return;
        }

        setGeneralError("");
        setErrors([]);
        setList(tempList);
        setIsOpen(false);

        console.log(`Saved ${isEmail ? "emails" : "links"}:`, tempList);
    };

    const resetToOriginalState = () => {
        setTempList(list);
        setGeneralError("");
        setErrors([]);
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

    const dialogTitle = isEmail
        ? "Edit Organization Emails"
        : "Edit Social Media Links";
    const sectionTitle = isEmail ? "Emails" : "Links";

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <div className="rounded-md cursor-pointer hover:bg-gray-100 min-h-14 whitespace-pre-wrap hover:shadow-sm py-2">
                    <DisplayContact list={list} isEmail={isEmail} />
                </div>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{dialogTitle}</DialogTitle>
                    <DialogDescription>
                        Make changes to the organization{" "}
                        {isEmail ? "contact emails" : "social media links"}{" "}
                        here. Click save when you&apos;re done.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-2">
                    <div className="flex flex-row justify-between items-center">
                        <h2 className="text-lg font-semibold">
                            {sectionTitle}
                        </h2>
                        {isEmail && (
                            <Button
                                type="button"
                                className="text-blue-500 bg-blue-100 hover:bg-blue-400 hover:text-white"
                                onClick={() => setTempList([...tempList, ""])}
                            >
                                <Plus />
                            </Button>
                        )}
                    </div>

                    <div className="grid gap-2">
                        {tempList.map((item, index) => (
                            <div key={index}>
                                {!isEmail && (
                                    <p className="text-sm text-gray-500">
                                        {SOCIAL_MEDIA_PLATFORMS[index]}
                                    </p>
                                )}
                                <DialogInput
                                    index={index}
                                    value={item}
                                    errors={errors}
                                    tempList={tempList}
                                    setTempList={setTempList}
                                    setErrors={setErrors}
                                    setGeneralError={setGeneralError}
                                    isEmail={isEmail}
                                />
                            </div>
                        ))}
                    </div>

                    {generalError && (
                        <div className="w-full items-center flex justify-center">
                            <p className="text-red-500">{generalError}</p>
                        </div>
                    )}

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
