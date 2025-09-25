'use client';

import { SignInButton, SignOutButton, SignUpButton } from "@clerk/nextjs";
import { Authenticated, Unauthenticated } from "convex/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="flex items-center gap-4">
          <Link href="/attendance" className="text-blue-600 hover:underline">
            Attendance
          </Link>
          
          <Authenticated>
          <Link href="/dashboard" className="text-blue-600 hover:underline">
            Dashboard
          </Link>
          <SignOutButton>
            <Button>Sign out</Button>
          </SignOutButton>
          </Authenticated>

          <Unauthenticated>
            <SignInButton mode="modal">
              <Button>Sign in</Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button>Sign up</Button>
            </SignUpButton>
          </Unauthenticated>
        </nav>
    );
}