"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import styles from "./RazorpayButton.module.scss";
import { isAuthenticated } from "@/app/services/authService";
import {
    createPaymentOrder,
    verifyPayment,
} from "@/app/services/paymentService";
import { REQUIRE_LOGIN_FOR_CHECKOUT } from "@/app/data/config";

/**
 * RazorpayButton Component - Handles payment processing via Razorpay
 *
 * @param {Object} props
 * @param {string} props.amount - Amount in INR (will be converted to paise)
 * @param {string} props.paymentIntentId - Payment intent ID (booking ID)
 * @param {string} props.stayId - ID of the stay being booked
 * @param {string} props.checkInDate - Check-in date
 * @param {string} props.checkOutDate - Check-out date
 * @param {Object} props.guests - Guest information
 * @returns {JSX.Element}
 */
const RazorpayButton = ({
    amount,
    paymentIntent,
    paymentIntentId,
    stayId,
    checkInDate,
    checkOutDate,
    guests,
}) => {
    const [loading, setLoading] = useState(false);
    const [razorpayLoaded, setRazorpayLoaded] = useState(false);
    const [error, setError] = useState(null);
    const razorpayInstance = useRef(null);
    const router = useRouter();
    const [user, setUser] = useState(null);

    // Move localStorage access into useEffect
    useEffect(() => {
        // This code will only run on the client side
        const userFromStorage = localStorage.getItem("user");

        if (userFromStorage) {
            setUser(JSON.parse(userFromStorage));
        }
    }, []);

    useEffect(() => {
        // Check if script is already loaded
        if (window.Razorpay) {
            // console.log("Razorpay already loaded");
            setRazorpayLoaded(true);
            return;
        }

        // Create and load script
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        script.defer = true;

        script.onload = () => {
            // console.log("Razorpay script loaded successfully");
            setRazorpayLoaded(true);
        };

        script.onerror = (error) => {
            // console.error("Error loading Razorpay script:", error);
            setError("Failed to load payment gateway. Please try again later.");
        };

        document.body.appendChild(script);

        // Cleanup function
        return () => {
            // We don't remove the script as it might be used by other components
            if (razorpayInstance.current) {
                try {
                    razorpayInstance.current.close();
                } catch (e) {
                    console.error("Error closing Razorpay instance:", e);
                }
            }
        };
    }, []);

    const handlePaymentSuccess = async (response, bookingInfo) => {
        // Create payment data for verification
        const paymentData = {
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
        };

        // Verify payment with backend after success
        const verificationResult = await verifyPayment(paymentData);

        if (verificationResult.success) {
            // Payment verified successfully

            // Update localStorage with booking ID and payment ID
            const updatedBooking = {
                ...bookingInfo,
                paymentId: response.razorpay_payment_id,
                bookingId: verificationResult.bookingId,
            };

            localStorage.setItem("booking", JSON.stringify(updatedBooking));
            return verificationResult;
        } else {
            // Payment verification failed
            throw new Error(
                verificationResult.message || "Payment verification failed"
            );
        }
    };

    // const handlePaymentError = (error) => {
    //     console.error("Payment error:", error);
    //     setError("Payment failed. Please try again.");
    // };

    // Handle the payment process
    const handlePayment = async () => {
        if (!razorpayLoaded) {
            // console.log("Payment gateway is still loading. Please wait.");
            return;
        }

        if (loading) {
            return;
        }

        // Check if login is required for checkout
        if (REQUIRE_LOGIN_FOR_CHECKOUT && !isAuthenticated()) {
            setError("Please login to continue with checkout");
            // Save current payment info to resume after login
            localStorage.setItem(
                "pendingPayment",
                JSON.stringify({
                    amount,
                    paymentIntentId,
                    stayId,
                    checkInDate,
                    checkOutDate,
                    guests,
                })
            );
            // Redirect to login page
            router.push("/login?redirect=checkout");
            return;
        }

        try {
            setLoading(true);
            setError(null);

            // Get the Razorpay order ID from our API
            const paymentDetails = {
                stayId,
                checkInDate,
                checkOutDate,
                guests,
                amount: Number(amount),
                // order_id: paymentIntent.razorpayOrderId,
            };

            const orderData = await createPaymentOrder(
                paymentIntentId,
                paymentDetails
            );

            if (!orderData || !orderData.razorpayOrderId) {
                throw new Error("Failed to create payment order");
            }

            // Store booking info in localStorage for later retrieval
            const bookingInfo = {
                stayId,
                amount: Number(amount),
                checkInDate,
                checkOutDate,
                guests,
            };

            localStorage.setItem("booking", JSON.stringify(bookingInfo));

            // Convert amount to paise for Razorpay
            const amountInPaise = Math.round(Number(amount) * 100);
            // console.log(`Amount: ${amount} INR (${amountInPaise} paise)`);

            // Configure Razorpay options
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: amountInPaise,
                currency: "INR",
                // name: "OneClick Stays",
                // description: "Luxury Accommodation",
                // image: "/assets/images/icon.svg", // Your brand logo
                order_id: orderData.razorpayOrderId, // Using order ID from API
                handler: async function (response) {
                    try {
                        const result = await handlePaymentSuccess(
                            response,
                            bookingInfo
                        );

                        if (result) {
                            router.push(`/stays/${stayId}/payment-success`);
                        }
                    } catch (error) {
                        console.error("Payment verification failed:", error);
                        setError(
                            error.message ||
                                "Payment verification failed. Please try again."
                        );
                        setLoading(false);

                        // Redirect back to checkout page
                        router.push(`/stays/${stayId}/checkout`);
                    }
                },
                prefill: {
                    name: user && user.fullName ? user.fullName : "",
                    email: user && user.email ? user.email : "",
                    contact:
                        user && user.phone
                            ? user.phone.countryCode + user.phone.number
                            : "",
                    // vpa: "", // Explicitly set empty VPA
                },
                // remember_customer: false,

                notes: {
                    stayId: stayId,
                    checkInDate: checkInDate,
                    checkOutDate: checkOutDate,
                    guests: JSON.stringify(guests),
                },
                // theme: { color: "#ffb401" },
                modal: {
                    ondismiss: function () {
                        setLoading(false);
                        // console.log("Payment modal dismissed");
                    },
                    escape: true,
                },
            };

            // Initialize Razorpay
            const razor = new window.Razorpay(options);
            razorpayInstance.current = razor;

            // Handle payment failure
            razor.on("payment.failed", function (response) {
                console.error("Payment Failed:", response.error);
                setError(
                    response.error?.description ||
                        "Payment failed. Please try again."
                );
                setLoading(false);

                // Redirect back to checkout page
                router.push(`/stays/${stayId}/checkout`);
            });

            // Open Razorpay checkout
            razor.open();
        } catch (error) {
            console.error("Payment initialization error:", error);
            setError("Failed to initialize payment. Please try again.");
            setLoading(false);
        }
    };

    return (
        <div>
            <div
                onClick={handlePayment}
                className={`${styles["razorpayBtn"]} ${
                    loading || !razorpayLoaded ? styles["disabled"] : ""
                }`}
            >
                {loading ? "Processing..." : "Pay now"}
            </div>

            {error && <div className={styles.errorMessage}>{error}</div>}

            {!razorpayLoaded && !error && (
                <div className={styles.loadingMessage}>
                    Loading payment gateway...
                </div>
            )}
        </div>
    );
};

export default RazorpayButton;
