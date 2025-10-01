"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import {
    Card,
    CardTitle,
    CardContent,
    CardHeader,
    CardFooter,
} from "@/components/ui/card";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

const OTP_LENGTH = 4;

const AttendanceResponsePage = () => {
    const [otp, setOtp] = useState("");
    const [status, setStatus] = useState("late");
    const [isLoggingStatus, setIsLoggingStatus] = useState(false);
    const [hasCompleted, setHasCompleted] = useState(false);

    useEffect(() => {
        if (hasCompleted) {
            return;
        }

        const focusTimeout = window.setTimeout(() => {
            document
                .querySelector<HTMLInputElement>("[data-input-otp]")
                ?.focus();
        }, 0);

        return () => window.clearTimeout(focusTimeout);
    }, [hasCompleted]);

    const statusOptions = useMemo(
        () => [
            { value: "late", label: "Late" },
            { value: "absent", label: "Absent" },
            { value: "excused", label: "Excused" },
        ],
        []
    );

    const submitAttendance = useCallback(
        async (value: string) => {
            if (hasCompleted) {
                return;
            }

            if (value.length !== OTP_LENGTH) {
                return;
            }

            setIsLoggingStatus(true);

            try {
                console.log("Submitting attendance", { otp: value, status: "present" });
                setHasCompleted(true);
            } finally {
                setIsLoggingStatus(false);
            }
        },
        [hasCompleted, status]
    );

    const handleFormSubmit = useCallback(
        (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            void submitAttendance(otp);
        },
        [otp, submitAttendance]
    );

    const handleOtpChange = useCallback((value: string) => {
        setOtp(value);
    }, []);

    const handleOtpComplete = useCallback(
        (value: string) => {
            setOtp(value);
            void submitAttendance(value);
        },
        [submitAttendance]
    );

    const handleLogStatus = useCallback(async () => {
        if (hasCompleted) {
            return;
        }

        setIsLoggingStatus(true);

        try {
            console.log("Logging status", { status });
            setHasCompleted(true);
        } finally {
            setIsLoggingStatus(false);
        }
    }, [hasCompleted, status]);

    return (
        <main className="flex flex-col items-center p-8 w-full max-w-3xl mx-auto">
            {hasCompleted ? (
                <Card className="w-full max-w-md text-center">
                    <CardHeader className="flex flex-row items-center justify-center gap-3">
                        <CheckCircle2 className="h-12 w-12 text-emerald-500" aria-hidden />
                        <CardTitle className="text-xl font-semibold">
                            Attendance recorded
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-muted-foreground">
                        Thanks for checking in. You&apos;re all set for this meeting.
                    </CardContent>
                </Card>
            ) : (
                <>
                    <h1 className="text-3xl font-bold mb-8">Meeting Placeholder</h1>

                    <Card className="w-full max-w-md">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-xl font-semibold text-center">
                                Log your attendance
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form
                                className="space-y-6"
                                id="attendance-form"
                                onSubmit={handleFormSubmit}
                            >
                                <div className="space-y-2">
                                    <label
                                        htmlFor="attendance-code"
                                        className="text-base font-medium"
                                    >
                                        Attendance Code
                                    </label>
                                    <InputOTP
                                        id="attendance-code"
                                        value={otp}
                                        onChange={handleOtpChange}
                                        onComplete={handleOtpComplete}
                                        maxLength={OTP_LENGTH}
                                        autoFocus
                                        className="mx-auto"
                                    >
                                        <InputOTPGroup className="mt-2 mx-auto">
                                            {Array.from({ length: OTP_LENGTH }).map((_, index) => (
                                                <InputOTPSlot key={index} index={index} />
                                            ))}
                                        </InputOTPGroup>
                                    </InputOTP>
                                </div>

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
                                        onChange={(event) => setStatus(event.target.value)}
                                    >
                                        {statusOptions.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </form>
                        </CardContent>
                        <CardFooter className="flex flex-col gap-3 pt-0">
                            <Button
                                type="button"
                                className="w-full"
                                disabled={isLoggingStatus || hasCompleted}
                                onClick={() => void handleLogStatus()}
                            >
                                {isLoggingStatus ? "Submitting..." : "Submit"}
                            </Button>
                        </CardFooter>
                    </Card>
                </>
            )}
        </main>
    );
};

export default AttendanceResponsePage;
