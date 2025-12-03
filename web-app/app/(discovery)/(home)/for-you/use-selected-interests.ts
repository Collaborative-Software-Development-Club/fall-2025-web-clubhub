import { useEffect, useState } from "react";

export function useSelectedInterests() {
    const [interests, setInterests] = useState<string[] | null>(null);
    const [hasInitialized, setHasInitialized] = useState(false);

    // Load from localStorage
    useEffect(() => {
        try {
            const raw = localStorage.getItem("selectedInterests");
            if (raw && raw !== "null") {
                const parsed = JSON.parse(raw);
                if (Array.isArray(parsed)) setInterests(parsed);
                else setInterests([]);
            } else {
                setInterests([]);
            }
        } catch (e) {
            console.error("Error reading selectedInterests:", e);
            setInterests([]);
        } finally {
            setHasInitialized(true);
        }
    }, []);

    // Persist to localStorage only after initialization
    useEffect(() => {
        if (!hasInitialized) return;
        if (interests == null) return; // avoid writing "null"
        try {
            localStorage.setItem(
                "selectedInterests",
                JSON.stringify(interests),
            );
        } catch (e) {
            console.error("Error writing selectedInterests:", e);
        }
    }, [interests, hasInitialized]);

    return { interests, setInterests };
}
