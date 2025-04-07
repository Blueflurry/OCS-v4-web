"use client";
import React, { useState } from "react";
import styles from "./Amenities.module.scss";
import SecondaryImageCarousel from "../SecondaryImageCarousel";
import { VILLA_IMAGES } from "@/app/data/dummy";
import Button from "../Button";
import { ChefHat } from "lucide-react";
import Image from "next/image";

const Amenities = ({ amenities }) => {
    const AMENITIES = amenities;
    // State to track if we're showing all amenities or just the first 6
    const [showAll, setShowAll] = useState(false);

    // Get the amenities to display based on showAll state
    const displayedAmenities = showAll ? AMENITIES : AMENITIES.slice(0, 6);

    // Function to toggle between showing all and showing limited amenities
    const toggleShowAll = () => {
        setShowAll(!showAll);
    };

    return (
        <div className={styles["amenities"]}>
            <h3>
                Amenities
                <span>({Math.floor(AMENITIES.length / 10) * 10}+)</span>
            </h3>
            <SecondaryImageCarousel
                images={VILLA_IMAGES}
            ></SecondaryImageCarousel>

            <div className={styles["amenities__list"]}>
                {displayedAmenities.map((amenity) => (
                    <div
                        key={amenity._id}
                        className={styles["amenities__item"]}
                    >
                        {/* <ChefHat /> */}
                        <Image
                            src={amenity.catalogId.icon}
                            alt={amenity.name}
                            width={20}
                            height={20}
                        />
                        <p>{amenity.name}</p>
                    </div>
                ))}
            </div>

            {/* Only show the button if there are more than 6 amenities */}
            {AMENITIES.length > 6 && (
                <div className={styles["amenities__show-more"]}>
                    <Button onClick={toggleShowAll} type="secondary">
                        {showAll
                            ? "Show less"
                            : `Show all ${AMENITIES.length} amenities`}
                    </Button>
                </div>
            )}
        </div>
    );
};

export default Amenities;
