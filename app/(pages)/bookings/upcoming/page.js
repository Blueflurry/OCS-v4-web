import React from "react";
import styles from "./Upcoming.module.scss";
import Image from "next/image";
import Link from "next/link";

const Upcoming = () => {
    return (
        <div className={styles["upcoming-bookings"]}>
            <div className={styles["upcoming-bookings__header"]}>
                <Image
                    src="/assets/images/logo.svg"
                    alt="OneClick Stays"
                    width={100}
                    height={100}
                    style={{ width: "70px", marginBottom: "-4px" }}
                />
                <div
                    className={styles["upcoming-bookings__header-separator"]}
                ></div>
                <h2>Trip History</h2>
            </div>

            <div className={styles["upcoming-bookings__pagenav"]}>
                <div
                    className={`${styles["upcoming-bookings__pagenav-nav"]} ${styles["selected"]}`}
                >
                    <Link href="/bookings/upcoming">
                        <h3>Upcoming</h3>
                    </Link>
                </div>
                <div className={styles["upcoming-bookings__pagenav-nav"]}>
                    <Link href="/bookings/history">
                        <h3>Completed</h3>
                    </Link>
                </div>
            </div>

            <div className={styles["upcoming-bookings__details"]}>
                <div className={styles["upcoming-bookings__stay-details"]}>
                    <div
                        className={
                            styles["upcoming-bookings__stay-details--image"]
                        }
                    >
                        <Image
                            src="/assets/images/villa-1.svg"
                            width={100}
                            height={100}
                            alt="villa"
                        ></Image>
                    </div>
                    <div
                        className={
                            styles["upcoming-bookings__stay-details--details"]
                        }
                    >
                        <h4>
                            <span>Booking ID:</span>
                            #OCSBK299024
                        </h4>
                        <h3>CEO’s Paradise - OneClick Exclusive</h3>
                        {/* <p>₹ 4,000/night</p> */}
                        <p>
                            Mar 24, 2025 - Mar 30, 2025
                            {/* • 12 Guests */}
                        </p>

                        <div
                            className={
                                styles[
                                    "upcoming-bookings__stay-details--location"
                                ]
                            }
                        >
                            <Image
                                src="/assets/images/location-black.svg"
                                width={20}
                                height={20}
                                alt="Location"
                            />
                            <p>Asagao, Goa</p>
                        </div>

                        <h2>
                            <span>₹1,15000</span>
                            ₹98000
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Upcoming;
