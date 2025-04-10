"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import styles from "./RazorpayButton.module.scss";
import { isAuthenticated } from "@/app/services/authService";
import {
    createPaymentOrder,
    verifyPayment,
} from "@/app/services/stayDetailsService";

// Flag to control whether login is required for checkout
// Set to false to allow payments without login, true to require login
const REQUIRE_LOGIN_FOR_CHECKOUT = false;

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
 * @param {Function} props.onSuccess - Callback for successful payment
 * @param {Function} props.onError - Callback for failed payment
 * @returns {JSX.Element}
 */
const RazorpayButton = ({
    amount,
    paymentIntentId,
    stayId,
    checkInDate,
    checkOutDate,
    guests,
    onSuccess,
    onError,
}) => {
    const [loading, setLoading] = useState(false);
    const [razorpayLoaded, setRazorpayLoaded] = useState(false);
    const [error, setError] = useState(null);
    const razorpayInstance = useRef(null);
    const router = useRouter();

    // Load Razorpay script only once
    useEffect(() => {
        // Check if script is already loaded
        if (window.Razorpay) {
            console.log("Razorpay already loaded");
            setRazorpayLoaded(true);
            return;
        }

        // Create and load script
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        script.defer = true;

        script.onload = () => {
            console.log("Razorpay script loaded successfully");
            setRazorpayLoaded(true);
        };

        script.onerror = (error) => {
            console.error("Error loading Razorpay script:", error);
            setError("Failed to load payment gateway. Please try again later.");
            if (onError) onError("Failed to load payment gateway");
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
    }, [onError]);

    // Handle the payment process
    const handlePayment = async () => {
        if (!razorpayLoaded) {
            if (onError)
                onError("Payment gateway is still loading. Please wait.");
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
            };

            const orderData = await createPaymentOrder(
                paymentIntentId,
                paymentDetails
            );

            if (!orderData || !orderData.orderId) {
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
            console.log(`Amount: ${amount} INR (${amountInPaise} paise)`);

            // Configure Razorpay options
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: amountInPaise,
                currency: "INR",
                name: "OneClick Stays",
                description: "Luxury Accommodation",
                image: "/assets/images/icon.svg", // Your brand logo
                order_id: orderData.orderId, // Using order ID from API
                handler: async function (response) {
                    try {
                        console.log("Payment Success:", response);

                        // Extract payment verification details
                        const {
                            razorpay_payment_id,
                            razorpay_order_id,
                            razorpay_signature,
                        } = response;

                        // Create payment data for verification
                        const paymentData = {
                            bookingId: paymentIntentId,
                            stayId,
                            amount: Number(amount),
                            razorpay_payment_id,
                            razorpay_order_id,
                            razorpay_signature,
                        };

                        // Verify payment with backend
                        const verificationResult = await verifyPayment(
                            paymentData
                        );

                        if (verificationResult.success) {
                            // Payment verified successfully

                            // Update localStorage with booking ID and payment ID
                            const updatedBooking = {
                                ...bookingInfo,
                                paymentId: razorpay_payment_id,
                                bookingId:
                                    verificationResult.bookingId ||
                                    paymentIntentId,
                            };

                            localStorage.setItem(
                                "booking",
                                JSON.stringify(updatedBooking)
                            );

                            // Call success callback if provided
                            if (onSuccess) {
                                onSuccess(verificationResult);
                            }

                            // Navigate to success page
                            router.push(`/stays/${stayId}/payment-success`);
                        } else {
                            // Payment verification failed
                            throw new Error(
                                verificationResult.message ||
                                    "Payment verification failed"
                            );
                        }
                    } catch (error) {
                        console.error("Payment verification failed:", error);
                        setError(
                            error.message ||
                                "Payment verification failed. Please try again."
                        );
                        setLoading(false);
                        if (onError)
                            onError(
                                error.message || "Payment processing failed"
                            );

                        // Redirect back to checkout page
                        router.push(`/stays/${stayId}/checkout`);
                    }
                },
                prefill: {
                    name: "",
                    email: "",
                    contact: "",
                },
                notes: {
                    stayId: stayId,
                    checkInDate: checkInDate,
                    checkOutDate: checkOutDate,
                    guests: JSON.stringify(guests),
                },
                theme: { color: "#3399cc" },
                modal: {
                    ondismiss: function () {
                        setLoading(false);
                        console.log("Payment modal dismissed");
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
                if (onError)
                    onError(
                        response.error?.description ||
                            "Payment failed. Please try again."
                    );

                // Redirect back to checkout page
                router.push(`/stays/${stayId}/checkout`);
            });

            // Open Razorpay checkout
            razor.open();
        } catch (error) {
            console.error("Payment initialization error:", error);
            setError("Failed to initialize payment. Please try again.");
            setLoading(false);
            if (onError) onError(error.message || "Payment process failed.");
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
