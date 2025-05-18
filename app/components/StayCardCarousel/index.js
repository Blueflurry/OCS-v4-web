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
        draggable: false,
        dragFree: false,
        containScroll: "keepSnaps",
    });

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
            setCarouselImages(images.slice(0, 6)); // Limit to first 3 images for performance
        } else if (typeof images === "object") {
            // Object with categorized images
            // Get first image from each category, limit to 3 categories for performance
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
        <div className={styles.stayCardCarousel} ref={emblaRef}>
            <div className={styles.stayCardCarouselContainer}>
                {carouselImages.map((image, index) => (
                    <div className={styles.stayCardCarouselSlide} key={index}>
                        <Image
                            src={image}
                            width={400}
                            height={500}
                            alt={`${stayName || "Stay"} - Image ${index + 1}`}
                            className={styles.stayCardCarouselImage}
                            loading={index === 0 ? "eager" : "lazy"} // Load first image eagerly, others lazily
                            priority={index === 0} // Give priority to first image
                        />
                    </div>
                ))}
            </div>

            {/* Simple dots indicator */}
            {carouselImages.length > 1 && (
                <div className={styles.stayCardCarouselDots}>
                    {carouselImages.map((_, index) => (
                        <span
                            key={index}
                            className={styles.stayCardCarouselDot}
                        ></span>
                    ))}
                </div>
            )}
        </div>
    );
};

export default StayCardCarousel;
