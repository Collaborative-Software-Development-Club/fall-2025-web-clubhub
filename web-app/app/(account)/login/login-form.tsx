"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useState } from "react"
import { ClerkAPIError } from "@clerk/types"
import { useSignIn } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { isClerkAPIResponseError } from "@clerk/nextjs/errors"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function LoginForm(): React.JSX.Element {
    const { isLoaded, signIn, setActive } = useSignIn()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState<ClerkAPIError[]>()

    const router = useRouter()

    // Handle the submission of the sign-in form
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        // Clear any errors that may have occurred during previous form submission
        setErrors(undefined)

        if (!isLoaded) {
            return
        }

        // Start the sign-in process using the email and password provided
        try {
            const signInAttempt = await signIn.create({
                identifier: email,
                password,
            })

            // If sign-in process is complete, set the created session as active
            // and redirect the user
            if (signInAttempt.status === 'complete') {
                await setActive({
                session: signInAttempt.createdSessionId,
                navigate: async ({ session }) => {
                    if (session?.currentTask) {
                    // Check for tasks and navigate to custom UI to help users resolve them
                    // See https://clerk.com/docs/guides/development/custom-flows/overview#session-tasks
                    console.log(session?.currentTask)
                    return
                    }

                    router.push('/')
                },
                })
            } else {
                // If the status is not complete, check why. User may need to
                // complete further steps.
                console.error(JSON.stringify(signInAttempt, null, 2))
            }
        } catch (err) {
            if (isClerkAPIResponseError(err)) setErrors(err.errors)
            console.error(JSON.stringify(err, null, 2))
        }
    }

    return <form onSubmit={handleSubmit} className="space-y-6">
        {/* Display errors if any occurred during submission */}
        {errors && (
            <div>
                <Alert variant="destructive" className="w-full">
                    <AlertTitle>Sign in Error</AlertTitle>
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
        {/* Email Field */}
        <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
                Email
            </Label>
            <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                placeholder="Enter your password"
                className="w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
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
        {/* <div className="pt-4 border-t">
            <Link href="/dashboard" className="w-full block">
                <Button className="w-full" variant="ghost" size="sm">
                    Debug Mode
                </Button>
            </Link>
            <p className="text-xs text-gray-500 text-center mt-2">
                Debug Mode lets you view the demo page without logging in.
            </p>
        </div> */}
    </form>
}