"use client";
import { useCallback, useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import DisplayMultipleText from "./DisplayMultipleText";

interface Props {
    title: string;
    handleSave: (data: string) => Promise<void>;
    handleDelete: () => Promise<void>;
    initialText: string;
}

export default function EditableMultipleText({
    title,
    handleSave,
    handleDelete,
    initialText,
}: Props) {
    const [text, setText] = useState(initialText);
    const [isEditing, setIsEditing] = useState(false);

    const startEditing = useCallback(() => setIsEditing(true), []);

    const cancelEditing = useCallback(() => {
        setText(initialText);
        setIsEditing(false);
    }, [initialText]);

    const saveEditing = useCallback(async () => {
        setIsEditing(false);
        await handleSave(text);
    }, [handleSave, text]);

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
            if (e.key === "Escape") cancelEditing();
        },
        [cancelEditing],
    );

    const handleFocus = useCallback(
        (e: React.FocusEvent<HTMLTextAreaElement>) => {
            const length = e.target.value.length;
            e.target.setSelectionRange(length, length);
        },
        [],
    );

    return (
        <div className="flex flex-col w-full">
            {isEditing ? (
                <div className="flex flex-col gap-2 px-2">
                    <label className="text-md font-semibold capitalize">
                        {title}:
                    </label>
                    <Textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onKeyDown={handleKeyDown}
                        onBlur={cancelEditing}
                        onFocus={handleFocus}
                        autoFocus
                        className="resize-none"
                    />

                    <div className="flex gap-2 pt-2">
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
                            onClick={() =>
                                handleDelete().catch((err) =>
                                    console.error(err),
                                )
                            }
                            onMouseDown={(e) => e.preventDefault()}
                            variant="destructive"
                            size="sm"
                        >
                            Remove
                        </Button>
                    </div>
                </div>
            ) : (
                <div
                    className="flex items-center rounded-md cursor-pointer hover:bg-gray-100 transition-colors min-h-9 whitespace-pre-wrap hover:shadow-sm"
                    onClick={startEditing}
                >
                    <DisplayMultipleText title={title} text={text} />
                </div>
            )}
        </div>
    );
}
