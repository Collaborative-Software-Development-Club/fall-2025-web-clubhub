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

export enum AddUserType {
    Member,
    Leader
}

interface AddUserDialogProps {
    addUserType: AddUserType

}

export function AddUserDialog({ addUserType }: AddUserDialogProps) {
    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button variant="outline">Open Dialog</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add {addUserType === AddUserType.Member ? "Members" : "Leaders"}</DialogTitle>
                        <DialogDescription>
                            
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="email-1">Email</Label>
                            <Input id="email-1" name="email" placeholder="buckeye.1@osu.edu" type="email" />
                        </div>
                    </div>
                    <hr/>
                    <div className="grid gap-4">
                        <div className="flex flex-row gap-4 items-center">
                            <Image src="" width={32} height={32} alt="Placeholder" className="rounded-full bg-black" />
                            <div className="grid">
                                <span className="font-semibold text-sm">Brutus Buckeye</span>
                                <span className="text-muted-foreground text-xs">buckeye.1@osu.edu</span>
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                        ...
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem>Edit Role</DropdownMenuItem>
                                    <DropdownMenuItem>Remove from Club</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
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
