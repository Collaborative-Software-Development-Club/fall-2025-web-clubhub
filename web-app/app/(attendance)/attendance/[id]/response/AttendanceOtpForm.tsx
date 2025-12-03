import { FormEvent, Ref } from "react";

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type AttendanceOtpFormProps = {
    otp: string;
    onOtpChange: (value: string) => void;
    email: string;
    onEmailChange: (value: string) => void;
    onSubmit: (otp: string, email: string) => Promise<void> | void;
    otpLength: number;
    inputRef: Ref<HTMLDivElement>;
    disabled?: boolean;
    isSubmitting?: boolean;
};

const AttendanceOtpForm = ({
    otp,
    onOtpChange,
    email,
    onEmailChange,
    onSubmit,
    otpLength,
    inputRef,
    disabled = false,
    isSubmitting = false,
}: AttendanceOtpFormProps) => {
    const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (disabled || otp.length !== otpLength || !email) {
            return;
        }
        onSubmit(otp, email);
    };

    const isComplete = otp.length === otpLength && email.length > 0;

    return (
        <form className="space-y-4" onSubmit={handleFormSubmit} aria-busy={disabled ? "true" : "false"}>
            <div className="space-y-2">
                <Label htmlFor="email">
                    Email address
                    <span className="text-muted-foreground text-sm font-normal ml-1">
                        (required if not signed in)
                    </span>
                </Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => onEmailChange(e.target.value)}
                    disabled={disabled || isSubmitting}
                />
            </div>
            
            <div className="space-y-2">
                <Label htmlFor="attendance-code">
                    Attendance Code
                </Label>
                <div ref={inputRef} className="flex flex-col items-center">
                    <InputOTP
                        id="attendance-code"
                        value={otp}
                        onChange={onOtpChange}
                        maxLength={otpLength}
                        autoFocus
                        disabled={disabled || isSubmitting}
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
