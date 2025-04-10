"use client";
import React from "react";
import EmblaCarousel from "./EmblaCarousel";

const OPTIONS = { loop: true };

const SecondaryImageCarousel = (props) => {
    var { images = [] } = props;

    if (images.length < 3) {
        images = [...images, ...images];
    }

    const SLIDES = Array.from(Array(images.length).keys());
    // Don't render carousel if no images are available
    if (!images.length) return null;
    return (
        <div>
            <EmblaCarousel slides={SLIDES} options={OPTIONS} images={images} />
        </div>
    );
};

export default SecondaryImageCarousel;
