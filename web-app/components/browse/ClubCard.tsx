import { 
    Card, 
    CardTitle, 
    CardDescription 
} from "@/components/ui/card";

export default function ClubCard({
    name,
    interests,
}: {
    name: string;
    interests: string[];
}) {
  return (
    <Card className="p-4 border rounded shadow-sm">
      <CardTitle>{name}</CardTitle>
      <CardDescription>Interests: {interests.join(", ")}</CardDescription>
    </Card>
  );
}