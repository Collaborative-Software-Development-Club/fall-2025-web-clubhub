import { FormEvent } from "react";

import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export type AttendanceStatusOption<T extends string = string> = {
    value: T;
    label: string;
};

type AttendanceStatusFormProps = {
    status: string;
    options: AttendanceStatusOption[];
    onStatusChange: (value: string) => void;
    onSubmit: () => Promise<void> | void;
    isSubmitting?: boolean;
    disabled?: boolean;
};

const AttendanceStatusForm = ({
    status,
    options,
    onStatusChange,
    onSubmit,
    isSubmitting = false,
    disabled = false,
}: AttendanceStatusFormProps) => {
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (disabled || isSubmitting) {
            return;
        }
        onSubmit();
    };

    return (
        <form
            className="space-y-4"
            onSubmit={handleSubmit}
            aria-busy={isSubmitting ? "true" : "false"}
        >
            <div className="space-y-2">
                <Label htmlFor="attendance-status" className="text-base font-medium">
                    Not attending? Log your status
                </Label>
                <Select
                    value={status}
                    onValueChange={onStatusChange}
                >
                    <SelectTrigger id="attendance-status" className="w-full">
                        <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                    <SelectContent>
                        {options.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <Button
                type="submit"
                className="w-full"
                variant="default"
                disabled={disabled || isSubmitting}
            >
                {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
        </form>
    );
};

export default AttendanceStatusForm;
