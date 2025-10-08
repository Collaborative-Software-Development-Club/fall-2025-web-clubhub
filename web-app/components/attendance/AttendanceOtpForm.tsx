import { FormEvent, Ref } from "react";

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";

type AttendanceOtpFormProps = {
    otp: string;
    onOtpChange: (value: string) => void;
    onOtpComplete: (value: string) => void;
    onSubmit: (value: string) => Promise<void> | void;
    otpLength: number;
    inputRef: Ref<HTMLDivElement>;
    disabled?: boolean;
};

const AttendanceOtpForm = ({
    otp,
    onOtpChange,
    onOtpComplete,
    onSubmit,
    otpLength,
    inputRef,
    disabled = false,
}: AttendanceOtpFormProps) => {
    const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (disabled) {
            return;
        }
        onSubmit(otp);
    };

    return (
        <form className="space-y-2" onSubmit={handleFormSubmit} aria-busy={disabled}>
            <label htmlFor="attendance-code" className="text-base font-medium">
                Attendance Code
            </label>
            <div ref={inputRef} className="flex flex-col items-center">
                <InputOTP
                    id="attendance-code"
                    value={otp}
                    onChange={onOtpChange}
                    onComplete={onOtpComplete}
                    maxLength={otpLength}
                    autoFocus
                    disabled={disabled}
                    className="mx-auto"
                >
                    <InputOTPGroup className="mt-2 mx-auto">
                        {Array.from({ length: otpLength }).map((_, index) => (
                            <InputOTPSlot key={index} index={index} />
                        ))}
                    </InputOTPGroup>
                </InputOTP>
            </div>
        </form>
    );
};

export default AttendanceOtpForm;
