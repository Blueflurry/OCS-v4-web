import React from "react";
import styles from "./StayCarousel.module.scss";
import StayCard from "@/app/components/StayCard";
import * as LucideIcons from "lucide-react";

// Server component - can be async directly
async function StayCarousel({ category }) {
    const { stays, title, icon, description } = category;

    // Dynamically get the icon component from Lucide icons
    // Default to Flame if the specified icon doesn't exist
    const IconComponent =
        icon && LucideIcons[icon] ? LucideIcons[icon] : LucideIcons.Flame;

    return (
        <>
            <h4 className={styles["stay-carousel__title"]}>
                <IconComponent size={24} /> {title}
            </h4>
            <p className={styles["stay-carousel__desc"]}>{description}</p>
            <div className={`${styles["stay-carousel"]}`}>
                {stays && stays.length > 0 ? (
                    stays.map((stay) => (
                        <StayCard
                            key={stay._id}
                            stay={stay}
                            isHomePage={true}
                        />
                    ))
                ) : (
                    <p>No stays available in this category.</p>
                )}
            </div>
        </>
    );
}

export default StayCarousel;
