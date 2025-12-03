"use client";

import { useEffect, useState } from "react";
import { InterestSelection } from "./interest-selection";
import { ForYouPageComponent } from "./for-you-page";
import { useSelectedInterests } from "./use-selected-interests";

export default function ForYouPage() {
    const { interests, setInterests } = useSelectedInterests();
    const needsInterests = interests ? interests.length > 0 : undefined;
    const [selecting, setSelecting] = useState(false);

    useEffect(() => {
        if (needsInterests == false) {
            setSelecting(true);
        }
    }, [needsInterests]);

    if (interests === null) return null; // loading until localStorage is read

    return selecting ? (
        <InterestSelection
            setDoneSelecting={() => setSelecting(false)}
            interests={interests}
            setInterests={setInterests}
        />
    ) : (
        <ForYouPageComponent />
    );
}
