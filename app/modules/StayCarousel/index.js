import React from "react";
import styles from "./StayCarousel.module.scss";
import StayCard from "@/app/components/StayCard";

const StayCarousel = ({ stays = [1, 2, 3, 4, 5, 6] }) => {
    return (
        <div className={styles["stay-carousel"]}>
            {stays.map((stay, i) => (
                <StayCard key={i} />
            ))}
        </div>
    );
};

export default StayCarousel;
