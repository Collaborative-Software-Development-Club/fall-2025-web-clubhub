"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { SignedIn, SignOutButton, useAuth } from "@clerk/nextjs";

export function Navbar() {
    const { isSignedIn } = useAuth();
    // Detects active link based on current pathname
    const pathname = usePathname();
    const navLinks = isSignedIn ? [
        { href: "/", label: "Home" },
        { href: "/browse", label: "Browse" },
        { href: "/dashboard", label: "My Clubs" },
    ] : [
        { href: "/", label: "Home" },
        { href: "/browse", label: "Browse" },
        { href: "/login", label: "Log In" },
    ];

    console.log(pathname);
    return (
        // loops through links and highlights active one
        <header className="sticky top-0 z-50 p-4 ">
            <Card className="w-full px-8 py-4 items-center justify-between flex flex-row rounded-full shadow-primary/10 shadow-lg">
                <Link href="/" className="flex items-center gap-5">
                    <h1 className="text-2xl font-bold text-primary">
                        ClubHub @OSU
                    </h1>
                </Link>

                <nav className="flex flex-wrap items-center gap-4">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;

                        return (
                            <Button
                                asChild
                                key={link.href}
                                variant={isActive ? "secondary" : "ghost"}
                            >
                                <Link href={link.href}>{link.label}</Link>
                            </Button>
                        );
                    })}
                    <SignedIn>
                        <SignOutButton>
                            <Button>
                                Sign Out
                            </Button>
                        </SignOutButton>
                    </SignedIn>
                </nav>
            </Card>
        </header>
    );
}
