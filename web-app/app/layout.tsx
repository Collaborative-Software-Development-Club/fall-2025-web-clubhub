import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "./navbar";
import { Providers } from "./providers";

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

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Header with OSU logo, title, and navbar
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <Providers>
                    <Navbar />
                    <main>{children}</main>
                </Providers>
            </body>
        </html>
    );
}
