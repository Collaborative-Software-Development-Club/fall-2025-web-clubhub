"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const segment = useSelectedLayoutSegment();
    return (
        <>
            <div className="w-full">
                <Tabs value={segment ?? ""} className="">
                    <TabsList className="mx-auto">
                        <TabsTrigger value="" asChild>
                            <Link href="/">Browse</Link>
                        </TabsTrigger>
                        <TabsTrigger value="for-you" asChild>
                            <Link href="interest-selection">For You</Link>
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>
            {children}
        </>
    );
}
