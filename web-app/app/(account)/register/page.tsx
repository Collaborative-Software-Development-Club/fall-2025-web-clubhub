import React, { use } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import RegisterForm from "./register-form";

export default function RegisterPage(): React.JSX.Element {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center justify-center p-4" suppressHydrationWarning>
            {/* Registration Card */}
            <Card className="w-full max-w-md rounded-2xl shadow-lg">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-semibold text-center">
                        Create an account
                    </CardTitle>
                    <p className="text-sm text-gray-600 text-center">
                        Join ClubHub today
                    </p>
                </CardHeader>
                <CardContent className="space-y-4">
                    <RegisterForm />
                        <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-2 text-gray-500">
                                Or
                            </span>
                        </div>
                    </div>
                    <Link href="/login" className="w-full block">
                        <Button className="w-full" variant="outline" size="lg">
                            Sign in
                        </Button>
                    </Link>
                </CardContent>
            </Card>
        </div>
    );
}