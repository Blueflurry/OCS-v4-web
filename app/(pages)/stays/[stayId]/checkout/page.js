"use client";
import React, { useEffect, useState } from "react";
import styles from "./Checkout.module.scss";
import Footer from "@/app/modules/Footer";
import Image from "next/image";
import BackButton from "@/app/components/BackButton";
import { CheckCheck } from "lucide-react";
import { formatCurrency } from "@/app/utils/formatter";
import RazorpayButton from "@/app/components/RazorpayButton";
import { mockPaymentData } from "@/app/services/mockData";
import Loading from "../loading";
import { useParams } from "next/navigation";

const Checkout = () => {
    const params = useParams();
    const { stayId } = params;

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [stayDetails, setStayDetails] = useState(null);
    const [selectedAddOns, setSelectedAddOns] = useState([]);
    const [paymentIntent, setPaymentIntent] = useState(null);
    const [taxRates, setTaxRates] = useState({
        sgst: 9, // 9% State GST
        cgst: 9, // 9% Central GST
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);

                // Get stay basics from localStorage
                const stayBasics = localStorage.getItem("stayBasics");
                if (!stayBasics) {
                    throw new Error(
                        "Stay details not found. Please return to stay details page."
                    );
                }
                setStayDetails(JSON.parse(stayBasics));

                // Get payment intent ID from localStorage
                const paymentIntentId = localStorage.getItem("paymentIntentId");
                if (!paymentIntentId) {
                    throw new Error(
                        "Payment information not found. Please start the booking process again."
                    );
                }

                // Get selected add-ons from localStorage
                const addons = localStorage.getItem("selectedAddOns");
                if (addons) {
                    setSelectedAddOns(JSON.parse(addons));
                }

                // In a real app, you would fetch the payment intent from the API
                // For this demo, we're using the mock data and simulating a fetch
                // Simulate API fetch delay
                await new Promise((resolve) => setTimeout(resolve, 500));

                // Use mock payment data or construct from stayBasics
                const stayBasicsObj = JSON.parse(stayBasics);
                const nights = stayBasicsObj.nights || 7;
                const stayPrice = stayBasicsObj.pricing.currentPrice * nights;
                const gstAmount = Math.round(stayPrice * 0.18); // 18% GST

                const paymentIntentData = {
                    id: paymentIntentId,
                    stayId: stayId,
                    stayName: stayBasicsObj.name,
                    stayImage: stayBasicsObj.image,
                    checkin: stayBasicsObj.checkin,
                    checkout: stayBasicsObj.checkout,
                    nights: nights,
                    guests: stayBasicsObj.guests || 2,
                    pricing: {
                        stayPrice: stayPrice,
                        sgst: Math.round(stayPrice * (taxRates.sgst / 100)),
                        cgst: Math.round(stayPrice * (taxRates.cgst / 100)),
                        totalAmount: stayPrice + gstAmount,
                    },
                    addOns: addons ? JSON.parse(addons) : [],
                    createdAt: new Date().toISOString(),
                    status: "created",
                };

                setPaymentIntent(paymentIntentData);
            } catch (err) {
                console.error("Error in Checkout page:", err);
                setError(err.message || "Something went wrong");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [stayId, taxRates]);

    const handlePaymentSuccess = (response) => {
        console.log("Payment successful:", response);
        // Additional success handling if needed
    };

    const handlePaymentError = (error) => {
        console.error("Payment error:", error);
        setError("Payment failed. Please try again.");
    };

    // Custom Footer with Razorpay button
    const CustomFooter = () => (
        <div className={styles["footer"]}>
            <div className={styles["button-container"]}>
                {paymentIntent && (
                    <RazorpayButton
                        amount={paymentIntent.pricing.totalAmount}
                        paymentIntentId={paymentIntent.id}
                        stayId={stayId}
                        onSuccess={handlePaymentSuccess}
                        onError={handlePaymentError}
                    />
                )}
            </div>
        </div>
    );

    if (isLoading) {
        return <Loading />;
    }

    if (error) {
        return <div className={styles["error"]}>{error}</div>;
    }

    if (!paymentIntent || !stayDetails) {
        return (
            <div className={styles["error"]}>Booking information not found</div>
        );
    }

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
                                stayDetails.image ||
                                "/assets/images/villa-1.svg"
                            }
                            width={100}
                            height={100}
                            alt={stayDetails.name}
                        />
                    </div>
                    <div className={styles["checkout__stay-details--details"]}>
                        <h4>{stayDetails.name}</h4>
                        <p>
                            ₹ {formatCurrency(stayDetails.pricing.currentPrice)}
                            /night
                        </p>
                        <p>
                            {stayDetails.checkin} - {stayDetails.checkout}
                        </p>
                    </div>
                </div>

                <div className={styles["checkout__price-breakup"]}>
                    <h2>Stay Price Breakup</h2>
                    <div className={styles["checkout__price-breakup--item"]}>
                        <h4>
                            {stayDetails.name} ({paymentIntent.nights} nights)
                        </h4>
                        <p>
                            ₹{formatCurrency(paymentIntent.pricing.stayPrice)}
                        </p>
                    </div>
                    <div className={styles["checkout__price-breakup--item"]}>
                        <h4>CGST ({taxRates.cgst}%)</h4>
                        <p>₹{formatCurrency(paymentIntent.pricing.cgst)}</p>
                    </div>
                    <div className={styles["checkout__price-breakup--item"]}>
                        <h4>SGST ({taxRates.sgst}%)</h4>
                        <p>₹{formatCurrency(paymentIntent.pricing.sgst)}</p>
                    </div>
                    <div className={styles["checkout__price-breakup--item"]}>
                        <h4>Grand Total</h4>
                        <p>
                            ₹{formatCurrency(paymentIntent.pricing.totalAmount)}
                        </p>
                    </div>
                </div>

                {selectedAddOns && selectedAddOns.length > 0 && (
                    <div className={styles["checkout__addons"]}>
                        <h2>Requested Add-ons</h2>
                        <p>
                            Our team will contact you to discuss these add-ons.
                        </p>
                        {selectedAddOns.map((addon, index) => (
                            <div
                                key={index}
                                className={styles["checkout__addons--item"]}
                            >
                                <CheckCheck />
                                <h4>{addon.name}</h4>
                            </div>
                        ))}
                    </div>
                )}

                <div className={styles["padding"]}></div>
            </div>

            <CustomFooter />
        </div>
    );
};

export default Checkout;
