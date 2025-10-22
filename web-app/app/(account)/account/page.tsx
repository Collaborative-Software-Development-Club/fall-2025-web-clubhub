import { Card, CardContent } from "@/components/ui/card";
import ProfileForm from "./profile-form";

export default function AccountPage() {
    return (
        <div className="p-8">
            <Card className="max-w-md mx-auto">
                <CardContent>
                    <h1 className="text-2xl font-bold mb-4">
                        Account Settings
                    </h1>
                    <ProfileForm />
                </CardContent>
            </Card>
        </div>
    );
}
