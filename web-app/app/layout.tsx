import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/navbar/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ClubHub",
  description: "OSU Club Platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Header with OSU logo, title, and navbar
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <header className="bg-black text-white shadow-md sticky top-0 z-50">
            <div className="w-full px-8 py-4 flex items-center justify-between">            
            <Link href="/" className="flex items-center gap-5">
              <Image
                src="/default-club-logo.png"
                alt="OSU Logo"
                width={40}
                height={40}
                className = "rounded-full"
              />
              <h1 className="text-2xl font-bold">ClubHub</h1>
            </Link>

            <Navbar />
          </div>
        </header>

        <main>{children}</main>
      </body>
    </html>
  );
}
