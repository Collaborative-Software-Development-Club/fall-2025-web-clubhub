"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { ClerkAPIError } from "@clerk/types";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function RegisterForm() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [verifying, setVerifying] = useState(false);
    const [code, setCode] = useState('');
    const { isLoaded, signUp, setActive } = useSignUp();
    const router = useRouter();
    const [errors, setErrors] = useState<ClerkAPIError[]>()

    const handleChange = (name: string, value: string) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle the submission of the verification form
    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!isLoaded) return <div>Loading...</div>

        // Use the code the user provided to attempt verification
        try {
            const signUpAttempt = await signUp.attemptEmailAddressVerification({code,})

            // If verification was completed, set the session to active
            // and redirect the user
            if (signUpAttempt.status === 'complete') {
                await setActive({
                session: signUpAttempt.createdSessionId,
                navigate: async ({ session }) => {
                    if (session?.currentTask) {
                        // Check for session tasks and navigate to custom UI to help users resolve them
                        // See https://clerk.com/docs/guides/development/custom-flows/overview#session-tasks
                        console.log(session?.currentTask)
                        router.push('/sign-up/tasks')
                        return
                    }

                    router.push('/dashboard')
                },
                })
            } else {
                // If the status is not complete, check why. User may need to
                // complete further steps.
                console.error('Sign-up attempt not complete:', signUpAttempt)
                console.error('Sign-up attempt status:', signUpAttempt.status)
            }
        } catch (err: any) {
        // See https://clerk.com/docs/guides/development/custom-flows/error-handling
        // for more info on error handling
        console.error(JSON.stringify(err, null, 2))
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Clear any errors that may have occurred during previous form submission
        setErrors(undefined)

        if (!isLoaded) {
            return;
        }

        try {
            // Clerk's signUp.create expects arrays for some identifiers (like emailAddress)
            const createParams: any = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                password: formData.password,
            };

            // use email as primary identifier
            if (formData.email) {
                createParams.emailAddress = [formData.email];
            }

            // Create the user in Clerk
            const result = await signUp.create(createParams);

            console.log("Clerk signUp result:", result);

            // Send the user an email with the verification code
            await signUp.prepareEmailAddressVerification({
                strategy: 'email_code',
            })

            // Set 'verifying' true to display second form
            // and capture the code
            setVerifying(true)
        } catch (err: any) {
            if (isClerkAPIResponseError(err)) setErrors(err.errors)
            console.error(JSON.stringify(err, null, 2))
        }
    }

    // Display the verification form to capture the code
    if (verifying) {
        return (
        <>
            <div className="space-y-4">
                <h1 className="text-2xl font-semibold">Verify your email</h1>
                <p className="text-sm text-gray-600">Enter the verification code sent to {formData.email}</p>

                <form onSubmit={handleVerify} className="space-y-4">
                    <div className="space-y-2">
                        <Input
                            id="code"
                            name="code"
                            placeholder="Code..."
                            className="w-full"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            required
                        />
                    </div>

                    <div className="flex items-center space-x-3">
                        <Button type="submit" className="flex-1" size="lg">
                            Verify
                        </Button>
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => setVerifying(false)}
                        >
                            Edit Info
                        </Button>
                    </div>

                    <div className="text-sm text-gray-600">
                        Didn't receive a code?{" "}
                        <button
                            type="button"
                            className="text-blue-600 hover:underline"
                            onClick={async () => {
                                if (!isLoaded || !signUp) {
                                    alert("Authentication system is not ready. Please try again.");
                                    return;
                                }
                                try {
                                    await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
                                    alert("Verification code resent.");
                                } catch (err) {
                                    console.error(err);
                                    alert("Failed to resend verification code.");
                                }
                            }}
                        >
                            Resend
                        </button>
                    </div>
                </form>
            </div>
        </>
        )
    }

    return <form onSubmit={handleSubmit} className="space-y-6">
        {/* Display errors if any occurred during submission */}
        {errors && (
            <div>
                <Alert variant="destructive" className="w-full">
                    <AlertTitle>Unable to create account</AlertTitle>
                    <AlertDescription>
                        <ul className="list-disc pl-5 space-y-1 text-sm">
                            {errors.map((el, index) => (
                                <li key={index}>
                                    {el.longMessage ?? el.message ?? el?.code ?? "An unknown error occurred"}
                                </li>
                            ))}
                        </ul>
                    </AlertDescription>
                </Alert>
            </div>
        )}
        {/* First Name Field */}
            <div className="space-y-2">
                <Label htmlFor="firstname" className="text-sm font-medium">
                    First Name
                </Label>
                <Input
                    id="firstname"
                    type="text"
                    placeholder="Enter your first name"
                    className="w-full"
                    value={formData.firstName}
                    onChange={(e) => handleChange("firstName", e.target.value)}
                    required
                />
            </div>
            
            {/* Last Name Field */}
            <div className="space-y-2">
                <Label htmlFor="lastname" className="text-sm font-medium">
                    Last Name
                </Label>
                <Input
                    id="lastname"
                    type="text"
                    placeholder="Enter your last name"
                    className="w-full"
                    value={formData.lastName}
                    onChange={(e) => handleChange("lastName", e.target.value)}
                    required
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
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    required
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
                    value={formData.password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const val = e.target.value;
                        handleChange("password", val);
                        // keep the confirm input's validity in sync when the password changes
                        const confirmEl = document.getElementById("confirm-password") as HTMLInputElement | null;
                        if (confirmEl) {
                            if (confirmEl.value && confirmEl.value !== val) {
                                confirmEl.setCustomValidity("Passwords do not match");
                            } else {
                                confirmEl.setCustomValidity("");
                            }
                        }
                    }}
                    required
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
                    value={formData.confirmPassword}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const val = e.target.value;
                        handleChange("confirmPassword", val);
                        const input = e.target as HTMLInputElement;
                        if (formData.password && val !== formData.password) {
                            input.setCustomValidity("Passwords do not match");
                        } else {
                            input.setCustomValidity("");
                        }
                    }}
                    required
                />
                {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                    <p className="text-xs text-red-600">Passwords do not match</p>
                )}
            </div>

            {/* Clerk required CAPTCHA Placeholder */}
            <div id="clerk-captcha" data-cl-size="flexible"/>

            {/* Terms Agreement */}
            <div className="flex items-start space-x-2 pt-2">
                <Checkbox id="terms" className="mt-1" />
                <Label htmlFor="terms" className="text-xs text-gray-600">
                    I agree to the{" "}
                    <Link href="/terms" className="text-blue-600 hover:text-blue-800 hover:underline">
                        Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-blue-600 hover:text-blue-800 hover:underline">
                        Privacy Policy
                    </Link>
                </Label>
            </div>

            {/* Buttons */}
            <div className="space-y-3 pt-2">
                <Button type="submit" className="w-full" variant="default" size="lg">
                    Create account
                </Button>
            </div>
    </form>;
}