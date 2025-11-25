"use client";

import { useEffect, useState } from "react";
import { InterestSelection } from "../interest-selection/interest-selection";
import { ForYouPageComponent } from "./for-you-page";

export default function ForYouPage() {
  const [needsInterests, setNeedsInterests] = useState<boolean | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("selectedInterests");

    if(stored === null || JSON.parse(stored).length < 3) {
      setNeedsInterests(true);
    } else {
      setNeedsInterests(false);
    }

  }, []);

  if (needsInterests === null) return null; // loading until localStorage is read

  console.log("Needs interests:", needsInterests);

  return needsInterests ? <InterestSelection/> : <ForYouPageComponent />;
}
