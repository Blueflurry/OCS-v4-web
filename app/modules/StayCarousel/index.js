import React from "react";
import styles from "./StayCarousel.module.scss";
import StayCard from "@/app/components/StayCard";
import { Flame } from "lucide-react";

const StayCarousel = ({
    stays = [1, 2, 3, 4, 5, 6],
    title = "Trending Stays",
    titleIcon = <Flame />,
    desc = `Lorem ipsum dolor sit amet consectetur adipisicing elit Lorem ipsum dolor sit amet.`,
}) => {
    return (
        <>
            <h4 className={styles["stay-carousel__title"]}>
                {titleIcon} {title}
            </h4>
            <p className={styles["stay-carousel__desc"]}>{desc}</p>
            <div className={styles["stay-carousel"]}>
                {stays.map((stay, i) => (
                    <StayCard key={i} />
                ))}
            </div>
        </>
    );
};

export default StayCarousel;
