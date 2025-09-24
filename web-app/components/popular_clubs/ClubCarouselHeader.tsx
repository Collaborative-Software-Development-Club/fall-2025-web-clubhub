import React from "react";

interface ClubCarouselHeaderProps {
    name: string;
}

/**
 * Header for each row/carousel of clubs
 * @param name - name of the carousel
 * @returns - JSX component of the carousel header
 */
const ClubCarouselHeader: React.FC<ClubCarouselHeaderProps> = ({ name }) => (
    // What color should this be -> general should make styling better
    // Should there be a popout for the club header??? -> maybe for the particular tags
    <h2 className="text-2xl font-bold text-red-600 ml-2 my-2">
        {name}
    </h2>
);

export default ClubCarouselHeader;