"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

interface EditableMultipleTextProps {
    id: string;
    title: string;
    path: string;
    initialData: Record<string, string>;
}

export default function EditableMultipleText({
    id,
    title,
    path,
    initialData,
}: EditableMultipleTextProps) {
    const [data, setData] = useState(initialData);
    const [editingField, setEditingField] = useState<string | null>(null);

    const startEditing = (field: string) => setEditingField(field);

    const cancelEditing = () => {
        if (editingField !== null) {
            setData((prev) => ({
                ...prev,
                [editingField]: initialData[editingField],
            }));
        }
        setEditingField(null);
    };

    const saveEditing = async (field: string) => {
        console.log("Saving:", { id, path, field, newText: data[field] });
        setEditingField(null);
        // Call API with id and path
    };

    const updateField = (field: string, value: string) => {
        setData((prev) => ({ ...prev, [field]: value }));
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Escape") {
            cancelEditing();
        }
    };

    const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
        const length = e.target.value.length;
        e.target.setSelectionRange(length, length);
    };

    return (
        <div className="flex flex-col w-full px-5 mt-2">
            <h2 className="text-xl font-bold px-2">{title}:</h2>
            <hr className="mt-2 border-gray-400" />
            {Object.entries(data).map(([field, value]) => (
                <div key={field}>
                    {editingField === field ? (
                        <div className="flex flex-col p-2">
                            <label className="text-lg font-semibold capitalize mb-1">
                                {field}:
                            </label>
                            <Textarea
                                value={value}
                                onChange={(e) =>
                                    updateField(field, e.target.value)
                                }
                                onKeyDown={(e) => handleKeyDown(e)}
                                onBlur={() => cancelEditing()}
                                onFocus={handleFocus}
                                autoFocus
                                className="resize-none"
                            />
                            <div className="flex gap-2 pt-2">
                                <Button
                                    onClick={() => saveEditing(field)}
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
                            onClick={() => startEditing(field)}
                            className="p-2 rounded-md cursor-pointer hover:bg-gray-100 transition-colors hover:shadow-sm border border-transparent hover:border-gray-200"
                        >
                            <label className="text-lg font-semibold capitalize cursor-pointer">
                                {field.replace(/([A-Z])/g, " $1").trim()}:
                            </label>
                            <p className="whitespace-pre-wrap min-h-6 mt-1">
                                {value || "Click to edit..."}
                            </p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
