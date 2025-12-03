"use client";

import React, { createContext, useContext } from "react";
import type { ScrapedClub } from "@/services/discovery/scraped-clubs";

type ClubContextValue = {
    clubData: ScrapedClub;
    clubId: number;
    isLeader: boolean;
};

const ClubContext = createContext<ClubContextValue | undefined>(undefined);

export function ClubProvider({
    value,
    children,
}: {
    value: ClubContextValue;
    children: React.ReactNode;
}) {
    return (
        <ClubContext.Provider value={value}>{children}</ClubContext.Provider>
    );
}

export function useClub() {
    const ctx = useContext(ClubContext);
    if (!ctx) throw new Error("useClub must be used within ClubProvider");
    return ctx;
}

export default ClubProvider;
