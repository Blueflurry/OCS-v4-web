"use client";
import React, { useState, useEffect } from "react";
import styles from "./BookingDetails.module.scss";
import Footer from "@/app/modules/Footer";
import Image from "next/image";
import BackButton from "@/app/components/BackButton";
import { CheckCheck, CircleCheckBig, Copy } from "lucide-react";
import Tag from "@/app/components/Tag";
import PartnerLogo from "@/app/components/PartnerLogo";
import {
    getBookingDetails,
    formatBookingDate,
    formatBookingAmount,
} from "@/app/services/bookingService";
import Loading from "./loading";
import { useParams } from "next/navigation";

const BookingDetails = () => {
    const params = useParams();
    const { bookingId } = params;
    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [copiedBookingId, setCopiedBookingId] = useState(false);

    useEffect(() => {
        const fetchBookingDetails = async () => {
            try {
                setLoading(true);
                // console.log("Fetching booking with ID:", bookingId);
                const data = await getBookingDetails(bookingId);
                console.log("Booking data received:", data);

                if (Object.keys(data).length === 0) {
                    setError("Booking not found");
                } else {
                    setBooking(data);
                }
            } catch (err) {
                console.error("Error fetching booking details:", err);
                setError(
                    "Failed to load booking details. Please try again later."
                );
            } finally {
                setLoading(false);
            }
        };

        if (bookingId) {
            fetchBookingDetails();
        }
    }, [bookingId]);

    const copyBookingIdToClipboard = () => {
        const id = booking?.bookingId;
        if (id) {
            navigator.clipboard.writeText(id);
            setCopiedBookingId(true);
            setTimeout(() => setCopiedBookingId(false), 2000);
        }
    };

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <div className={styles["error"]}>{error}</div>;
    }

    if (!booking) {
        return <div className={styles["error"]}>Booking not found</div>;
    }

    // Get the booking ID (for display and copy)
    const displayBookingId = booking.bookingId || "OCSBK299024"; // Fallback to hardcoded ID if missing

    // Calculate total amount
    const { pricing } = booking;

    // Format date ranges for display
    const checkInDate = formatBookingDate(booking.dates?.checkIn);
    const checkOutDate = formatBookingDate(booking.dates?.checkOut);
    const dateRange = `${checkInDate} - ${checkOutDate}`;
    const createdAtDate = formatBookingDate(booking.createdAt);

    return (
        <div className={styles["booking"]}>
            <div className={styles["booking__header"]}>
                <div className={styles["booking__header--partner"]}>
                    <Image
                        src="/assets/images/logo.svg"
                        alt="OneClick Stays"
                        width={100}
                        height={100}
                        style={{ width: "70px", marginBottom: "-4px" }}
                    />
                    <span className={styles[""]}>x</span>
                    <PartnerLogo
                        name={booking.stay?.partner?.name || "elivaas"}
                        color="white"
                    />
                </div>
                <h2>Booking Details</h2>
                <p>
                    <span>Booking Id:</span>
                    {displayBookingId}
                    <Copy
                        className={copiedBookingId ? styles["copied"] : ""}
                        onClick={copyBookingIdToClipboard}
                    />
                </p>
                <p>
                    <span>Created at:</span>
                    {createdAtDate}
                </p>

                <p>
                    <span>Status:</span>
                    <span
                        className={
                            styles[booking.status?.toLowerCase() || "confirmed"]
                        }
                    >
                        {booking.status
                            ? booking.status.charAt(0).toUpperCase() +
                              booking.status.slice(1)
                            : "Confirmed"}
                    </span>
                    <CircleCheckBig style={{ stroke: "lightgreen" }} />
                </p>

                <BackButton
                    className={styles["booking__backbtn"]}
                    link="/bookings/upcoming"
                ></BackButton>
            </div>

            <div className={styles["booking__details"]}>
                <div className={styles["booking__stay-details"]}>
                    <div className={styles["booking__stay-details--image"]}>
                        <Image
                            src={
                                booking.stay?.images?.[0] ||
                                "/assets/images/villa-1.svg"
                            }
                            width={100}
                            height={100}
                            alt={booking.stay?.name || "Stay"}
                        ></Image>
                    </div>
                    <div className={styles["booking__stay-details--details"]}>
                        <h4>
                            {booking.stay?.name ||
                                "CEO's Paradise - OneClick Exclusive"}
                        </h4>
                        <p>
                            ₹{" "}
                            {formatBookingAmount(pricing?.nightlyRate || 45500)}
                            /night
                        </p>
                        <p>{dateRange}</p>
                    </div>
                </div>

                <div className={styles["booking__price-breakup"]}>
                    <h2>Stay Price Breakup</h2>
                    <div className={styles["booking__price-breakup--item"]}>
                        <h4>
                            {booking.stay?.name ||
                                "CEO's Paradise - OneClick Exclusive"}
                        </h4>
                        <p>
                            ₹{formatBookingAmount(pricing?.stayTotal || 98000)}
                        </p>
                    </div>
                    <div className={styles["booking__price-breakup--item"]}>
                        <h4>SGST (9%)</h4>
                        <p>₹{formatBookingAmount(pricing?.sgst || 12000)}</p>
                    </div>
                    <div className={styles["booking__price-breakup--item"]}>
                        <h4>IGST (9%)</h4>
                        <p>₹{formatBookingAmount(pricing?.igst || 12000)}</p>
                    </div>
                    <div className={styles["booking__price-breakup--item"]}>
                        <h4>Grand Total</h4>
                        <p>
                            ₹
                            {formatBookingAmount(
                                pricing?.totalAmount || 124000
                            )}
                        </p>
                    </div>
                </div>

                <div className="container">
                    <Tag type="info">
                        <Image
                            src={"/assets/images/ocs-coin.svg"}
                            width={100}
                            height={100}
                            alt="OCS Coin"
                            className={styles["booking__coin-image"]}
                        ></Image>
                        <span className={styles["booking__coin-message"]}>
                            You have earned {booking.earnedCoins || 50} OCS
                            Coins
                        </span>
                    </Tag>
                </div>

                {booking.addOns && booking.addOns.length > 0 && (
                    <div className={styles["booking__addons"]}>
                        <h2>Selected Add-ons</h2>
                        <p>You had requested these add-ons while booking.</p>
                        {booking.addOns.map((addon) => (
                            <div
                                key={addon.id}
                                className={styles["booking__addons--item"]}
                            >
                                <CheckCheck />
                                <h4>{addon.name}</h4>
                            </div>
                        ))}
                    </div>
                )}

                <div className={styles["padding"]}></div>
            </div>

            <Footer
                btnText="Customer Support"
                btnType="whatsapp"
                onClick={() => {
                    window.open(
                        "https://api.whatsapp.com/send/?phone=919899992197&text=Hi%2C+I+need+support+with+my+OneClick+Stays+booking.&type=phone_number&app_absent=0",
                        "_blank"
                    );
                }}
            ></Footer>
        </div>
    );
};

export default BookingDetails;
