"use client";
import React from "react";
import styles from "./Reviews.module.scss";
import Image from "next/image";
import { REVIEWS } from "@/app/constants/dummy";

const Reviews = () => {
    const reviews = REVIEWS;

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
                    {reviews.starWiseRatings.map((rating, index) => (
                        <div
                            className={
                                styles["reviews__ratings-distribution__item"]
                            }
                            key={index}
                        >
                            <Image
                                src="/assets/images/single-star.svg"
                                width={20}
                                height={20}
                                alt="star"
                            />
                            <p>{rating.stars}</p>
                            <div
                                className={
                                    styles["reviews__ratings-distribution__bar"]
                                }
                                style={{
                                    width: `${
                                        (rating.count /
                                            reviews.highestRatingCount) *
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

            <div className={styles["reviews__gallery"]}>
                {reviews.photoReviews.map((review, idx) => (
                    <div className={styles["reviews__gallery-card"]} key={idx}>
                        <Image
                            className={styles["reviews__gallery-card-img"]}
                            src={review.img}
                            width={200}
                            height={350}
                            alt="photo"
                        />
                        <div className={styles["reviews__gallery-card-rating"]}>
                            <Image
                                src={"/assets/images/single-star-colored.svg"}
                                width={20}
                                height={20}
                                alt="star"
                            />

                            <span>
                                <b>{review.rating} </b>
                                {"  "} by{"  "}
                                <b> {review.reviewBy}</b>
                            </span>
                        </div>

                        <div
                            className={
                                styles["reviews__gallery-card-reviewDate"]
                            }
                        >
                            <Image
                                src={"/assets/images/calendar.svg"}
                                width={20}
                                height={20}
                                alt="reviewDate"
                            />

                            <span>{review.reviewDate}</span>
                        </div>

                        <div
                            className={styles["reviews__gallery-card-location"]}
                        >
                            <Image
                                src={"/assets/images/location-marker.svg"}
                                width={20}
                                height={20}
                                alt="marker"
                            />

                            <span>{review.location}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles["reviews__comments"]}>
                {reviews.comments.map((comment, idx) => (
                    <div key={idx}>
                        <div className={styles["reviews__comments-title"]}>
                            <div
                                className={
                                    styles["reviews__comments-title-img"]
                                }
                            >
                                <Image
                                    src={comment.img}
                                    width={40}
                                    height={40}
                                    alt="profileImg"
                                />
                            </div>
                            <div
                                className={
                                    styles["reviews__comments-title-details"]
                                }
                            >
                                <div>
                                    <h4>
                                        {comment.reviewBy}{" "}
                                        <span>{comment.reviewTime} ago</span>
                                    </h4>
                                </div>

                                <div
                                    className={
                                        styles[
                                            "reviews__comments-title-details-rating"
                                        ]
                                    }
                                >
                                    {[1, 2, 3, 4].map((item, idx) => (
                                        <Image
                                            src="/assets/images/full-rating-star.svg"
                                            width={20}
                                            height={20}
                                            alt="rating"
                                            key={idx}
                                        />
                                    ))}
                                    <Image
                                        src="/assets/images/no-rating-star.svg"
                                        width={20}
                                        height={20}
                                        alt="rating"
                                    />
                                </div>
                            </div>
                        </div>

                        <div
                            className={styles["reviews__comments-description"]}
                        >
                            <p>{comment.review}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Reviews;
