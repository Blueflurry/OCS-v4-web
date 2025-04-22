"use client";
import React, { useState, useEffect } from "react";
import EmblaCarousel from "./EmblaCarousel";
import ImageGalleryModal from "../ImageGalleryModal";
import styles from "./EmblaCarousel.module.scss";
import { Grid } from "lucide-react";

const OPTIONS = {
    direction: "ltr",
    loop: false,
    slidesToScroll: 1,
    // dragFree: true // swipe multiple slides at once
};

const HeroImageCarousel = (props) => {
    const { images, categoryImages } = props;
    const [emblaApi, setEmblaApi] = useState(null);
    const [categoryData, setCategoryData] = useState([]);
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);

    const SLIDE_COUNT = images.length;
    const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

    // Process categories and find their starting indices in the main images array
    useEffect(() => {
        if (!categoryImages) return;

        console.log("Category Images:", categoryImages);
        console.log("Images:", images);

        const data = [];
        // Create an array of categories with their starting index in the images array
        Object.entries(categoryImages).forEach(
            ([category, categoryImageUrls]) => {
                // Find the index of the first image of this category in the main images array
                const firstImageUrl = categoryImageUrls[0];
                const startIndex = images.findIndex(
                    (url) => url === firstImageUrl
                );

                if (startIndex !== -1) {
                    data.push({
                        name: formatCategoryName(category),
                        startIndex,
                        previewImage: firstImageUrl,
                        count: categoryImageUrls.length,
                    });
                }
            }
        );

        // Sort by startIndex so categories appear in the order they show in the carousel
        data.sort((a, b) => a.startIndex - b.startIndex);
        setCategoryData(data);
    }, [images, categoryImages]);

    // Format category name for display (capitalize first letter of each word)
    const formatCategoryName = (name) => {
        return name
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    };

    // Scroll to the first image of a category
    const scrollToCategory = (startIndex) => {
        if (emblaApi) {
            emblaApi.scrollTo(startIndex);
        }
    };

    // Open the gallery modal
    const openGallery = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsGalleryOpen(true);
    };

    // Count total images
    const totalImageCount = categoryImages
        ? Object.values(categoryImages).reduce(
              (count, images) => count + images.length,
              0
          )
        : 0;

    return (
        <div className={styles.carouselContainer}>
            <EmblaCarousel
                slides={SLIDES}
                options={OPTIONS}
                images={images}
                setEmblaApi={setEmblaApi}
            />

            {categoryData.length > 0 && (
                <div className={styles.categoryButtonsContainer}>
                    {/* All Images button */}
                    <button
                        className={`${styles.categoryButton}`}
                        style={{
                            backgroundImage: `url(${images[0]})`,
                        }}
                        onClick={openGallery}
                    >
                        <div className={styles.categoryOverlay}>
                            {/* <Grid size={16} className={styles.gridIcon} /> */}
                            <span className={styles.categoryName}>
                                All Images
                            </span>
                            <span className={styles.categoryCount}>
                                ({totalImageCount})
                            </span>
                        </div>
                    </button>

                    {/* Category buttons */}
                    {categoryData.map((category, index) => (
                        <button
                            key={index}
                            className={styles.categoryButton}
                            onClick={() =>
                                scrollToCategory(category.startIndex)
                            }
                            style={{
                                backgroundImage: `url(${category.previewImage})`,
                            }}
                        >
                            <div className={styles.categoryOverlay}>
                                <span className={styles.categoryName}>
                                    {category.name}
                                </span>
                                <span className={styles.categoryCount}>
                                    ({category.count})
                                </span>
                            </div>
                        </button>
                    ))}
                </div>
            )}

            {/* Gallery Modal */}
            <ImageGalleryModal
                isOpen={isGalleryOpen}
                onClose={() => setIsGalleryOpen(false)}
                categoryImages={categoryImages || {}}
            />
        </div>
    );
};

export default HeroImageCarousel;
