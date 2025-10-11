"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

interface EditableTextProps {
    id: string;
    title: string;
    path: string;
    initialText: string;
}

export default function EditableText({
    id,
    title,
    path,
    initialText,
}: EditableTextProps) {
    const [text, setText] = useState(initialText);
    const [isEditing, setIsEditing] = useState(false);

    const startEditing = () => setIsEditing(true);
    const cancelEditing = () => {
        setText(initialText);
        setIsEditing(false);
    };

    const saveEditing = async () => {
        console.log("Saving:", { id, path, newText: text });
        setIsEditing(false);
        // Call your API to save the text here
        // await fetch("/api/updateField", { method: "POST", body: JSON.stringify({ id, path, text }) });
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Escape") cancelEditing();
    };

    const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
        const length = e.target.value.length;
        e.target.setSelectionRange(length, length); // Move cursor to the end
    };

    return (
        <div className="flex flex-col w-full px-5">
            {isEditing ? (
                <div className="flex flex-col gap-2">
                    <label className="text-xl font-bold px-2">{title}:</label>
                    <hr className="border-gray-400" />
                    <Textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onKeyDown={handleKeyDown}
                        onBlur={cancelEditing}
                        onFocus={handleFocus}
                        autoFocus
                        className="resize-none"
                    />
                    <div className="flex gap-2">
                        <Button
                            onClick={saveEditing}
                            onMouseDown={(e) => e.preventDefault()}
                            size="sm"
                        >
                            Save
                        </Button>
                        <Button
                            onClick={cancelEditing}
                            onMouseDown={(e) => e.preventDefault()}
                            variant="outline"
                            size="sm"
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            ) : (
                <div
                    onClick={startEditing}
                    className="rounded-md cursor-pointer hover:bg-gray-100 transition-colors min-h-14 whitespace-pre-wrap hover:shadow-sm py-2"
                >
                    <label className="text-xl font-bold px-2">{title}:</label>
                    <hr className="mt-2 border-gray-400" />
                    <p className="p-2 min-h-10 whitespace-pre-wrap">
                        {text || "Click to edit..."}
                    </p>
                </div>
            )}
        </div>
    );
}
