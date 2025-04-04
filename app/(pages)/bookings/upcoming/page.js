"use client";
import React, { useState, useEffect } from "react";
import styles from "./Upcoming.module.scss";
import Image from "next/image";
import Link from "next/link";
import {
    getUpcomingBookings,
    formatBookingDate,
    formatBookingAmount,
} from "@/app/services/bookingService";
import Loading from "@/app/loading";

const Upcoming = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUpcomingBookings = async () => {
            try {
                setLoading(true);
                const data = await getUpcomingBookings();
                console.log("Upcoming bookings data:", data);
                setBookings(data);
            } catch (err) {
                console.error("Error fetching upcoming bookings:", err);
                setError(
                    "Failed to load your upcoming bookings. Please try again later."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchUpcomingBookings();
    }, []);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <div className={styles["error"]}>{error}</div>;
    }

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
                {bookings.length === 0 ? (
                    <div className={styles["no-bookings"]}>
                        <p>You don't have any upcoming bookings</p>
                        <Link href="/" className={styles["browse-link"]}>
                            Browse stays
                        </Link>
                    </div>
                ) : (
                    bookings.map((booking) => {
                        // Format dates for display
                        const checkInDate = formatBookingDate(
                            booking.dates?.checkIn
                        );
                        const checkOutDate = formatBookingDate(
                            booking.dates?.checkOut
                        );
                        const dateRange = `${checkInDate} - ${checkOutDate}`;

                        // Get stay details
                        const stay = booking.stay || {};
                        const location = stay.location?.name || "";

                        // Get pricing details
                        const originalPrice =
                            booking.pricing?.originalPrice || 0;
                        const currentPrice = booking.pricing?.stayTotal || 0;

                        return (
                            <Link
                                href={`/bookings/${booking._id}`}
                                key={booking._id}
                            >
                                <div
                                    className={
                                        styles[
                                            "upcoming-bookings__stay-details"
                                        ]
                                    }
                                >
                                    <div
                                        className={
                                            styles[
                                                "upcoming-bookings__stay-details--image"
                                            ]
                                        }
                                    >
                                        <Image
                                            src={
                                                stay.images?.[0] ||
                                                "/assets/images/villa-1.svg"
                                            }
                                            width={100}
                                            height={100}
                                            alt={stay.name || "Stay"}
                                        />
                                    </div>
                                    <div
                                        className={
                                            styles[
                                                "upcoming-bookings__stay-details--details"
                                            ]
                                        }
                                    >
                                        <h4>
                                            <span>Booking ID:</span>
                                            {booking.bookingId ||
                                                "#OCSBK299024"}
                                        </h4>
                                        <h3>{stay.name || "Luxury Stay"}</h3>
                                        <p>{dateRange}</p>

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
                                            <p>{location}</p>
                                        </div>

                                        <h2>
                                            {originalPrice > 0 && (
                                                <span>
                                                    ₹
                                                    {formatBookingAmount(
                                                        originalPrice
                                                    )}
                                                </span>
                                            )}
                                            ₹{formatBookingAmount(currentPrice)}
                                        </h2>
                                    </div>
                                </div>
                            </Link>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default Upcoming;
