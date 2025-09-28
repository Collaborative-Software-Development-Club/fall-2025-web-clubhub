"use client";

import React from "react";
import "./embla.css";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
} from "../ui/carousel";

type PropType = {
    children: React.ReactNode;
};

// Generic carousel component
const ClubCarousel: React.FC<PropType> = (props) => {
    const { children } = props;

    return (
        <Carousel
            //className="embla w-full max-w-full"
            opts={{
                //align: "start",
                //loop: false,
            }}
            //orientation="horizontal"
        >
            <CarouselContent className="-ml-2 md:-ml-4">
                {React.Children.map(children, (child, index) => (
                    <CarouselItem
                        key={index}
                        className="pl-2 md:pl-4 basis-1/1 md:basis-1/2 lg:basis-1/3"
                    >
                        {child}
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    );
};

export default ClubCarousel;
