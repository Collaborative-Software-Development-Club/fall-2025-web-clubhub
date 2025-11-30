import { FormEvent, Ref } from "react";

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";

type AttendanceOtpFormProps = {
    otp: string;
    onOtpChange: (value: string) => void;
    onSubmit: (value: string) => Promise<void> | void;
    otpLength: number;
    inputRef: Ref<HTMLDivElement>;
    disabled?: boolean;
    isSubmitting?: boolean;
};

const AttendanceOtpForm = ({
    otp,
    onOtpChange,
    onSubmit,
    otpLength,
    inputRef,
    disabled = false,
    isSubmitting = false,
}: AttendanceOtpFormProps) => {
    const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (disabled || otp.length !== otpLength) {
            return;
        }
        onSubmit(otp);
    };

    const isComplete = otp.length === otpLength;

    return (
        <form className="space-y-4" onSubmit={handleFormSubmit} aria-busy={disabled ? "true" : "false"}>
            <label htmlFor="attendance-code" className="text-base font-medium">
                Attendance Code
            </label>
            <div ref={inputRef} className="flex flex-col items-center">
                <InputOTP
                    id="attendance-code"
                    value={otp}
                    onChange={onOtpChange}
                    maxLength={otpLength}
                    autoFocus
                    disabled={disabled}
                    className="mx-auto"
                >
                    <InputOTPGroup className="mt-2 mx-auto">
                        {Array.from({ length: otpLength }).map((_, index) => (
                            <InputOTPSlot 
                                key={index} 
                                index={index} 
                                className="h-14 w-14 text-xl first:rounded-none last:rounded-none"
                            />
                        ))}
                    </InputOTPGroup>
                </InputOTP>
            </div>
            <Button 
                type="submit" 
                className="w-full"
                disabled={disabled || !isComplete || isSubmitting}
            >
                {isSubmitting ? "Submitting..." : "Submit Attendance"}
            </Button>
        </form>
    );
};

export default AttendanceOtpForm;
