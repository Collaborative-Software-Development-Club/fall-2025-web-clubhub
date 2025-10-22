import React from "react";

interface ClubCarouselHeaderProps {
    name: string;
}

/**
 * Header for each row/carousel of clubs
 * @param name - name of the carousel
 * @returns - JSX component of the carousel header
 */
export const ClubCarouselHeader: React.FC<ClubCarouselHeaderProps> = ({
    name,
}) => <h1 className="text-2xl font-bold">{name}</h1>;
