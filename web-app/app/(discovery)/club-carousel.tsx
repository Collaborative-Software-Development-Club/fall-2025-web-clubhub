"use client";

import React from "react";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
} from "@/components/ui/carousel";

type PropType = {
    children: React.ReactNode;
};

// Generic carousel component
export const ClubCarousel: React.FC<PropType> = (props) => {
    const { children } = props;

    const carouselButtonCSS =
        "bg-white/90 hover:bg-white border shadow-lg disabled:invisible transition-opacity duration-200";

    return (
        <Carousel className="relative w-full">
            <CarouselContent className="-ml-2 md:-ml-4">
                {React.Children.map(children, (child, index) => (
                    <CarouselItem
                        key={index}
                        className="pl-2 md:pl-4 basis-1/1 md:basis-1/2 lg:basis-1/3 h-full"
                    >
                        {child}
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className={`left-2 ${carouselButtonCSS}`} />
            <CarouselNext className={`right-2 ${carouselButtonCSS}`} />
        </Carousel>
    );
};
