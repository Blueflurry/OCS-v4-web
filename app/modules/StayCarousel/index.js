import styles from "./StayCarousel.module.scss";
import { Flame } from "lucide-react";
import StayCard from "@/app/components/StayCard";

// Server component to fetch and display stays
async function StayCarousel({ stayCarousel, vertical = false }) {
    console.log(stayCarousel);

    let staysData = stayCarousel.stays || [];

    // If no stays provided in props, use mock data
    if (!staysData) {
        // REAL API IMPLEMENTATION (when ready)
        /*
        try {
            const response = await fetch(`/api/stays/${id || "popular"}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch stays: ${response.status}`);
            }
            const data = await response.json();
            staysData = data.stays || [];
        } catch (error) {
            console.error("Error fetching stays:", error);
            return (
                <div className={styles["stay-carousel__error"]}>
                    <p>Error: Failed to load stays</p>
                </div>
            );
        }
        */
    }

    // If no stays to display after trying all sources
    if (!staysData || staysData.length === 0) {
        return (
            <div className={styles["stay-carousel__empty"]}>
                <div className={styles["stay-carousel__no-results"]}>
                    <p>No stays available</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles["stay-carousel__container"]}>
            {/* Title and description */}
            <div className={styles["stay-carousel__header"]}>
                <div>
                    <h4 className={styles["stay-carousel__title"]}>
                        {stayCarousel.titleIcon === "flame" ? (
                            <Flame />
                        ) : (
                            <Flame />
                        )}{" "}
                        {stayCarousel.title}
                    </h4>
                    <p className={styles["stay-carousel__desc"]}>
                        {stayCarousel.description}
                    </p>
                </div>
            </div>

            {/* Carousel content */}
            <div className={styles["stay-carousel__wrapper"]}>
                <div
                    className={`${styles["stay-carousel"]} ${
                        vertical ? styles["stay-carousel-vertical"] : ""
                    }`}
                >
                    {staysData.map((stayData) => (
                        <StayCard
                            key={stayData.id}
                            vertical={vertical}
                            stayData={stayData}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default StayCarousel;
