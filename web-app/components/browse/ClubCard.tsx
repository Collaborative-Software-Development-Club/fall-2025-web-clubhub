import {
    Card,
    CardTitle,
    CardDescription,
    CardContent,
    CardHeader,
} from "@/components/ui/card";
import { Badge } from "../ui/badge";

export default function ClubCard({
    name,
    interests,
}: {
    name: string;
    interests: string[];
}) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{name}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-row flex-wrap gap-1">
                    {interests.map((i) => (
                        <Badge key={i + name}>{i}</Badge>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
