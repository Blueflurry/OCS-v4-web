import React from "react";
import styles from "./StayCarousel.module.scss";
import StayCard from "@/app/components/StayCard";
import * as LucideIcons from "lucide-react";
import axios from "@/app/services/axios";

// Server component - can be async directly
async function StayCarousel({ category }) {
    // Server-side data fetching
    let carouselData = null;

    try {
        if (category) {
            carouselData = await axios.get(`/stays/carousel`, {
                params: { category },
            });
        }
    } catch (error) {
        console.error("Failed to fetch stays:", error);
        // Return null or error state
        return <div>Failed to load stays</div>;
    }

    // Don't render the component until data is loaded
    if (!carouselData) return null;

    const { stays, title, icon, description } = carouselData.data;

    // Dynamically get the icon component from Lucide icons
    // Default to Flame if the specified icon doesn't exist
    const IconComponent =
        icon && LucideIcons[icon] ? LucideIcons[icon] : LucideIcons.Flame;

    return (
        <>
            <h4 className={styles["stay-carousel__title"]}>
                <IconComponent size={20} /> {title}
            </h4>
            <p className={styles["stay-carousel__desc"]}>{description}</p>
            <div className={`${styles["stay-carousel"]}`}>
                {stays && stays.length > 0 ? (
                    stays.map((stay) => <StayCard key={stay.id} stay={stay} />)
                ) : (
                    <p>No stays available in this category.</p>
                )}
            </div>
        </>
    );
}

export default StayCarousel;
