"use client";
import { Button } from "../ui/button";
import * as React from "react"
import { JSX, useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu"

interface ChangeStatusProps {
    initialText: string;
}

function ChangeStatus({ initialText }: ChangeStatusProps): JSX.Element {
    const [status, changeStatus] = useState(initialText);
    let buttonStyleActive = "rounded-full bg-green-200 px-3 py-1 w-fit text-sm font-medium text-gray-700";
    let buttonStyleInactive = "rounded-full bg-red-200 px-3 py-1 w-fit text-sm font-medium text-gray-700";
    let buttonStylePending = "rounded-full bg-yellow-200 px-3 py-1 w-fit text-sm font-medium text-gray-700";
    let startState;
    if (initialText === "Pending") {
        startState = buttonStylePending;
    } else if (initialText === "Active") {
        startState = buttonStyleActive;
    } else {
        startState = buttonStyleInactive;
    }

    const [buttonColor, changeButtonColor] = useState(startState);
    
    const updateActive = () => {
        changeStatus("Active");
        changeButtonColor(buttonStyleActive);
    } 
    const updateInactive = () => {
        changeStatus("Inactive");
        changeButtonColor(buttonStyleInactive);
    }
    const updatePending = () => {
        changeStatus("Pending");
        changeButtonColor(buttonStylePending);
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className={buttonColor}>
                    {status}
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-fit"  align="start">
                <DropdownMenuItem>
                    <Button onClick={updateActive} variant="link" className={buttonStyleActive}>
                        Active
                    </Button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Button onClick={updateInactive} variant="link" className={buttonStyleInactive}>
                        Inactive
                    </Button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Button onClick={updatePending} variant="link" className={buttonStylePending}>
                        Pending
                    </Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export {ChangeStatus};