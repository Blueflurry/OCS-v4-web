"use client";
import React, { useEffect, useState } from "react";
import styles from "./PaymentSuccess.module.scss";
// import Footer from "@/app/modules/Footer";
import Tag from "@/app/components/Tag";
import Image from "next/image";
// import Lottie from "lottie-react";
import successAnimation from "@/app/assets/success.json";
import dynamic from "next/dynamic";
import Button from "@/app/components/Button";
import Link from "next/link";
import { Copy } from "lucide-react";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const PaymentSuccess = () => {
    const [animationFlag, setAnimationFlag] = useState(false);
    const [booking, setBooking] = useState(null);
    const [stayName, setStayName] = useState("");
    const [copied, setCopied] = useState(false);

    // Retrieve booking data and stay name when component mounts
    useEffect(() => {
        try {
            // Get booking details
            const storedBooking = localStorage.getItem("booking");
            if (storedBooking) {
                setBooking(JSON.parse(storedBooking));
            }

            // Get stay name from stayBasics in localStorage
            const stayBasics = localStorage.getItem("stayBasics");
            if (stayBasics) {
                const stayData = JSON.parse(stayBasics);
                setStayName(stayData.name || "");
            }
        } catch (error) {
            console.error("Error retrieving data:", error);
        }
    }, []);

    // Copy booking ID to clipboard
    const copyToClipboard = async () => {
        if (!booking?.bookingId) return;

        try {
            await navigator.clipboard.writeText(booking.bookingId);
            setCopied(true);

            // Reset the copied state after 2 seconds
            setTimeout(() => {
                setCopied(false);
            }, 2000);
        } catch (error) {
            console.error("Failed to copy booking ID:", error);
        }
    };

    // Format guest information
    const formatGuests = () => {
        if (!booking?.guests) return "";

        const { adults = 0, children = 0 } = booking.guests;
        const totalGuests = adults + children;

        if (totalGuests === 0) return "";

        let guestText = `${totalGuests} Guest${totalGuests > 1 ? "s" : ""}`;

        if (adults > 0 && children > 0) {
            guestText += ` (${adults} Adult${
                adults > 1 ? "s" : ""
            }, ${children} Child${children > 1 ? "ren" : ""})`;
        }

        return guestText;
    };

    // Calculate coins (default to 50 if no booking amount available)
    const coinsOnBooking = booking?.amount
        ? Math.round(booking.amount * 0.01)
        : 50;

    // Get booking link (default to /bookings/24 if no booking ID available)
    const bookingLink = booking?.bookingId
        ? `/bookings/${booking.bookingId}`
        : "/bookings/24";

    const handleAnimationEnterFrame = (frame) => {
        // console.log("frame", frame);
        setTimeout(() => {
            setAnimationFlag(true);
        }, 800);
    };

    return (
        <div className={styles["payment"]}>
            <div className={styles["payment__header"]}>
                {/* animation */}
                <Lottie
                    animationData={successAnimation}
                    loop={false}
                    onEnterFrame={handleAnimationEnterFrame}
                />

                {animationFlag ? (
                    <div className={styles["payment__content"]}>
                        <h2>Hurray!</h2>
                        <p>Payment Completed Successfully.</p>

                        {/* Booking ID with copy button */}
                        {booking?.bookingId && (
                            <div className={styles["bookingId"]}>
                                Booking ID: <span>{booking.bookingId}</span>
                                {/* <div
                                    className={styles["copyIcon"]}
                                    onClick={copyToClipboard}
                                    title="Copy Booking ID"
                                >
                                    <Copy></Copy>
                                    {copied && (
                                        <span className={styles["copied"]}>
                                            Copied!
                                        </span>
                                    )}
                                </div> */}
                            </div>
                        )}

                        {/* Stay name (only shown if available) */}
                        {/* {stayName && (
                            <div className={styles["stayName"]}>
                                Stay: <span>{stayName}</span>
                            </div>
                        )} */}

                        {/* Stay dates and guests (only shown if available) */}
                        {booking?.checkInDate && booking?.checkOutDate && (
                            <div className={styles["stayDates"]}>
                                <span>
                                    {new Date(
                                        booking.checkInDate
                                    ).toLocaleDateString("en-IN", {
                                        day: "numeric",
                                        month: "short",
                                    })}{" "}
                                    -{" "}
                                    {new Date(
                                        booking.checkOutDate
                                    ).toLocaleDateString("en-IN", {
                                        day: "numeric",
                                        month: "short",
                                    })}
                                </span>
                                {formatGuests() && ` • ${formatGuests()}`}
                            </div>
                        )}

                        <Tag type="info">
                            <Image
                                src={"/assets/images/ocs-coin.svg"}
                                width={100}
                                height={100}
                                alt="OCS Coin"
                                className={styles["payment__coin-image"]}
                            ></Image>
                            <span className={styles["payment__coin-message"]}>
                                You have earned {coinsOnBooking} OCS Coins
                            </span>
                        </Tag>

                        <Link
                            href={bookingLink}
                            className={styles["payment__bookingBtn"]}
                        >
                            <Button type="outline" large>
                                View Booking
                                <Image
                                    src="/assets/images/arrow-forward.svg"
                                    width={20}
                                    height={20}
                                    alt="arrow"
                                ></Image>
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <></>
                )}
            </div>

            {/* <Footer /> */}
        </div>
    );
};

export default PaymentSuccess;
