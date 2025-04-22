"use client";
import React, { useEffect } from "react";
import { X } from "lucide-react";
import styles from "./ImageGalleryModal.module.scss";

const ImageGalleryModal = ({ isOpen, onClose, categoryImages }) => {
    // Prevent background scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    // Close modal when clicking outside or pressing escape
    useEffect(() => {
        const handleEscapeKey = (e) => {
            if (e.key === "Escape") onClose();
        };

        if (isOpen) {
            window.addEventListener("keydown", handleEscapeKey);
        }

        return () => {
            window.removeEventListener("keydown", handleEscapeKey);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    // Format category name for display (capitalize first letter of each word)
    const formatCategoryName = (name) => {
        return name
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    };

    // Count total images
    const totalImages = Object.values(categoryImages).reduce((count, images) => count + images.length, 0);

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <h2>All Images ({totalImages})</h2>
                    <button className={styles.closeButton} onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>

                <div className={styles.modalBody}>
                    {Object.entries(categoryImages).map(([category, images]) => (
                        <div key={category} className={styles.categorySection}>
                            <h3 className={styles.categoryHeading}>
                                {formatCategoryName(category)}
                                {/* ({images.length}) */}
                            </h3>
                            <div className={styles.imageGrid}>
                                {images.map((imageUrl, index) => (
                                    <div key={index} className={styles.imageWrapper}>
                                        <img src={imageUrl} alt={`${formatCategoryName(category)} ${index + 1}`} className={styles.galleryImage} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ImageGalleryModal;
