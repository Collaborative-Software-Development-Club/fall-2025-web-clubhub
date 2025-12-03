import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LoginForm from "./login-form";

export default function LoginPage(): React.JSX.Element {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center justify-center p-4" suppressHydrationWarning>
            {/* Login Card */}
            <Card className="w-full max-w-md rounded-2xl shadow-lg">
                <CardHeader className="space-y-1 pb-4">
                    <CardTitle className="text-2xl font-semibold text-center">
                        Sign in
                    </CardTitle>
                    <p className="text-sm text-gray-600 text-center">
                        to continue to ClubHub
                    </p>
                </CardHeader>
                <CardContent className="space-y-4">
                    <LoginForm />
                </CardContent>
            </Card>
        </div>
    );
}