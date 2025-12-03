"use client";

import { useState } from "react";
import {
    useClubDescription,
    useDeleteClubDescription,
    useUpdateClubDescription,
    useCreateClubDescription,
} from "@/services/club-profile/clubs-hooks/useClubProfileData";
import EditableText from "./EditableText";
import DisplayText from "./DisplayText";
import { Button } from "../ui/button";

interface PurposeClientProps {
    purposeStatement: string;
    isLeader: boolean;
    clubId: number;
}

export default function PurposeClient({
    purposeStatement,
    isLeader,
    clubId,
}: PurposeClientProps) {
    const [isCreating, setIsCreating] = useState(false);

    // React Query hooks
    const { data, isLoading, error } = useClubDescription(clubId);
    const deleteClubDescription = useDeleteClubDescription();
    const updateClubDescription = useUpdateClubDescription();
    const createClubDescription = useCreateClubDescription();

    // Computed values
    const hasClubDescription = Boolean(data?.description);

    // Loading and error states
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading club description.</div>;
    }

    // Event handlers
    const handleDelete = async () => {
        try {
            if (isCreating) {
                setIsCreating(false);
                return;
            }
            await deleteClubDescription.mutateAsync(clubId);
        } catch (error) {
            console.error("Failed to delete club description:", error);
        }
    };

    const handleSave = async (description: string) => {
        if (!description.trim()) {
            return;
        }

        try {
            if (isCreating) {
                await createClubDescription.mutateAsync({
                    clubId,
                    description,
                });
                setIsCreating(false);
            } else {
                await updateClubDescription.mutateAsync({
                    clubId,
                    description,
                });
            }
        } catch (error) {
            console.error("Failed to save club description:", error);
        }
    };

    const handleStartCreating = () => {
        setIsCreating(true);
    };

    // Render helpers
    const renderEditableDescription = () => (
        <EditableText
            title="Club Description"
            handleSave={(text) => handleSave(text)}
            handleDelete={handleDelete}
            initialText={data?.description || ""}
        />
    );

    const renderDisplayDescription = () => (
        <DisplayText
            title="Club Description"
            text={data?.description || ""}
            placeholder="No information provided"
        />
    );

    const renderPurposeWithReplaceButton = () => (
        <div className="relative">
            {isLeader && (
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="text-blue-500 hover:text-blue-700 absolute right-5"
                    onClick={handleStartCreating}
                >
                    Replace
                </Button>
            )}
            <DisplayText
                title="Purpose Statement"
                text={purposeStatement}
                placeholder="No information provided"
            />
        </div>
    );

    return (
        <div className="w-full">
            {hasClubDescription ? (
                isLeader ? (
                    <div className="relative">
                        {renderEditableDescription()}
                    </div>
                ) : (
                    renderDisplayDescription()
                )
            ) : isCreating ? (
                renderEditableDescription()
            ) : (
                renderPurposeWithReplaceButton()
            )}
        </div>
    );
}
