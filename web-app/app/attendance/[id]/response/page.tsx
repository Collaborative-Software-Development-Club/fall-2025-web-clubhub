"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";

import AttendanceCompletionCard from "@/components/attendance/AttendanceCompletionCard";
import AttendanceOtpForm from "@/components/attendance/AttendanceOtpForm";
import AttendanceStatusForm, {
    AttendanceStatusOption,
} from "@/components/attendance/AttendanceStatusForm";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const OTP_LENGTH = 4;

const STATUS_OPTIONS: AttendanceStatusOption[] = [
    { value: "late", label: "Late" },
    { value: "absent", label: "Absent" },
    { value: "excused", label: "Excused" },
];

const AttendanceResponsePage = () => {
    const params = useParams<{ id?: string }>();
    const rawMeetingId = params?.id;
    const meetingId = Array.isArray(rawMeetingId)
        ? rawMeetingId[0]
        : rawMeetingId ?? "";
    const meetingTitle = "Sample Meeting Title";

    const [otp, setOtp] = useState("");
    const [status, setStatus] = useState(STATUS_OPTIONS[0]?.value ?? "");
    const [isSubmittingOtp, setIsSubmittingOtp] = useState(false);
    const [isSubmittingStatus, setIsSubmittingStatus] = useState(false);
    const [hasCompleted, setHasCompleted] = useState(false);

    const otpInputRef = useRef<HTMLDivElement | null>(null);

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

    const submitAttendance = useCallback(
        async (value: string) => {
            if (hasCompleted || value.length !== OTP_LENGTH) {
                return;
            }

            setIsSubmittingOtp(true);

            try {
                console.log("Submitting attendance", {
                    meetingId,
                    otp: value,
                    status: "present",
                });
                setHasCompleted(true);
            } finally {
                setIsSubmittingOtp(false);
            }
        },
        [hasCompleted, meetingId],
    );

    const handleStatusSubmit = useCallback(async () => {
        if (hasCompleted) {
            return;
        }

        setIsSubmittingStatus(true);

        try {
            console.log("Logging status", { meetingId, status });
            setHasCompleted(true);
        } finally {
            setIsSubmittingStatus(false);
        }
    }, [hasCompleted, meetingId, status]);

    return (
        <main className="flex flex-col items-center p-8 w-full max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">{meetingTitle}</h1>

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
                            onOtpComplete={(value) => {
                                setOtp(value);
                                void submitAttendance(value).catch((err) => {
                                    console.error("Error submitting attendance:", err);
                                });
                            }}
                            onSubmit={(value) => submitAttendance(value)}
                            otpLength={OTP_LENGTH}
                            inputRef={otpInputRef}
                            disabled={
                                hasCompleted ||
                                isSubmittingOtp ||
                                isSubmittingStatus
                            }
                        />
                        <Separator />
                        <AttendanceStatusForm
                            status={status}
                            options={STATUS_OPTIONS}
                            onStatusChange={setStatus}
                            onSubmit={handleStatusSubmit}
                            isSubmitting={isSubmittingStatus}
                            disabled={hasCompleted || isSubmittingOtp}
                        />
                    </CardContent>
                </Card>
            )}
        </main>
    );
};

export default AttendanceResponsePage;
