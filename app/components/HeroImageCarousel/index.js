"use client";
import React from "react";
import EmblaCarousel from "./EmblaCarousel";

const OPTIONS = {
    direction: "ltr",
    loop: false,
    slidesToScroll: 1,
    // dragFree: true // swipe multiple slides at once
};

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
