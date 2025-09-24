"use client";

import React from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import "./embla.css";

type PropType = {
    children: React.ReactNode;
    options?: EmblaOptionsType;
};

// Generic carousel component
const ClubCarousel: React.FC<PropType> = (props) => {
    const { children, options } = props;
    const [emblaRef, emblaApi] = useEmblaCarousel(options);

    // Basically uses the sample code for the embla carousel
    return (
        <section className="embla">
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">
                    {React.Children.map(children, (child, index) => (
                        <div className="embla__slide" key={index}>
                            {child}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ClubCarousel;
