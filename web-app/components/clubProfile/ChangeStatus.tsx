"use client";
import { Button } from "../ui/button";
import { useState } from "react";

interface EditibleStatus {
    initialText: string;
}

export function changeStatus(initialText : string) {
    const [status, changeStatus] = useState(initialText);

    const update = () => {
        let newStatus = prompt("Enter Status:");

        if (newStatus !== null) {
            changeStatus(newStatus);
        }
    }
    

    return (
        <Button
            onClick={update}
            onMouseDown={(e) => e.preventDefault()}
            size="sm"
        >{status || "No Status"}</Button>
    )
}



