"use client";
import React from "react";
import EmblaCarousel from "./EmblaCarousel";

const OPTIONS = {
    direction: "ltr",
    loop: false,
    slidesToScroll: 1,
    // dragFree: true // swipe multiple slides at once
};

const HeroImageCarousel = (props) => {
    const { images } = props;

    const SLIDE_COUNT = images.length;
    const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

    // console.log("images", images);
    return (
        <div>
            <EmblaCarousel slides={SLIDES} options={OPTIONS} images={images} />
        </div>
    );
};

export default HeroImageCarousel;
