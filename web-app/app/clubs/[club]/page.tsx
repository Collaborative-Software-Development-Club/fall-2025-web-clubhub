"use client";

import clubs from "../../../mock/clubs.json";
import { useState } from "react";
import Image from "next/image";

//The Club Leader Page should look similar to the Club Student Page but with content relevant to club leaders
//Will be combined with the student page later(when we have User Auth)
export default function ClubLeaderPage() {
    const [clubData, setClubData] = useState(clubs[0]); //temporary until we setup have database

    return (
        <div className="w-full max-w-6xl flex flex-col items-center">
            Purpose Statement + Membership Info + Meeting times + Meeting Location + etc
        </div>
    );
}
