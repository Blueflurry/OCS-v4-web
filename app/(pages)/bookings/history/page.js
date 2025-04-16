"use client";
import React, { useState, useEffect } from "react";
import styles from "./History.module.scss";
import Image from "next/image";
import Link from "next/link";
import {
    getCompletedBookings,
    formatBookingDate,
    formatBookingAmount,
} from "@/app/services/bookingService";
import Loading from "@/app/loading";
import Header from "@/app/modules/Header";
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import emptyStateAnimation from "@/public/assets/animations/empty-state.json";

const History = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCompletedBookings = async () => {
            try {
                setLoading(true);
                const data = await getCompletedBookings();
                setBookings(data);
            } catch (err) {
                console.error("Error fetching completed bookings:", err);
                setError(
                    "Failed to load your booking history. Please try again later."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchCompletedBookings();
    }, []);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <div className={styles["error"]}>{error}</div>;
    }

    return (
        <>
            <Header />
            <div className={styles["bookings-history"]}>
                <div className={styles["bookings-history__header"]}>
                    {/* <Image
                        src="/assets/images/logo.svg"
                        alt="OneClick Stays"
                        width={100}
                        height={100}
                        style={{ width: "70px", marginBottom: "-4px" }}
                    />
                    <div
                        className={styles["bookings-history__header-separator"]}
                    ></div> */}
                    <h2>Trip History</h2>
                </div>

                <div className={styles["bookings-history__pagenav"]}>
                    <div className={styles["bookings-history__pagenav-nav"]}>
                        <Link href="/bookings/upcoming">
                            <h3>Upcoming</h3>
                        </Link>
                    </div>
                    <div
                        className={`${styles["bookings-history__pagenav-nav"]} ${styles["selected"]}`}
                    >
                        <Link href="/bookings/history">
                            <h3>Completed</h3>
                        </Link>
                    </div>
                </div>

                <div className={styles["bookings-history__details"]}>
                    {bookings.length === 0 ? (
                        // <div className={styles["no-bookings"]}>
                        //     <p>You don't have any completed bookings yet</p>
                        //     <Link href="/" className={styles["browse-link"]}>
                        //         Browse stays
                        //     </Link>
                        // </div>
                        <div className={styles.loadingContainer}>
                            <Lottie
                                animationData={emptyStateAnimation}
                                loop={true}
                                style={{ height: 300 }}
                            />
                            <Link href="/" className={styles["browse-link"]}>
                                Browse stays
                            </Link>
                        </div>
                    ) : (
                        bookings.map((booking) => {
                            // Format dates for display
                            const checkInDate = formatBookingDate(
                                booking?.dates?.checkIn
                            );
                            const checkOutDate = formatBookingDate(
                                booking?.dates?.checkOut
                            );
                            const dateRange = `${checkInDate} - ${checkOutDate}`;

                            // Get stay details
                            const stay = booking.stays[0]?.stay || {};
                            const location = stay.location?.address?.city || "";
                            const guestCount = booking.guests?.total || 0;
                            const guestInfo =
                                guestCount > 0 ? ` • ${guestCount} Guests` : "";

                            // Get pricing details
                            const originalPrice =
                                booking.pricing?.originalPrice || 0;
                            const currentPrice =
                                booking.pricing?.totalPrice || 0;

                            return (
                                <Link
                                    href={`/bookings/${booking.bookingId}`}
                                    key={booking.bookingId}
                                >
                                    <div
                                        className={
                                            styles[
                                                "bookings-history__stay-details"
                                            ]
                                        }
                                    >
                                        <div
                                            className={
                                                styles[
                                                    "bookings-history__stay-details--image"
                                                ]
                                            }
                                        >
                                            <Image
                                                src={
                                                    stay.media?.featuredImage ||
                                                    "/assets/images/villa-1.svg"
                                                }
                                                width={100}
                                                height={100}
                                                alt={
                                                    stay.name
                                                        ?.split("|")[0]
                                                        .trim() || "Luxury Stay"
                                                }
                                            />
                                        </div>
                                        <div
                                            className={
                                                styles[
                                                    "bookings-history__stay-details--details"
                                                ]
                                            }
                                        >
                                            <h4>
                                                <span>Booking ID:</span>
                                                {booking.bookingId}
                                            </h4>
                                            <h3>
                                                {stay.name
                                                    ?.split("|")[0]
                                                    .trim() || "Luxury Stay"}
                                            </h3>
                                            <p>
                                                {dateRange}
                                                {guestInfo}
                                            </p>

                                            <div
                                                className={
                                                    styles[
                                                        "bookings-history__stay-details--location"
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
                                                {/* {originalPrice > 0 && (
                                                    <span>
                                                        ₹
                                                        {formatBookingAmount(
                                                            originalPrice
                                                        )}
                                                    </span>
                                                )} */}
                                                ₹
                                                {formatBookingAmount(
                                                    currentPrice
                                                )}
                                            </h2>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })
                    )}
                </div>
            </div>
        </>
    );
};

export default History;
