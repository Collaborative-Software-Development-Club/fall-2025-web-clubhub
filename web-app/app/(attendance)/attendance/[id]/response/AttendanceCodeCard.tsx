import { Card, CardTitle, CardContent, CardAction } from "@/components/ui/card";

export default function AttendanceCodeCard({
    code,
    meetingDate,
}: {
    code: string;
    meetingDate: Date;
}) {
    return (
        <Card className="flex flex-col md:flex-row items-center gap-8 shadow-md rounded-2xl p-8 mb-14">
            <CardContent className="text-center">
                <CardTitle className="text-lg mb-2">
                    {meetingDate.toLocaleDateString()}
                </CardTitle>
                <p className="text-5xl font-mono font-bold tracking-widest text-blue-600">
                    {code}
                </p>
            </CardContent>

            <CardAction className="shrink-0">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/500px-QR_code_for_mobile_English_Wikipedia.svg.png"
                    alt="QR Code"
                    width={200}
                    height={200}
                />
            </CardAction>
        </Card>
    );
}
