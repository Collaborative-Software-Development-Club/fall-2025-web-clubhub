import { FormEvent } from "react";

import { Button } from "@/components/ui/button";

export type AttendanceStatusOption = {
    value: string;
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
        <form className="space-y-3" onSubmit={handleSubmit} aria-busy={isSubmitting ? "true" : "false"}>
            <div className="space-y-2">
                <label
                    htmlFor="attendance-status"
                    className="text-base font-medium"
                >
                    Not attending? Log your status
                </label>
                <select
                    id="attendance-status"
                    className="w-full mt-2 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    value={status}
                    onChange={(event) => onStatusChange(event.target.value)}
                    disabled={disabled}
                >
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>

            <Button
                type="submit"
                className="w-full"
                variant="secondary"
                disabled={disabled || isSubmitting}
            >
                {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
        </form>
    );
};

export default AttendanceStatusForm;
