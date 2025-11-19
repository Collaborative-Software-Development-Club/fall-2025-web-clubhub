import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RegisterPage(): React.JSX.Element {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center justify-center p-4" suppressHydrationWarning>
            {/* Registration Card */}
            <Card className="w-full max-w-md rounded-2xl shadow-lg">
                <CardHeader className="space-y-1 pb-4">
                    <CardTitle className="text-2xl font-semibold text-center">
                        Create account
                    </CardTitle>
                    <p className="text-sm text-gray-600 text-center">
                        join ClubHub today
                    </p>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Full Name Field */}
                    <div className="space-y-2">
                        <Label htmlFor="fullname" className="text-sm font-medium">
                            Full Name
                        </Label>
                        <Input
                            id="fullname"
                            type="text"
                            placeholder="Enter your full name"
                            className="w-full"
                        />
                    </div>

                    {/* Email Field */}
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium">
                            Email
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="lastname.number@osu.edu"
                            className="w-full"
                        />
                    </div>

                    {/* Username Field */}
                    <div className="space-y-2">
                        <Label htmlFor="username" className="text-sm font-medium">
                            Username
                        </Label>
                        <Input
                            id="username"
                            type="text"
                            placeholder="Choose a username"
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
                            placeholder="Create a password"
                            className="w-full"
                        />
                    </div>

                    {/* Confirm Password Field */}
                    <div className="space-y-2">
                        <Label htmlFor="confirm-password" className="text-sm font-medium">
                            Confirm Password
                        </Label>
                        <Input
                            id="confirm-password"
                            type="password"
                            placeholder="Confirm your password"
                            className="w-full"
                        />
                    </div>

                    {/* Terms Agreement */}
                    <div className="flex items-start space-x-2 pt-2">
                        <input
                            id="terms"
                            type="checkbox"
                            className="mt-1"
                        />
                        <label htmlFor="terms" className="text-xs text-gray-600">
                            I agree to the{" "}
                            <Link href="/terms" className="text-blue-600 hover:text-blue-800 hover:underline">
                                Terms of Service
                            </Link>
                            {" "}and{" "}
                            <Link href="/privacy" className="text-blue-600 hover:text-blue-800 hover:underline">
                                Privacy Policy
                            </Link>
                        </label>
                    </div>

                    {/* Buttons */}
                    <div className="space-y-3 pt-2">
                        <Button className="w-full" variant="default" size="lg">
                            Create account
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
                        <Link href="/login" className="w-full block">
                            <Button className="w-full" variant="outline" size="lg">
                                Sign in to existing account
                            </Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}