"use client";
import { Button } from "../ui/button";
import { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";

interface ChangeStatusProps {
    initialText: string;
}

export default function ChangeStatus({ initialText }: ChangeStatusProps) {
    const [status, changeStatus] = useState(initialText);
    const buttonStyleActive =
        "cursor-pointer bg-green-200 px-3 py-1 w-20 text-sm font-medium text-gray-700 hover:bg-green-100";
    const buttonStyleInactive =
        "cursor-pointer bg-red-200 px-3 py-1 w-20 text-sm font-medium text-gray-700 hover:bg-red-100";
    const buttonStylePending =
        "cursor-pointer bg-yellow-200 px-3 py-1 w-20 text-sm font-medium text-gray-700 hover:bg-yellow-100";
    let startState =
        initialText === "Pending"
            ? buttonStylePending
            : initialText === "Active"
            ? buttonStyleActive
            : buttonStyleInactive;
    startState = buttonStyleInactive;

    const [buttonColor, changeButtonColor] = useState(startState);

    const updateActive = () => {
        changeStatus("Active");
        changeButtonColor(buttonStyleActive);
    };
    const updateInactive = () => {
        changeStatus("Inactive");
        changeButtonColor(buttonStyleInactive);
    };
    const updatePending = () => {
        changeStatus("Pending");
        changeButtonColor(buttonStylePending);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className={buttonColor}>{status}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="center"
                className="w-[--radix-popover-trigger-width] min-w-0 bg-transparent shadow-none border-none"
            >
                <DropdownMenuItem>
                    <Button
                        onClick={updateActive}
                        className={buttonStyleActive}
                    >
                        Active
                    </Button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Button
                        onClick={updateInactive}
                        className={buttonStyleInactive}
                    >
                        Inactive
                    </Button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Button
                        onClick={updatePending}
                        className={buttonStylePending}
                    >
                        Pending
                    </Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
