"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import DisplayText from "./DisplayText";

interface EditableTextProps {
    title: string;
    handleSave: (data: string) => Promise<void>;
    handleDelete: () => Promise<void>;
    initialText: string;
}

export default function EditableText({
    title,
    handleSave,
    handleDelete,
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
        setIsEditing(false);
        await handleSave(text);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Escape") cancelEditing();
    };

    const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
        const length = e.target.value.length;
        e.target.setSelectionRange(length, length);
    };

    return (
        <div className="flex flex-col w-full">
            {isEditing ? (
                <div className="flex flex-col gap-2 mx-5">
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
                        <Button
                            onClick={() => {
                                handleDelete();
                            }}
                            onMouseDown={(e) => e.preventDefault()}
                            size="sm"
                        >
                            Remove
                        </Button>
                    </div>
                </div>
            ) : (
                <div
                    className="rounded-md cursor-pointer hover:bg-gray-100 transition-colors min-h-14 whitespace-pre-wrap hover:shadow-sm my-2"
                    onClick={startEditing}
                >
                    <DisplayText
                        title={title}
                        text={text}
                        placeholder="Click to edit..."
                    />
                </div>
            )}
        </div>
    );
}
