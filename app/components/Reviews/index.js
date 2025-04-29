"use client";
import React from "react";
import styles from "./Reviews.module.scss";
import Image from "next/image";
import { REVIEWS } from "@/app/data/dummy";
import { Star, StarHalf } from "lucide-react";
import useSWR from "swr";
import { formatDate } from "../../utils/formatter";
import { renderStars } from "@/app/utils/render";
import PartnerLogo from "../PartnerLogo";

const Reviews = ({ stayId, rating, ratingsByCategory, partner }) => {
    const {
        data: reviews,
        error,
        isLoading,
    } = useSWR(
        `${process.env.NEXT_PUBLIC_BASEURL}/stay/${stayId}/reviews`,
        (url) =>
            fetch(url)
                .then((res) => res.json())
                .then((result) => result.data),
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        }
    );

    if (isLoading) return <p>Loading reviews...</p>;

    if (error && !reviews) return <p>There was a problem in loading reviews</p>;

    if (reviews)
        return (
            <div className={styles["reviews"]}>
                <h3>Reviews & Ratings</h3>
                <div>
                    Powered by <PartnerLogo name={partner} color="black" />
                </div>

                <div className={styles["reviews__ratings"]}>
                    <div className={styles["reviews__ratings-overall"]}>
                        <h2>{rating}</h2>
                        <span>Based on {reviews.all.length} Ratings</span>
                    </div>
                    <div className={styles["reviews__ratings-distribution"]}>
                        {Object.keys(ratingsByCategory).map((key, index) => (
                            <div className={styles["reviews__ratings-distribution__item"]} key={index}>
                                <p>
                                    <b>{key}:</b>{" "}
                                    <span>
                                        <b>{ratingsByCategory[key]}</b> {renderStars(ratingsByCategory[key], 12)}
                                    </span>
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles["reviews__gallery"]}>
                    {reviews.photoReviews.map((review, idx) => (
                        <div className={styles["reviews__gallery-card"]} key={idx}>
                            <Image className={styles["reviews__gallery-card-img"]} src={review.images[0]} width={200} height={350} alt="photo" />
                            <div className={styles["reviews__gallery-card-rating"]}>
                                <Image src={"/assets/images/single-star-colored.svg"} width={20} height={20} alt="star" />

                                <span>
                                    <b>{review.rating} </b>
                                    {"  "} by{"  "}
                                    <b>{review.reviewer.name}</b>
                                </span>
                            </div>

                            <div className={styles["reviews__gallery-card-reviewDate"]}>
                                <Image src={"/assets/images/calendar.svg"} width={20} height={20} alt="reviewDate" />
                                <span>{formatDate(review.publishedAt)}</span>
                            </div>

                            {/* <div className={styles["reviews__gallery-card-location"]}>
                            <Image src={"/assets/images/location-marker.svg"} width={20} height={20} alt="marker" />

                            <span>{review.location}</span>
                        </div> */}
                        </div>
                    ))}
                </div>

                <div className={styles["reviews__comments"]}>
                    {reviews.all.map((comment, idx) => (
                        <div key={idx}>
                            <div className={styles["reviews__comments-title"]}>
                                <div className={styles["reviews__comments-title-img"]}>
                                    <Image src={comment.reviewer.image} width={40} height={40} alt="profileImg" />
                                </div>
                                <div className={styles["reviews__comments-title-details"]}>
                                    <div>
                                        <h4>
                                            {comment.reviewer.name} <span>{formatDate(comment.publishedAt)}</span>
                                        </h4>
                                    </div>

                                    <div className={styles["reviews__comments-title-details-rating"]}>{renderStars(comment.rating, 14)}</div>
                                </div>
                            </div>

                            <div className={styles["reviews__comments-description"]}>
                                {comment.title && comment.title !== "" && <b>{comment.title}</b>}
                                <p>{comment.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
};

export default Reviews;
