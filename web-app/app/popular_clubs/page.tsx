import React from "react";
import { EmblaOptionsType } from "embla-carousel";
import ClubCarousel from "@/components/popular_clubs/ClubCarousel";
import ClubCard from "@/components/popular_clubs/ClubCard";
import ClubCarouselHeader from "@/components/popular_clubs/ClubCarouselHeader";

// Page to show the popular clubs (currently set up for all clubs in a grid)
export default function PopularClubsPage() {
    const OPTIONS: EmblaOptionsType = {
        align: "start",
        slidesToScroll: "auto", // Automatically determine how many slides to scroll
        containScroll: "trimSnaps",
        dragFree: false, // Snap to slides for better UX with fixed widths
    };
    // We can make a ranking algorithm for each club eventually
    // This rank could be determined by attendence or how well it matches a certain persons attributes
    // OR we can make set rows and just have them predifined -> need to manually update periodically
    const clubs1 = ["CSD", "BDAA", "OH/IO", "AI Club", "CCIG", "BCI"];
    const clubs2 = ["Fintech Club", "SCNO", "Astronomy Club"];

    const clubsGrid = [clubs1, clubs2];

    // These club headers may be customized however needed 
    // (we could generate them as well from the tags maybe)
    const clubHeaders = ["MOST POPULAR", "SECOND MOST POPULAR"];

    /*
    This is a grid of carousels
    */
    return (
        <>
            {clubsGrid.map((clubRow, rowIndex) => (
                <div key={(rowIndex)}>
                    <ClubCarouselHeader name={clubHeaders[rowIndex]}/>
                    <ClubCarousel options={OPTIONS}>
                        {clubRow.map((clubTitle, index) => (
                            <ClubCard clubTitle={clubTitle} key={index} />
                        ))}
                    </ClubCarousel>
                </div>
                
            ))}
        </>
    );
}
