"use client";

import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { useUser } from "@clerk/nextjs";
import { Calendar, Clock } from "lucide-react";  

import AttendanceCompletionCard from "./AttendanceCompletionCard";
import AttendanceOtpForm from "./AttendanceOtpForm";
import AttendanceStatusForm, {
    AttendanceStatusOption,
} from "./AttendanceStatusForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AttendanceStatus } from "../types";
import { submitAttendanceCode, submitAttendanceStatus } from "../action";

const OTP_LENGTH = 4;

const STATUS_OPTIONS: AttendanceStatusOption<AttendanceStatus>[] = [
    { value: "late", label: "Late" },
    { value: "absent", label: "Absent" },
];

interface AttendanceResponseClientProps {
    meetingId: number;
    meetingTitle: string;
    meetingDescription: string | null;
    meetingDate: string;
    startTime: string;
    endTime: string;
    code: string;
}

const AttendanceResponseClient = ({
    meetingId,
    meetingTitle,
    meetingDescription,
    meetingDate,
    startTime,
    endTime,
    code,
}: AttendanceResponseClientProps) => {
    const { user, isLoaded } = useUser();
    
    const [otp, setOtp] = useState("");
    const [status, setStatus] = useState(STATUS_OPTIONS[0]?.value ?? "");
    const [isSubmittingOtp, setIsSubmittingOtp] = useState(false);
    const [isSubmittingStatus, setIsSubmittingStatus] = useState(false);
    const [hasCompleted, setHasCompleted] = useState(false);
    const [email, setEmail] = useState("");

    const otpInputRef = useRef<HTMLDivElement | null>(null);

    // Prefill email when user loads
    useEffect(() => {
        if (isLoaded && user?.primaryEmailAddress?.emailAddress) {
            setEmail(user.primaryEmailAddress.emailAddress);
        }
    }, [isLoaded, user]);

    const formattedDate = new Date(meetingDate).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const formatTime = (time: string) => {
        const [hours, minutes] = time.split(":");
        const date = new Date();
        date.setHours(parseInt(hours), parseInt(minutes));
        return date.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        });
    };

    useEffect(() => {
        if (hasCompleted) {
            return;
        }

        const focusTimeout = window.setTimeout(() => {
            const inputElement =
                otpInputRef.current?.querySelector<HTMLInputElement>("input");

            inputElement?.focus();
        }, 0);

        return () => window.clearTimeout(focusTimeout);
    }, [hasCompleted]);

    const [isPending, startTransition] = useTransition();

    const handleCodeSubmit = useCallback(async (value: string) => {
            if (hasCompleted || value.length !== OTP_LENGTH) {
                return;
            }

            const submissionEmail = user?.primaryEmailAddress?.emailAddress ?? email;
            const userId = user?.id;

            if (!submissionEmail) {
                return;
            }

            setIsSubmittingOtp(true);

            startTransition(async () => {
                try {
                    const result = await submitAttendanceCode(
                        value,
                        parseInt(code),
                        meetingId,
                        submissionEmail,
                        userId,
                    );

                    if (result.success) {
                        setHasCompleted(true);
                    } else {
                        console.error("Submission failed:", result.error);
                    }
                } catch (err) {
                    console.error("Error submitting attendance:", err);
                } finally {
                    setIsSubmittingOtp(false);
                }
            });
        },
        [hasCompleted, meetingId, code, startTransition, email, user],
    );

    const handleStatusSubmit = useCallback(async () => {
        if (hasCompleted || !email) {
            return;
        }

        if (!email) {
            // TODO: Get user context using cookie to populate user id and email
        }

        setIsSubmittingStatus(true);

        startTransition(async () => {
            try {
                const result = await submitAttendanceStatus(
                    status as AttendanceStatus,
                    meetingId,
                    email
                );

                if (result.success) {
                    setHasCompleted(true);
                } else {
                    console.error("Submission failed:", result.error);
                }
            } catch (err) {
                console.error("Error submitting status:", err);
            } finally {
                setIsSubmittingStatus(false);
            }
        });
    }, [hasCompleted, meetingId, status, email, startTransition]);

    return (
        <main className="flex flex-col items-center p-8 w-full max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">{meetingTitle}</h1>
            
            {/* Meeting Info Section */}
            <div className="flex flex-col items-center gap-1 mb-6 text-muted-foreground">
                {meetingDescription && (
                    <p className="text-center max-w-md">{meetingDescription}</p>
                )}
                <div className="flex items-center gap-4 mt-2 text-sm">
                    <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {formattedDate}
                    </span>
                    <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {formatTime(startTime)} – {formatTime(endTime)}
                    </span>
                </div>
            </div>

            {hasCompleted ? (
                <AttendanceCompletionCard meetingTitle={meetingTitle} />
            ) : (
                <Card className="w-full max-w-md">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-xl font-semibold text-center">
                            Log your attendance
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <AttendanceOtpForm
                            otp={otp}
                            onOtpChange={setOtp}
                            email={email}
                            onEmailChange={setEmail}
                            onSubmit={handleCodeSubmit}
                            otpLength={OTP_LENGTH}
                            inputRef={otpInputRef}
                            disabled={hasCompleted || isSubmittingStatus}
                            isSubmitting={isSubmittingOtp}
                            emailDisabled={isLoaded && !!user}
                        />
                        <Separator />
                        {/* TODO: Only disable due to null email when user is not signed in */}
                        <AttendanceStatusForm
                            status={status}
                            options={STATUS_OPTIONS}
                            onStatusChange={(value) => setStatus(value as AttendanceStatus)}
                            onSubmit={handleStatusSubmit}
                            isSubmitting={isSubmittingStatus}
                            disabled={hasCompleted || isSubmittingOtp || !email}
                        />
                    </CardContent>
                </Card>
            )}
        </main>
    );
};

export default AttendanceResponseClient;
