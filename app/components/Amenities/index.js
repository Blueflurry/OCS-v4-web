"use react";
import React from "react";
import styles from "./Amenities.module.scss";
import SecondaryImageCarousel from "../SecondaryImageCarousel";
import { AMENITIES_LIST, VILLA_IMAGES } from "@/app/constants/dummy";
import Button from "../Button";
import Image from "next/image";

const Amenities = () => {
    const AMENITIES = AMENITIES_LIST;
    return (
        <div className={styles["amenities"]}>
            <h3>
                Amenities
                <span>(40+)</span>
            </h3>
            <SecondaryImageCarousel
                images={VILLA_IMAGES}
            ></SecondaryImageCarousel>

            <div className={styles["amenities__list"]}>
                {AMENITIES.map((amenity) => (
                    <div key={amenity.id} className={styles["amenities__item"]}>
                        {/* <Button> */}
                        <Image
                            src={amenity.icon}
                            alt={amenity.name}
                            width={20}
                            height={20}
                        />
                        <p>{amenity.name}</p>
                        {/* </Button> */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Amenities;
