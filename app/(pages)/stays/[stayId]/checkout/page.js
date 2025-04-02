"use client";

import React, { useState, useEffect } from "react";
import styles from "./Checkout.module.scss";
import Footer from "@/app/modules/Footer";
import Image from "next/image";
import BackButton from "@/app/components/BackButton";
import { CheckCheck } from "lucide-react";
import { dummyStaysData, dummyAddonsData } from "@/app/constants/dummy";
import RazorpayButton from "@/app/components/RazorpayButton";

const Checkout = ({ params }) => {
    // const { stayId } = params;
    const unwrappedParams = React.use(params);
    const { stayId } = unwrappedParams;
    const [stayData, setStayData] = useState(null);
    const [addons, setAddons] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [paymentData, setPaymentData] = useState(null);

    useEffect(() => {
        const fetchCheckoutData = async () => {
            setIsLoading(true);
            setError(null);

            try {
                // MOCK DATA MODE - Use dummy data
                // Find the stay with matching ID
                const stay = dummyStaysData.find(
                    (stay) => stay.id.toString() === stayId.toString()
                );

                if (!stay) {
                    throw new Error("Stay not found");
                }

                // Get selected addons (simulate by picking some random addons)
                const selectedAddons = dummyAddonsData.addons
                    .filter((_, index) => index % 3 === 0) // Just pick every third addon for demo
                    .map((addon) => ({
                        id: addon.id,
                        serviceName: addon.serviceName,
                    }));

                // Calculate pricing details
                const stayPrice = parseInt(
                    stay.price.discounted.replace(/[^\d]/g, "")
                );
                const sgst = Math.round(stayPrice * 0.08);
                const igst = Math.round(stayPrice * 0.08);
                const grandTotal = stayPrice + sgst + igst;

                // Set payment data for Razorpay
                setPaymentData({
                    stayId: stayId,
                    stayName: stay.title,
                    amount: grandTotal * 100, // in paise for Razorpay
                    currency: "INR",
                    pricing: {
                        stayPrice,
                        sgst,
                        igst,
                        grandTotal,
                    },
                    checkIn: "2025-03-24",
                    checkOut: "2025-03-30",
                    selectedAddons,
                });

                setStayData(stay);
                setAddons(selectedAddons);

                // REAL API MODE - Uncomment this section when your API is ready
                /*
                // Fetch checkout data from API
                const response = await fetch(`/api/stays/${stayId}/checkout`, {
                    cache: "no-store"
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch checkout data: ${response.status}`);
                }

                const data = await response.json();
                setStayData(data.stayDetails);
                setAddons(data.selectedAddons);
                setPaymentData({
                    stayId: stayId,
                    stayName: data.stayDetails.title,
                    amount: data.pricing.grandTotal * 100, // in paise for Razorpay
                    currency: "INR",
                    pricing: data.pricing,
                    checkIn: data.checkIn,
                    checkOut: data.checkOut,
                    selectedAddons: data.selectedAddons
                });
                */

                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching checkout data:", error);
                setError(error.message || "Failed to load checkout data");
                setIsLoading(false);
            }
        };

        fetchCheckoutData();
    }, [stayId]);

    // Handle successful payment callback from Razorpay
    const handlePaymentSuccess = async (paymentResponse) => {
        try {
            console.log("Payment successful, processing confirmation...");

            // MOCK API CALL - Comment out when real API is ready
            console.log("Payment confirmed with backend", {
                paymentId: paymentResponse.razorpay_payment_id,
                orderId: paymentResponse.razorpay_order_id,
                signature: paymentResponse.razorpay_signature,
                stayId: paymentData.stayId,
                amount: paymentData.amount,
            });

            // REAL API CALL - Uncomment when your API is ready
            /*
            // Call backend API to confirm payment
            const response = await fetch('/api/payments/confirm', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    paymentId: paymentResponse.razorpay_payment_id,
                    orderId: paymentResponse.razorpay_order_id,
                    signature: paymentResponse.razorpay_signature,
                    stayId: paymentData.stayId,
                    amount: paymentData.amount
                })
            });
            
            if (!response.ok) {
                throw new Error('Failed to confirm payment with server');
            }
            
            const data = await response.json();
            console.log('Payment confirmation successful:', data);
            */

            // No need to navigate here, Razorpay button already handles navigation
        } catch (error) {
            console.error("Error confirming payment:", error);
            alert(
                "Payment was processed but confirmation failed. Please contact support."
            );
        }
    };

    if (isLoading) {
        return (
            <div className={styles["checkout"]}>
                <div className={styles["checkout__loading"]}>
                    <p>Loading checkout details...</p>
                </div>
            </div>
        );
    }

    if (error || !stayData) {
        return (
            <div className={styles["checkout"]}>
                <div className={styles["checkout__error"]}>
                    <h3>Error loading checkout</h3>
                    <p>{error || "Unable to load checkout details"}</p>
                    <button onClick={() => window.history.back()}>
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    // Format currency
    const formatCurrency = (amount) => {
        return `₹${amount.toLocaleString("en-IN")}`;
    };

    return (
        <div className={styles["checkout"]}>
            <div className={styles["checkout__header"]}>
                <h2>Checkout</h2>
                <BackButton />
            </div>

            <div className={styles["checkout__details"]}>
                <div className={styles["checkout__stay-details"]}>
                    <div className={styles["checkout__stay-details--image"]}>
                        <Image
                            src={
                                stayData.bannerImage ||
                                "/assets/images/villa-1.svg"
                            }
                            width={100}
                            height={100}
                            alt="villa"
                        />
                    </div>
                    <div className={styles["checkout__stay-details--details"]}>
                        <h4>{stayData.title}</h4>
                        <p>{stayData.price?.discounted}</p>
                        <p>
                            {new Date(paymentData.checkIn).toLocaleDateString(
                                "en-US",
                                {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                }
                            )}{" "}
                            -
                            {new Date(paymentData.checkOut).toLocaleDateString(
                                "en-US",
                                {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                }
                            )}
                        </p>
                    </div>
                </div>

                <div className={styles["checkout__price-breakup"]}>
                    <h2>Stay Price Breakup</h2>
                    <div className={styles["checkout__price-breakup--item"]}>
                        <h4>{stayData.title}</h4>
                        <p>{formatCurrency(paymentData.pricing.stayPrice)}</p>
                    </div>
                    <div className={styles["checkout__price-breakup--item"]}>
                        <h4>SGST (8%)</h4>
                        <p>{formatCurrency(paymentData.pricing.sgst)}</p>
                    </div>
                    <div className={styles["checkout__price-breakup--item"]}>
                        <h4>IGST (8%)</h4>
                        <p>{formatCurrency(paymentData.pricing.igst)}</p>
                    </div>
                    <div className={styles["checkout__price-breakup--item"]}>
                        <h4>Grand Total</h4>
                        <p>{formatCurrency(paymentData.pricing.grandTotal)}</p>
                    </div>
                </div>

                {addons.length > 0 && (
                    <div className={styles["checkout__addons"]}>
                        <h2>Requested Add-ons</h2>
                        <p>
                            Our team will contact you to discuss these add-ons.
                        </p>
                        {addons.map((addon) => (
                            <div
                                key={addon.id}
                                className={styles["checkout__addons--item"]}
                            >
                                <CheckCheck />
                                <h4>{addon.serviceName}</h4>
                            </div>
                        ))}
                    </div>
                )}

                <div className={styles["padding"]}></div>
            </div>

            <Footer btnText="Proceed to pay" btnType="razorpay">
                {paymentData && (
                    <RazorpayButton
                        paymentData={paymentData}
                        onPaymentSuccess={handlePaymentSuccess}
                    />
                )}
            </Footer>
        </div>
    );
};

export default Checkout;
