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
import Image from "next/image"
import { UserMinus } from "lucide-react"
import { KeyboardEvent, RefObject, useRef, useState } from "react"
import { ButtonGroup } from "../ui/button-group"

export enum AddUserType {
    Member,
    Leader
}

export type UserPickerItem = {
    email: string
    name?: string
    role?: string
}

export interface AddUserDialogProps {
    addUserType: AddUserType
    submitFunc: (pickedUsers: UserPickerItem[]) => void
}

export function AddUserDialog({ addUserType, submitFunc }: AddUserDialogProps) {
    const [pickedUsers, setPickedUsers] = useState<UserPickerItem[]>([]);
    const emailInputElement:RefObject<HTMLInputElement | null> = useRef(null);

    function handleAddUserToPicker() {
        if (emailInputElement.current === null) {
            return;
        }
        const typedEmail = emailInputElement.current.value;
        if (typedEmail && /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(typedEmail) && !pickedUsers.map((pickedUser) => (pickedUser.email)).includes(typedEmail)) {
            setPickedUsers([{ email: typedEmail, name: "John Doe", role: ""}, ...pickedUsers]);
            emailInputElement.current.value = "";
            emailInputElement.current.focus();
        }
    }

    function handleRemoveUserFromPicker(index:number) {
        if (emailInputElement.current === null) {
            return;
        }
        setPickedUsers(prev => prev.filter((_, i) => i !== index));
        emailInputElement.current!.value = "";
        emailInputElement.current!.focus();
    }

    function onEmailInputEnterKey(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            handleAddUserToPicker();
        }
    }

    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button variant="outline">Open Dialog</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[550px] h-[600px] flex flex-col">
                    <DialogHeader>
                        <DialogTitle>Add {addUserType === AddUserType.Member ? "Members" : "Leaders"}</DialogTitle>
                        <DialogDescription>
                            
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex gap-4 ">
                        <ButtonGroup className="grow">
                            <Input id="add-user-email" name="email" placeholder="buckeye.1@osu.edu" type="email" ref={emailInputElement} onKeyDown={onEmailInputEnterKey} />
                            <Button onClick={handleAddUserToPicker}>Add User</Button>
                        </ButtonGroup>
                    </div>
                    <hr/>
                    <div className="flex flex-col gap-4 grow overflow-y-scroll overflow-x-hidden w-[100%]">
                        {
                            pickedUsers.map((item) => ({email: item.email, name: item.name})).map((pickedUsersItem, pickedUsersIdx) => (
                                <div key={pickedUsersItem.email} className="flex flex-row gap-4 items-center animate-in slide-in-from-top-[4px] fade-in">
                                    <Image src="/placeholder-profile-picture.jpg" width={32} height={32} alt="Placeholder" className="rounded-full bg-black" />
                                    <div className="grid">
                                        <span className="font-semibold text-sm">{pickedUsersItem.name}</span>
                                        <span className="text-muted-foreground text-xs">{pickedUsersItem.email}</span>
                                    </div>
                                    <div className="ml-auto flex flex-row gap-2 items-center">
                                        <Input 
                                            type="text" 
                                            className="max-w-[250px]" 
                                            placeholder="Role (e.g., Member, VP)" 
                                            onChange={
                                                (e) => {
                                                    setPickedUsers(
                                                        (old) => {
                                                            old[pickedUsersIdx].role = e.target.value; 
                                                            return old;
                                                        }
                                                    )
                                                }
                                            } 
                                        />
                                        <Button variant="ghost" size="icon" onClick={() => handleRemoveUserFromPicker(pickedUsersIdx)}>
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
                        <Button type="submit"
                            onClick={
                                () => {
                                    if (submitFunc !== undefined)
                                    submitFunc(pickedUsers)
                                }
                            }>Submit</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}
