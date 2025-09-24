'use client';

import { SignInButton, SignOutButton, SignUpButton } from "@clerk/nextjs";
import { Authenticated, Unauthenticated } from "convex/react";
import Link from "next/link";

export default function Home() {
    return (
      <>
        <main>
          <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
              <Content />
          </div>
        </main>
      </>
    );
}

// function SignInForm() {
//   return (
//     <div className="flex flex-col gap-8 w-96 mx-auto">
//       <p>Log in now</p>
//       <SignInButton mode="modal">
//         <button className="bg-foreground text-background px-4 py-2 rounded-md">
//           Sign in
//         </button>
//       </SignInButton>
//       <SignUpButton mode="modal">
//         <button className="bg-foreground text-background px-4 py-2 rounded-md">
//           Sign up
//         </button>
//       </SignUpButton>
//     </div>
//   );
// }

function Content() {
  console.log("Rendering authenticated content");
  return (
    <>
      <header className="w-full flex items-center justify-between py-4">
        <h1 className="text-2xl font-semibold">ClubHub</h1>
        <nav className="flex items-center gap-4">
          <Link href="/attendance" className="text-blue-600 hover:underline">
            Attendance
          </Link>
          <Authenticated>
          <Link href="/dashboard" className="text-blue-600 hover:underline">
            Dashboard
          </Link>
          <SignOutButton>
            <button className="bg-foreground text-background px-3 py-1 rounded-md">
              Sign out
            </button>
          </SignOutButton>
          </Authenticated>
          <Unauthenticated>
            <SignInButton mode="modal">
              <button className="bg-foreground text-background px-3 py-1 rounded-md">
                Sign in
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="bg-foreground text-background px-3 py-1 rounded-md">
                Sign up
              </button>
            </SignUpButton>
          </Unauthenticated>
        </nav>
      </header>
      <div className="w-full text-center mt-12">
        <p className="text-muted-foreground">This is a simple placeholder page.</p>
      </div>
    </>
  );
}
