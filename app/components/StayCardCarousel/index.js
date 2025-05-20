"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import styles from "./StayCardCarousel.module.scss";

// Simple, lightweight carousel for StayCard
const StayCardCarousel = ({ images, stayName }) => {
    // Get the first image from each category if images is an object
    const [carouselImages, setCarouselImages] = useState([]);
    const [loading, setLoading] = useState(true);

    // Embla carousel setup with options for better performance
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: false,
        skipSnaps: false,
        draggable: true,
        dragFree: false,
        containScroll: "keepSnaps",
    });

    // Scroll handlers for navigation arrows with event propagation stopped
    const scrollPrev = useCallback(
        (e) => {
            e.stopPropagation(); // Stop event from bubbling up
            e.preventDefault(); // Prevent default behavior
            if (emblaApi) emblaApi.scrollPrev();
        },
        [emblaApi]
    );

    const scrollNext = useCallback(
        (e) => {
            e.stopPropagation(); // Stop event from bubbling up
            e.preventDefault(); // Prevent default behavior
            if (emblaApi) emblaApi.scrollNext();
        },
        [emblaApi]
    );

    // Process images for the carousel
    useEffect(() => {
        if (!images) {
            setCarouselImages(["/assets/images/banner.webp"]);
            return;
        }

        // Handle different image data structures
        if (typeof images === "string") {
            // Single image URL
            setCarouselImages([images]);
        } else if (Array.isArray(images)) {
            // Array of image URLs
            setCarouselImages(images.slice(0, 6)); // Limit to first 6 images for performance
        } else if (typeof images === "object") {
            // Object with categorized images
            // Get first image from each category, limit to 6 categories for performance
            const firstImages = [];
            const categories = Object.keys(images).slice(0, 6);

            categories.forEach((category) => {
                if (
                    Array.isArray(images[category]) &&
                    images[category].length > 0
                ) {
                    firstImages.push(images[category][0]);
                }
            });

            if (firstImages.length > 0) {
                setCarouselImages(firstImages);
            } else {
                setCarouselImages(["/assets/images/banner.webp"]);
            }
        } else {
            // Fallback
            setCarouselImages(["/assets/images/banner.webp"]);
        }

        setLoading(false);
    }, [images]);

    // Auto scroll every 3 seconds (only when card is visible)
    // useEffect(() => {
    //     if (!emblaApi || carouselImages.length <= 1) return;

    //     const autoplayInterval = setInterval(() => {
    //         if (document.hidden) return; // Don't autoplay when tab is hidden
    //         emblaApi.scrollNext();
    //     }, 3000);

    //     return () => clearInterval(autoplayInterval);
    // }, [emblaApi, carouselImages]);

    if (loading) {
        return (
            <div className={styles.stayCardCarousel}>
                <div className={styles.loadingPlaceholder}></div>
            </div>
        );
    }

    return (
        <div className={styles.stayCardCarousel}>
            {/* Add a click handler to the main carousel container to stop propagation */}
            <div
                className={styles.stayCardCarouselWrapper}
                ref={emblaRef}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={styles.stayCardCarouselContainer}>
                    {carouselImages.map((image, index) => (
                        <div
                            className={styles.stayCardCarouselSlide}
                            key={index}
                        >
                            <Image
                                src={image}
                                width={400}
                                height={500}
                                alt={`${stayName || "Stay"} - Image ${
                                    index + 1
                                }`}
                                className={styles.stayCardCarouselImage}
                                loading={index === 0 ? "eager" : "lazy"} // Load first image eagerly, others lazily
                                priority={index === 0} // Give priority to first image
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Arrows (only show if more than one image) */}
            {carouselImages.length > 1 && (
                <>
                    <button
                        className={`${styles.carouselArrow} ${styles.carouselArrowPrev}`}
                        onClick={scrollPrev}
                        onTouchEnd={scrollPrev}
                        aria-label="Previous slide"
                        type="button"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                    </button>
                    <button
                        className={`${styles.carouselArrow} ${styles.carouselArrowNext}`}
                        onClick={scrollNext}
                        onTouchEnd={scrollNext}
                        aria-label="Next slide"
                        type="button"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </button>
                </>
            )}
        </div>
    );
};

export default StayCardCarousel;
