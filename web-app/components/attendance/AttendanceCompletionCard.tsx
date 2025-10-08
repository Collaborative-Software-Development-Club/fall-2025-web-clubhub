import { CheckCircle2 } from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

type AttendanceCompletionCardProps = {
    meetingTitle?: string;
};

const AttendanceCompletionCard = ({
    meetingTitle = "this meeting",
}: AttendanceCompletionCardProps) => {
    return (
        <Card className="w-full max-w-md text-center">
            <CardHeader className="flex flex-row items-center justify-center gap-3">
                <CheckCircle2 className="h-12 w-12 text-emerald-500" aria-hidden />
                <CardTitle className="text-xl font-semibold">
                    Attendance recorded
                </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
                Thanks for checking in. You&apos;re all set for {meetingTitle}.
            </CardContent>
        </Card>
    );
};

export default AttendanceCompletionCard;
