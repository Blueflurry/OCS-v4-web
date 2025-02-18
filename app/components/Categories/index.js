"use client";
import React from "react";
import Image from "next/image";
import styles from "./Categories.module.scss";

const Categories = (props) => {
    const { images } = props;
    return (
        <div className={styles["category__cards"]}>
            {images.map((image, index) => (
                <div className={styles["category__card"]} key={index}>
                    <img
                        src={image.imgUrl}
                        alt=""
                        className={styles["category__card_image"]}
                    />
                    <div className={styles["category__card_overlay"]}>
                        {image.categoryName}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Categories;
