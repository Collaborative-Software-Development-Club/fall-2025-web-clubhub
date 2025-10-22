"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";

export function Navbar() {
    // Detects active link based on current pathname
    const pathname = usePathname();
    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/attendance/0", label: "Attendance" },
        { href: "/browse", label: "Browse" },
        { href: "/meetings", label: "Meetings" },
        { href: "/clubs/csdc", label: "Sample Club Profile" },
        { href: "/attenndance/0/response", label: "Attendance Response" },
        { href: "/account", label: "Attendance Response" },
    ];

    console.log(pathname);
    return (
        // loops through links and highlights active one
        <header className="sticky top-0 z-50 p-4 ">
            <Card className="w-full px-8 py-4 items-center justify-between flex flex-row rounded-full">
                <Link href="/" className="flex items-center gap-5">
                    <h1 className="text-2xl font-bold">ClubHub</h1>
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
                </nav>
            </Card>
        </header>
    );
}
