"use client";
import { Trash2 } from "lucide-react";
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
import { Input } from "@/components/ui/input";

export default function EmailDialog({ emails }: { emails: string[] }) {
    const [emailList, setEmailList] = useState(emails);
    const [tempEmailList, setTempEmailList] = useState(emails);

    const handleSave = () => {
        setEmailList(tempEmailList);
        // Update the emails in the server with tempEmailList
        console.log("Saved emails:", tempEmailList);
    };

    const handleCancel = () => {
        setTempEmailList(emailList);
    };

    const handleOpenChange = (open: boolean) => {
        if (open) {
            setTempEmailList(emailList);
        }
    };

    return (
        <Dialog onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <div className="rounded-md cursor-pointer hover:bg-gray-100 min-h-14 whitespace-pre-wrap hover:shadow-sm py-2">
                    <label className="text-xl font-bold px-2">
                        Organization Email:
                    </label>
                    <hr className="border-gray-400 mt-2" />
                    {emailList.length > 0 ? (
                        <ul className="p-2 list-disc list-inside">
                            {emailList.map((email, index) => (
                                <li key={index}>{email}</li>
                            ))}
                        </ul>
                    ) : (
                        <p className="p-2 min-h-10 whitespace-pre-wrap">
                            Click to edit...
                        </p>
                    )}
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Emails</DialogTitle>
                    <DialogDescription>
                        Make changes to the organization contact emails here.
                        Click save when you&apos;re done.
                    </DialogDescription>
                </DialogHeader>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSave();
                    }}
                >
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-row justify-between items-center">
                            <h2 className="text-lg font-semibold">Emails</h2>
                            <Button
                                type="button"
                                className="bg-blue-500 text-white"
                                onClick={() =>
                                    setTempEmailList([...tempEmailList, ""])
                                }
                            >
                                +
                            </Button>
                        </div>
                        <div className="grid gap-2">
                            {tempEmailList.map((email, index) => (
                                <div
                                    key={index}
                                    className="flex flex-row gap-1 group"
                                >
                                    <Input
                                        name={`email-${index}`}
                                        defaultValue={email}
                                        type="email"
                                        id={`email-${index}`}
                                        onChange={(e) => {
                                            const newEmails = [
                                                ...tempEmailList,
                                            ];
                                            newEmails[index] = e.target.value;
                                            setTempEmailList(newEmails);
                                        }}
                                    />
                                    <Button
                                        type="button"
                                        className="hidden group-hover:block transition-all transition-discrete duration-100"
                                        onClick={() => {
                                            const newEmails =
                                                tempEmailList.filter(
                                                    (_, i) => i !== index,
                                                );
                                            setTempEmailList(newEmails);
                                        }}
                                    >
                                        <Trash2 />
                                    </Button>
                                </div>
                            ))}
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={handleCancel}
                                >
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button type="submit">Save</Button>
                        </DialogFooter>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
