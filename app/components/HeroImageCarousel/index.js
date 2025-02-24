"use client";
import React from "react";
import EmblaCarousel from "./EmblaCarousel";

const OPTIONS = { dragFree: true, direction: "ltr", loop: true };
const SLIDE_COUNT = 5;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

const HeroImageCarousel = (props) => {
    const { images } = props;
    return (
        <div>
            <EmblaCarousel slides={SLIDES} options={OPTIONS} images={images} />
        </div>
    );
};

export default HeroImageCarousel;
