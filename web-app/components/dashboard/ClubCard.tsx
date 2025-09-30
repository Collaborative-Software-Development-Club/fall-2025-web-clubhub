import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardAction,
} from "@/components/ui/card";
import { strict } from "assert";
import { Bold } from "lucide-react";
import Image from "next/image";

export default function ClubCard(
    {clubName, imageSrc, meetingTime}:
    {clubName: string, imageSrc: string, meetingTime: string}
) {
    return (<Card className="flex flex-col md:flex-row items-center gap-8 shadow-md rounded-2xl p-4 mb-14">
        <CardContent>
            <CardTitle className="text-lg mb-2">
                {clubName}
            </CardTitle>
            <Image src={imageSrc} alt="Club Image" height={100} width={100}></Image>
            Next Meeting: {meetingTime}
        </CardContent>
    </Card>)
}