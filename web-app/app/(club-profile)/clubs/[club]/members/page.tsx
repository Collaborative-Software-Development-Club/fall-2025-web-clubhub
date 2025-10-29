import clubs from "@/mock/clubs.json";
import { Table, TableBody, TableCaption, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import Image from "next/image";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Edit, Info, MoreHorizontal, Trash2 } from "lucide-react";
import { AddUserDialog, AddUserType } from "@/components/club-profile/AddUserDialog";


export default async function MembersPage({
    params,
}: {
    params: { club: string };
}) {
    const clubId = params.club; // Dynamic route param(used for later fetching)
    const clubData = clubs[0]; // Mock data for now

    return (
        <>
            <h1 className="text-3xl font-bold mb-4">Members of CLUBNAME</h1>
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold">Leaders</h2>
                <Button className="m-1" variant="default">+ Add Leader</Button>
                <AddUserDialog addUserType={AddUserType.Leader} />
            </div>
            <div className="mb-6 rounded-lg border overflow-hidden">
            <Table>
                <TableHeader>
                    <TableRow className="bg-muted font-bold px-2">
                        <TableCell className="w-14"></TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Role</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell className="text-right w-24">Actions</TableCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow className="">
                        <TableCell className="font-medium">
                            <Image
                                src="/placeholder-profile-picture.jpg"
                                alt="Profile Picture"
                                className="w-10 h-10 rounded-full mr-2 inline-block"
                                width={40}
                                height={40}
                            />
                        </TableCell>
                        <TableCell>
                            <b>Ted Carter</b>
                        </TableCell>
                        <TableCell>President</TableCell>
                        <TableCell>president@osu.edu</TableCell>
                        <TableCell className="text-center">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        className="cursor-pointer"
                                        variant="ghost"
                                        size="icon"
                                    >
                                        <MoreHorizontal className="w-4 h-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem
                                        className="cursor-pointer"
                                    >
                                        <Edit className="w-4 h-4 mr-2" />
                                        Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        className="cursor-pointer"
                                    >
                                        <Trash2 className="w-4 h-4 mr-2" />
                                        Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
                
            </div>
            <h2 className="text-xl font-semibold">Advisors</h2>
            <h2 className="text-xl font-semibold">Members</h2>
            <span className="inline-flex items-center bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full mr-2 mb-2 align-middle">
                <Info className="w-4 h-4 mr-1 text-blue-500" />
                Only visible to club leaders
            </span>
        </>
    );
}
