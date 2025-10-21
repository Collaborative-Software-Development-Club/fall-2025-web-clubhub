"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
  // Detects active link based on current pathname
  const pathname = usePathname();
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/attendance", label: "Attendance" },
    { href: "/browse", label: "Browse" },
    { href: "/meetings", label: "Meetings" },
    { href: "/clubs/csdc", label: "Sample Club Profile" },
  ];

  return (
    // loops through links and highlights active one 
    <nav className="flex flex-wrap items-center gap-4 bg-red-600 px-6 py-3 shadow-md rounded-md">
      {navLinks.map((link) => {
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
              isActive
                ? "bg-white text-red-600"
                : "text-white hover:text-red-200 hover:bg-red-700"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}

