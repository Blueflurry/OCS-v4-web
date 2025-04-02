"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import styles from "./RazorpayButton.module.scss";

const RazorpayButton = ({ paymentData, onPaymentSuccess }) => {
    const [loading, setLoading] = useState(false);
    const [razorpayLoaded, setRazorpayLoaded] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        script.onload = () => setRazorpayLoaded(true);
        document.body.appendChild(script);
    }, []);

    const handlePayment = async () => {
        if (!razorpayLoaded) {
            return;
        }

        if (!paymentData) {
            console.error("Payment data is missing");
            return;
        }

        setLoading(true);
        try {
            const options = {
                key:
                    process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ||
                    "rzp_test_8NNW1TYS0UtF2K", // Fallback to test key
                amount: paymentData.amount, // Amount in paise
                currency: paymentData.currency || "INR",
                name: "OneClick Stays",
                description: `Booking for ${paymentData.stayName}`,
                image: "/assets/images/icon.svg",
                handler: function (response) {
                    console.log("Payment Success:", response);

                    // Call the callback function to notify parent component
                    if (
                        onPaymentSuccess &&
                        typeof onPaymentSuccess === "function"
                    ) {
                        onPaymentSuccess(response);
                    }

                    // Navigate to bookings page
                    router.push(`/bookings/${paymentData.stayId}`);
                },
                prefill: {
                    name: "Test User",
                    email: "test@example.com",
                    contact: "9999999999",
                },
                notes: {
                    stayId: paymentData.stayId,
                    checkIn: paymentData.checkIn,
                    checkOut: paymentData.checkOut,
                },
                theme: { color: "#000000" },
            };

            const razor = new window.Razorpay(options);

            // Handle payment failure
            razor.on("payment.failed", function (response) {
                console.error("Payment Failed:", response);
                alert("Payment failed. Please try again.");
            });

            razor.open();
        } catch (error) {
            console.error("Error initializing payment:", error);
            alert("Payment process failed. Please try again.");
        }
        setLoading(false);
    };

    return (
        <div
            onClick={handlePayment}
            disabled={loading || !razorpayLoaded}
            className={styles["razorpayBtn"]}
        >
            {loading ? "Processing..." : "Pay now"}
        </div>
    );
};

export default RazorpayButton;
