"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import styles from "./RazorpayButton.module.scss";
import { createPayment } from "@/app/services/stayDetailsService";

/**
 * RazorpayButton Component - Handles payment processing via Razorpay
 *
 * @param {Object} props
 * @param {string} props.amount - Amount in INR (will be converted to paise)
 * @param {string} props.paymentIntentId - Payment intent ID (will be replaced with test order ID in test mode)
 * @param {string} props.stayId - ID of the stay being booked
 * @param {string} props.checkInDate - Check-in date
 * @param {string} props.checkOutDate - Check-out date
 * @param {Object} props.guests - Guest information
 * @param {Function} props.onSuccess - Callback for successful payment
 * @param {Function} props.onError - Callback for failed payment
 * @param {boolean} props.testMode - Whether to use test mode with predefined test order ID
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
    testMode = true, // Set to true for testing with a test order ID
}) => {
    const [loading, setLoading] = useState(false);
    const [razorpayLoaded, setRazorpayLoaded] = useState(false);
    const [error, setError] = useState(null);
    const razorpayInstance = useRef(null);
    const router = useRouter();

    // Test order ID for Razorpay testing
    // Format: "order_" followed by alphanumeric characters
    const TEST_ORDER_ID = "order_MoCkTeStOrDeR12345678";

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

    // Get order ID (use test order ID in test mode)
    const getOrderId = async () => {
        try {
            // If in test mode, use the test order ID
            if (testMode) {
                console.log("Using test order ID:", TEST_ORDER_ID);
                return TEST_ORDER_ID;
            }

            // In production, use the provided paymentIntentId or create a new order
            if (paymentIntentId) {
                console.log("Using provided order ID:", paymentIntentId);
                return paymentIntentId;
            }

            // If neither test mode nor paymentIntentId is available, handle the error
            throw new Error("No order ID available");
        } catch (error) {
            console.error("Error getting order ID:", error);
            setError("Failed to initialize payment. Please try again.");
            setLoading(false);
            if (onError)
                onError(error.message || "Payment initialization failed");
            return null;
        }
    };

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

        try {
            setLoading(true);
            setError(null);

            // Get the order ID (test or real)
            const orderId = await getOrderId();
            if (!orderId) {
                return; // Error already handled in getOrderId
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
                // order_id: orderId,
                handler: async function (response) {
                    try {
                        console.log("Payment Success:", response);

                        // Extract payment verification details
                        const {
                            razorpay_payment_id,
                            razorpay_order_id,
                            razorpay_signature,
                        } = response;

                        // Create customer details object from response
                        const customerDetails = {
                            name: response.razorpay_prefill?.name || "",
                            email: response.razorpay_prefill?.email || "",
                            phone: response.razorpay_prefill?.contact || "",
                        };

                        // Create payment data for API
                        const paymentData = {
                            paymentIntentId: orderId,
                            stayId,
                            checkInDate,
                            checkOutDate,
                            guests,
                            amount: Number(amount),
                            customerDetails,
                            razorpay_payment_id,
                            razorpay_order_id,
                            razorpay_signature,
                        };

                        // If in test mode, log the data instead of sending to API
                        if (testMode) {
                            console.log("Test Mode: Payment data", paymentData);

                            // Simulate API response
                            const simulatedResult = {
                                success: true,
                                bookingId: "test_booking_" + Date.now(),
                                message: "Test payment successful",
                            };

                            // Update localStorage with test booking ID
                            const updatedBooking = {
                                ...bookingInfo,
                                paymentId: razorpay_payment_id,
                                bookingId: simulatedResult.bookingId,
                            };

                            localStorage.setItem(
                                "booking",
                                JSON.stringify(updatedBooking)
                            );

                            // Call success callback if provided
                            if (onSuccess) {
                                onSuccess(simulatedResult);
                            }

                            // Navigate to success page
                            // callback_url: "http://localhost:3000/stays/24/payment-success",
                            router.push(`/stays/${stayId}/payment-success`);
                        } else {
                            // Call your payment API in production mode
                            const result = await createPayment(paymentData);

                            // Update localStorage with real booking ID
                            const updatedBooking = {
                                ...bookingInfo,
                                paymentId: razorpay_payment_id,
                                bookingId:
                                    result.bookingId || razorpay_order_id,
                            };

                            localStorage.setItem(
                                "booking",
                                JSON.stringify(updatedBooking)
                            );

                            // Call success callback if provided
                            if (onSuccess) {
                                onSuccess(result);
                            }

                            // Navigate to success page
                            router.push("/payment-success");
                        }
                    } catch (error) {
                        console.error("Payment verification failed:", error);
                        if (onError)
                            onError(
                                error.message || "Payment processing failed"
                            );
                        setLoading(false);
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
                if (onError)
                    onError(
                        response.error?.description ||
                            "Payment failed. Please try again."
                    );
                setLoading(false);
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

    // Removed the separate handlePaymentSuccess function as it's now included
    // directly in the handler function within handlePayment

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

            {/* {testMode && (
                <div className={styles.testModeIndicator}>
                    Test Mode: Using test order ID
                </div>
            )} */}
        </div>
    );
};

export default RazorpayButton;
