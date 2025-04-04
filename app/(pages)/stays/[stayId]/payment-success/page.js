// app/payment-success/page.js
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PaymentSuccessPage() {
    const [booking, setBooking] = useState(null);
    const [animationComplete, setAnimationComplete] = useState(false);
    const [coinCount, setCoinCount] = useState(0);
    const router = useRouter();

    useEffect(() => {
        // Get booking data from localStorage
        const bookingData = localStorage.getItem("booking");
        if (!bookingData) {
            // Redirect to home if no booking data is found
            router.push("/");
            return;
        }

        try {
            const parsedBooking = JSON.parse(bookingData);
            setBooking(parsedBooking);

            // Calculate reward coins (1 coin per ₹100 spent)
            const rewardCoins = Math.floor(parsedBooking.amount / 100);

            // Animate coin counter
            let count = 0;
            const interval = setInterval(() => {
                count = Math.min(
                    count + Math.ceil(rewardCoins / 15),
                    rewardCoins
                );
                setCoinCount(count);
                if (count >= rewardCoins) {
                    clearInterval(interval);

                    // Complete animation after a delay
                    setTimeout(() => {
                        setAnimationComplete(true);
                    }, 1000);
                }
            }, 100);

            return () => clearInterval(interval);
        } catch (error) {
            console.error("Error parsing booking data:", error);
        }
    }, [router]);

    if (!booking) {
        return (
            <div className="loading-container">
                <div className="loader"></div>
                <p className="loading-text">Loading...</p>
            </div>
        );
    }

    return (
        <div className="success-page-container">
            <div className="success-card">
                <div className="success-header">
                    <div className="success-icon-container">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="success-icon"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>
                    <h1 className="success-title">Payment Successful!</h1>
                    <p className="success-subtitle">
                        Your luxury stay is confirmed
                    </p>
                </div>

                <div className="success-content">
                    <div className="booking-details">
                        <h2 className="section-title">Booking Details</h2>
                        <div className="booking-info">
                            <div className="info-row">
                                <div className="info-label">Booking ID:</div>
                                <div className="info-value">
                                    {booking.bookingId}
                                </div>
                            </div>

                            <div className="info-row">
                                <div className="info-label">Check-in:</div>
                                <div className="info-value">
                                    {new Date(
                                        booking.checkInDate
                                    ).toLocaleDateString()}
                                </div>
                            </div>

                            <div className="info-row">
                                <div className="info-label">Check-out:</div>
                                <div className="info-value">
                                    {new Date(
                                        booking.checkOutDate
                                    ).toLocaleDateString()}
                                </div>
                            </div>

                            <div className="info-row">
                                <div className="info-label">Amount Paid:</div>
                                <div className="info-value">
                                    ₹{booking.amount.toLocaleString("en-IN")}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="rewards-container">
                        <div className="rewards-content">
                            <div className="rewards-icon-container">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="rewards-icon"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                            <div>
                                <h3 className="rewards-title">
                                    Reward Coins Earned
                                </h3>
                                <div className="rewards-count">{coinCount}</div>
                            </div>
                        </div>
                    </div>

                    <div className="action-buttons">
                        <Link
                            href={`/bookings/${booking.bookingId}`}
                            className="primary-button"
                        >
                            View Booking Details
                        </Link>

                        <Link href="/" className="secondary-button">
                            Return to Home
                        </Link>
                    </div>
                </div>
            </div>

            {!animationComplete && (
                <div className="animation-container">
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className="coin-animation"
                            style={{
                                top: "60%",
                                left: `${40 + Math.random() * 20}%`,
                                animationDelay: `${Math.random() * 2}s`,
                                animationDuration: `${1 + Math.random() * 2}s`,
                            }}
                        >
                            <div className="coin-inner"></div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
