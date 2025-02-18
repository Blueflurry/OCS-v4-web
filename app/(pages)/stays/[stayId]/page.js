import React from "react";
import styles from "./StayDetails.module.scss";
import StayCard from "@/app/components/StayCard";
import ImageCarousel from "@/app/components/ImageCarousel";

const StayDetails = () => {
    return (
        <div className={styles["stay-details"]}>
            <div className={styles["stay-details__carousel"]}>
                <div style={{ padding: "30px 0px 200px" }}>
                    {/* <StayCard /> */}
                    <ImageCarousel />
                </div>
            </div>
        </div>
    );
};

export default StayDetails;
