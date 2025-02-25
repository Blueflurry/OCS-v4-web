"use client";
import React from "react";
import styles from "./Reviews.module.scss";
import Image from "next/image";
import { RATINGS } from "@/app/data/dummy";

const Reviews = () => {
    const ratings = RATINGS;

    return (
        <div className={styles["reviews"]}>
            <h3>Reviews & Ratings</h3>

            <div className={styles["reviews__ratings"]}>
                <div className={styles["reviews__ratings-overall"]}>
                    <h2>4.5</h2>
                    <Image
                        src="/assets/images/ratings.svg"
                        width={100}
                        height={30}
                        alt="Star Rating"
                    />
                    <p>
                        Based on 563
                        <br />
                        Ratings
                    </p>
                </div>
                <div className={styles["reviews__ratings-distribution"]}>
                    {ratings.starWiseRatings.map((rating, index) => (
                        <div
                            className={
                                styles["reviews__ratings-distribution__item"]
                            }
                        >
                            <Image
                                src="/assets/images/single-star.svg"
                                width={20}
                                height={20}
                                alt="star"
                            ></Image>
                            <p>{rating.stars}</p>
                            <div
                                className={
                                    styles["reviews__ratings-distribution__bar"]
                                }
                                style={{
                                    width: `${
                                        (rating.count /
                                            ratings.highestRatingCount) *
                                        100
                                    }px`,
                                }}
                            >
                                <div
                                    className={
                                        styles[
                                            "reviews__ratings-distribution__bar-fill"
                                        ]
                                    }
                                ></div>
                            </div>
                            <p>{rating.count}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Reviews;
