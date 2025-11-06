"use client"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { UserMinus } from "lucide-react"
import { Ref, RefObject, useRef, useState } from "react"
import { ButtonGroup } from "../ui/button-group"

export enum AddUserType {
    Member,
    Leader
}

export interface AddUserDialogProps {
    addUserType: AddUserType
}

type UserPickerItem = {
    email: string
    name?: string
    role?: string
}

export function AddUserDialog({ addUserType }: AddUserDialogProps) {
    const [pickedUsers, setPickedUsers] = useState<UserPickerItem[]>([]);
    const emailInputElement:RefObject<HTMLInputElement | null> = useRef(null);

    function handleAddUserToPicker() {
        if (emailInputElement.current === null) {
            return;
        }
        const typedEmail = emailInputElement.current.value;
        if (typedEmail && /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(typedEmail) && !pickedUsers.map((pickedUser) => (pickedUser.email)).includes(typedEmail)) {
            setPickedUsers([...pickedUsers, { email: typedEmail, name: "John Doe", role: ""}]);
            emailInputElement.current.value = "";
            emailInputElement.current.focus();
        }
    }

    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button variant="outline">Open Dialog</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[550px]">
                    <DialogHeader>
                        <DialogTitle>Add {addUserType === AddUserType.Member ? "Members" : "Leaders"}</DialogTitle>
                        <DialogDescription>
                            
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex gap-4 ">
                        <ButtonGroup className="grow">
                            <Input id="add-user-email" name="email" placeholder="buckeye.1@osu.edu" type="email" ref={emailInputElement} />
                            <Button onClick={handleAddUserToPicker}>Add User</Button>
                        </ButtonGroup>
                    </div>
                    <hr/>
                    {JSON.stringify(pickedUsers)}
                    <div className="grid gap-4">
                        {
                            pickedUsers.map((pickedUsersItem, pickedUsersIdx) => (
                                <div key={pickedUsersItem.email} className="flex flex-row gap-4 items-center">
                                    <Image src="/placeholder-profile-picture.jpg" width={32} height={32} alt="Placeholder" className="rounded-full bg-black" />
                                    <div className="grid">
                                        <span className="font-semibold text-sm">{pickedUsersItem.name}</span>
                                        <span className="text-muted-foreground text-xs">{pickedUsersItem.email}</span>
                                    </div>
                                    <div className="ml-auto flex flex-row gap-2 items-center">
                                        <Input type="text" className="max-w-[250px]" placeholder="Role (e.g., Member, VP)" />
                                        <Button variant="ghost" size="icon">
                                            <UserMinus />
                                        </Button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button variant="outline">Import CSV</Button>
                        <Button type="submit">Submit</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}
