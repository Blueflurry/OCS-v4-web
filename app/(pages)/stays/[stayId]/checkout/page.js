"use client";
import React, { useEffect, useState } from "react";
import styles from "./Checkout.module.scss";
import Image from "next/image";
import BackButton from "@/app/components/BackButton";
import { CheckCheck } from "lucide-react";
import { formatCurrency } from "@/app/utils/formatter";
import RazorpayButton from "@/app/components/RazorpayButton";
import Loading from "../loading";
import { useParams, useRouter } from "next/navigation";
import Header from "@/app/modules/Header";
import { isAuthenticated } from "@/app/services/authService";
import { REQUIRE_LOGIN_FOR_CHECKOUT } from "@/app/data/config";

const Checkout = () => {
    const params = useParams();
    const router = useRouter();
    const { stayId } = params;

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [stayDetails, setStayDetails] = useState(null);
    const [selectedAddOns, setSelectedAddOns] = useState([]);
    const [paymentIntent, setPaymentIntent] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Check if login is required
                if (REQUIRE_LOGIN_FOR_CHECKOUT && !isAuthenticated()) {
                    // Redirect to login page with the return URL
                    router.push(`/login?redirect=/stays/${stayId}/checkout`);
                    return;
                }

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

                // Use mock payment data or construct from stayBasics
                const stayBasicsObj = JSON.parse(stayBasics);
                const nights = stayBasicsObj.nights || 7;

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
                        ...stayBasicsObj.pricing,
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
    }, [stayId, router]);

    // Custom Footer with Razorpay button
    const CustomFooter = () => (
        <div className={styles["footer"]}>
            <div className={styles["button-container"]}>
                {paymentIntent && (
                    <RazorpayButton
                        paymentIntent={paymentIntent}
                        amount={paymentIntent.pricing.totalPrice.toString()}
                        paymentIntentId={paymentIntent.id}
                        stayId={paymentIntent.stayId}
                        checkInDate={paymentIntent.checkin}
                        checkOutDate={paymentIntent.checkout}
                        guests={{
                            adults: paymentIntent.guests,
                            children: 0,
                        }}
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

    // if (!paymentIntent || !stayDetails) {
    //     return (
    //         <div className={styles["error"]}>Booking information not found</div>
    //     );
    // }

    return (
        <>
            {stayDetails && (
                <>
                    <Header />

                    <div className={styles["checkout"]}>
                        <div className={styles["checkout__header"]}>
                            <h2>Checkout</h2>
                            <BackButton />
                        </div>

                        <div className={styles["checkout__details"]}>
                            <div className={styles["checkout__stay-details"]}>
                                <div
                                    className={
                                        styles["checkout__stay-details--image"]
                                    }
                                >
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
                                <div
                                    className={
                                        styles[
                                            "checkout__stay-details--details"
                                        ]
                                    }
                                >
                                    <h4>{stayDetails.name}</h4>
                                    <p>
                                        ₹{" "}
                                        {formatCurrency(
                                            stayDetails.pricing.currentPrice
                                        )}
                                        /night
                                    </p>
                                    <p>
                                        {stayDetails.checkin} -{" "}
                                        {stayDetails.checkout}
                                    </p>
                                </div>
                            </div>

                            <div className={styles["checkout__price-breakup"]}>
                                <h2>Stay Price Breakup</h2>
                                <div
                                    className={
                                        styles["checkout__price-breakup--item"]
                                    }
                                >
                                    <h4>
                                        {stayDetails.name} (
                                        {paymentIntent.nights} nights)
                                    </h4>
                                    <p>
                                        ₹
                                        {formatCurrency(
                                            paymentIntent.pricing.basePrice
                                        )}
                                    </p>
                                </div>
                                <div
                                    className={
                                        styles["checkout__price-breakup--item"]
                                    }
                                >
                                    <h4>
                                        CGST (
                                        {paymentIntent.pricing.gstPerc / 2}%)
                                    </h4>
                                    <p>
                                        ₹
                                        {formatCurrency(
                                            paymentIntent.pricing.cgst
                                        )}
                                    </p>
                                </div>
                                <div
                                    className={
                                        styles["checkout__price-breakup--item"]
                                    }
                                >
                                    <h4>
                                        SGST (
                                        {paymentIntent.pricing.gstPerc / 2}%)
                                    </h4>
                                    <p>
                                        ₹
                                        {formatCurrency(
                                            paymentIntent.pricing.sgst
                                        )}
                                    </p>
                                </div>
                                <div
                                    className={
                                        styles["checkout__price-breakup--item"]
                                    }
                                >
                                    <h4>Grand Total</h4>
                                    <p>
                                        ₹
                                        {formatCurrency(
                                            paymentIntent.pricing.totalPrice
                                        )}
                                    </p>
                                </div>
                            </div>

                            {selectedAddOns && selectedAddOns.length > 0 && (
                                <div className={styles["checkout__addons"]}>
                                    <h2>Requested Add-ons</h2>
                                    <p>
                                        Our team will contact you to discuss
                                        these add-ons.
                                    </p>
                                    {selectedAddOns.map((addon, index) => (
                                        <div
                                            key={index}
                                            className={
                                                styles["checkout__addons--item"]
                                            }
                                        >
                                            <CheckCheck />
                                            <h4>{addon.name}</h4>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <CustomFooter />
                    </div>
                </>
            )}
        </>
    );
};

export default Checkout;
