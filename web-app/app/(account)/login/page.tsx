import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
                    {/* Username Field */}
                    <div className="space-y-2">
                        <Label htmlFor="username" className="text-sm font-medium">
                            Username or Email
                        </Label>
                        <Input
                            id="username"
                            type="text"
                            placeholder="Enter your username or email"
                            className="w-full"
                        />
                    </div>

                    {/* Password Field */}
                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-sm font-medium">
                            Password
                        </Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            className="w-full"
                        />
                    </div>

                    {/* Forgot Password Link */}
                    <div className="flex justify-end">
                        <Link
                            href="/forgot-password"
                            className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                        >
                            Forgot password?
                        </Link>
                    </div>

                    {/* Buttons */}
                    <div className="space-y-3 pt-2">
                        <Button className="w-full" variant="default" size="lg">
                            Sign in
                        </Button>
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
                        <Link href="/register" className="w-full block">
                            <Button className="w-full" variant="outline" size="lg">
                                Create an account
                            </Button>
                        </Link>
                    </div>

                    {/* Debug Mode */}
                    <div className="pt-4 border-t">
                        <Link href="/dashboard" className="w-full block">
                            <Button className="w-full" variant="ghost" size="sm">
                                Debug Mode
                            </Button>
                        </Link>
                        <p className="text-xs text-gray-500 text-center mt-2">
                            Debug Mode lets you view the demo page without logging in.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}