import {
    Card,
    CardTitle,
    CardDescription,
    CardContent,
    CardHeader,
} from "@/components/ui/card";
import { Badge } from "../../../components/ui/badge";

export default function ClubCard({
    name,
    description,
    interests,
    leader,
    contact,
}: {
    name: string;
    description: string;
    interests: string[];
    leader?: string; // optional
    contact?: string;
}) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{name}</CardTitle>
                <CardDescription className="line-clamp-3">
                    {description}
                </CardDescription>
            </CardHeader>

            <CardContent>
                <div className="flex flex-row flex-wrap gap-1">
                    {interests.map((i) => (
                        <Badge key={i + name}>{i}</Badge>
                    ))}
                </div>

                {leader && (
                    <p className="text-sm font-medium">Leader: {leader}</p>
                )}
                {contact && (
                    <p className="text-sm text-muted-foreground">
                        Contact:{" "}
                        <a href={`mailto:${contact}`} className="underline">
                            {contact}
                        </a>
                    </p>
                )}
            </CardContent>
        </Card>
    );
}
