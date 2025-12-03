import { Card, CardTitle, CardContent, CardAction } from "@/components/ui/card";
import Link from "next/link";

interface AttendanceCodeCardProps {
    code: string;
    meetingId: number;
    meetingDate: Date;
    meetingTitle: string;
    meetingDescription: string | null;
}

export default function AttendanceCodeCard({
    code,
    meetingId,
    meetingDate,
    meetingTitle,
    meetingDescription,
}: AttendanceCodeCardProps) {
    return (
        <Card className="flex flex-col md:flex-row items-center gap-8 shadow-md rounded-2xl p-8 mb-14">
            <CardContent className="text-center">
                <CardTitle className="text-lg mb-2">{meetingTitle}</CardTitle>
                {meetingDescription && (
                    <p className="text-gray-500 text-sm mb-4">{meetingDescription}</p>
                )}
                <p className="text-sm mb-2">
                    {meetingDate.toLocaleDateString()}
                </p>
                <p className="text-5xl font-mono font-bold tracking-widest text-blue-600">
                    {code}
                </p>
            </CardContent>

            <Link href={`/attendance/${meetingId}/response`}>
                <CardAction className="shrink-0">
                    {/* TODO: Replace with dynamically generated QR code for the attendance URL */}
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/500px-QR_code_for_mobile_English_Wikipedia.svg.png"
                        alt="QR Code"
                        width={200}
                        height={200}
                    />
                </CardAction>
            </Link>
        </Card>
    );
}
