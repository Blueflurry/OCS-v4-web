"use client";
import React from "react";
import styles from "./Reviews.module.scss";
import Image from "next/image";

const Reviews = () => {
    // const policy = POLICY_LIST;
    return (
        <div className={styles["reviews"]}>
            <h3>Reviews & Ratings</h3>

            <div className="reviews__ratings">
                <div className="reviews__ratings-overall">
                    <h2>4.5</h2>
                    <Image
                        src="/assets/images/ratings.svg"
                        width={20}
                        height={20}
                        alt="Star Rating"
                    />
                    <p>(Based on 563 Ratings)</p>
                </div>
                <div className="reviews__ratings-distribution"></div>
            </div>
        </div>
    );
};

export default Reviews;
