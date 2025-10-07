import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";

interface DialogInputProps {
    index: number;
    value: string;
    errors: boolean[];
    tempList: string[];
    setTempList: (list: string[]) => void;
    setErrors: (errors: boolean[]) => void;
    setGeneralError: (error: string) => void;
    isEmail: boolean;
}

export default function DialogInput({
    index,
    value,
    errors,
    tempList,
    setTempList,
    setErrors,
    setGeneralError,
    isEmail,
}: DialogInputProps) {
    const hasError = errors[index];
    const inputId = `input-${index}`;

    const handleInputChange = (newValue: string) => {
        const updatedList = [...tempList];
        updatedList[index] = newValue;
        setTempList(updatedList);
        
        if (hasError) {
            clearFieldError();
        }
    };

    const clearFieldError = () => {
        const updatedErrors = [...errors];
        updatedErrors[index] = false;
        setErrors(updatedErrors);

        if (!updatedErrors.some((error) => error)) {
            setGeneralError("");
        }
    };

    const handleDelete = () => {
        if (isEmail) {
            handleEmailDelete();
        } else {
            handleNonEmailDelete();
        }
    };

    const handleEmailDelete = () => {
        const filteredList = tempList.filter((_, i) => i !== index);
        const filteredErrors = errors.filter((_, i) => i !== index);

        setTempList(filteredList);
        setErrors(filteredErrors);
    };

    const handleNonEmailDelete = () => {
        const updatedList = [...tempList];
        updatedList[index] = "";
        setTempList(updatedList);

        if (hasError) {
            clearFieldError();
        }
    };

    const inputClassName = hasError
        ? "border-red-500 focus:border-red-500"
        : "";

    return (
        <div className="flex flex-row gap-1 group">
            <Input
                id={inputId}
                name={inputId}
                value={value || ""}
                className={inputClassName}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder={isEmail ? "Enter email address" : "Enter URL"}
            />
            <Button
                type="button"
                variant="ghost"
                size="icon"
                className="hidden group-hover:flex transition-all duration-100 hover:bg-red-50 hover:text-red-600"
                onClick={handleDelete}
                aria-label={`Delete ${isEmail ? "email" : "link"} ${index + 1}`}
            >
                <Trash2 className="h-4 w-4" />
            </Button>
        </div>
    );
}
