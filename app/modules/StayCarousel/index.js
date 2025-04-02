import React, { useEffect, useState } from "react";
import styles from "./StayCarousel.module.scss";
import StayCard from "@/app/components/StayCard";
import * as LucideIcons from "lucide-react";
import { fetchStaysByCategory } from "@/app/services/stayService";

const StayCarousel = ({ category, vertical = false }) => {
    const [carouselData, setCarouselData] = useState(null);

    useEffect(() => {
        const getStays = async () => {
            try {
                const data = await fetchStaysByCategory(category);
                setCarouselData(data);
            } catch (error) {
                console.error("Failed to fetch stays:", error);
            }
        };

        if (category) {
            getStays();
        }
    }, [category]);

    // Don't render the component until data is loaded
    if (!carouselData) return null;

    const { stays, title, icon, description } = carouselData;
    const IconComponent =
        icon && LucideIcons[icon] ? LucideIcons[icon] : LucideIcons.Flame;

    return (
        <>
            <h4 className={styles["stay-carousel__title"]}>
                <IconComponent /> {title}
            </h4>
            <p className={styles["stay-carousel__desc"]}>{description}</p>
            <div
                className={`${styles["stay-carousel"]} ${
                    vertical ? styles["stay-carousel-vertical"] : ""
                }`}
            >
                {stays.map((stay, i) => (
                    <StayCard
                        key={stay.id || i}
                        stay={stay}
                        vertical={vertical}
                    />
                ))}
            </div>
        </>
    );
};

export default StayCarousel;
