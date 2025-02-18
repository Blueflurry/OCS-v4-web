"use client";
import React from "react";
import EmblaCarousel from "./EmblaCarousel";

const OPTIONS = { dragFree: true, direction: "ltr", loop: true };
const SLIDE_COUNT = 5;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

// const images = ["/assets/images/villa-1.svg", "/assets/images/villa-2.svg"];

const ImageCarousel = () => {
    return (
        <div className="bg-white">
            <EmblaCarousel slides={SLIDES} options={OPTIONS} />
        </div>
    );
};

export default ImageCarousel;
