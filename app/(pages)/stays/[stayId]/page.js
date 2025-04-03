"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import styles from "./StayDetails.module.scss";
import HeroImageCarousel from "@/app/components/HeroImageCarousel";
import Image from "next/image";
import Amenities from "@/app/components/Amenities";
import ReturnPolicy from "@/app/components/ReturnPolicy";
import Reviews from "@/app/components/Reviews";
import Header from "@/app/modules/Header";
import PartnerLogo from "@/app/components/PartnerLogo";
import GoogleMapComponent from "@/app/components/GMap";
import BackButton from "@/app/components/BackButton";
import Footer from "@/app/modules/Footer";
import {
    getStayDetails,
    createPaymentIntent,
} from "@/app/services/stayDetailsService";
import { formatCurrency } from "@/app/utils/formatter";
import Loading from "../loading";

const StayDetails = () => {
    const params = useParams();
    const { stayId } = params;

    const [stayData, setStayData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    // Get booking info from localStorage if available
    const [bookingInfo, setBookingInfo] = useState(() => {
        if (typeof window !== "undefined") {
            const savedInfo = localStorage.getItem("bookingInfo");
            return savedInfo
                ? JSON.parse(savedInfo)
                : {
                      checkin: "21 May, 2025",
                      checkout: "28 May, 2025",
                      nights: 7,
                      guests: 2,
                  };
        }
        return {
            checkin: "21 May, 2025",
            checkout: "28 May, 2025",
            nights: 7,
            guests: 2,
        };
    });

    useEffect(() => {
        const fetchStayDetails = async () => {
            try {
                setIsLoading(true);
                const data = await getStayDetails(stayId);
                setStayData(data);

                // Save essential stay details to localStorage
                if (data && data._id) {
                    const stayBasics = {
                        id: data._id,
                        name: data.name,
                        description: data.description,
                        image: data.images[0],
                        location: data.location?.name,
                        rating: data.rating,
                        reviewCount: data.reviewCount,
                        bhk: data.bhk,
                        maxGuests: data.maxGuests,
                        partner: data.partner,
                        pricing: {
                            currentPrice: data.pricing.currentPrice,
                            originalPrice: data.pricing.originalPrice,
                            perPerson: data.pricing.perPerson,
                        },
                        ...bookingInfo, // Include the booking info
                    };

                    localStorage.setItem(
                        "stayBasics",
                        JSON.stringify(stayBasics)
                    );
                }
            } catch (err) {
                console.error("Error fetching stay details:", err);
                setError(
                    "Failed to load stay details. Please try again later."
                );
            } finally {
                setIsLoading(false);
            }
        };

        if (stayId) {
            fetchStayDetails();
        }
    }, [stayId, bookingInfo]);

    const handleProceedToCheckout = async () => {
        try {
            // Get stay basics from localStorage
            const stayBasics = JSON.parse(localStorage.getItem("stayBasics"));

            // Create a payment intent using stored data
            const paymentIntent = await createPaymentIntent({
                stayId: stayData._id,
                checkin: stayBasics.checkin,
                checkout: stayBasics.checkout,
                guests: stayBasics.guests,
            });

            // Store the payment intent ID in localStorage
            localStorage.setItem("paymentIntentId", paymentIntent.id);
            // console.log("Payment intent created:", paymentIntent);
        } catch (err) {
            console.error("Error creating payment intent:", err);
        }
    };

    if (isLoading) {
        return <Loading />;
    }

    if (error) {
        return <div className={styles["error"]}>{error}</div>;
    }

    if (!stayData) {
        return <div className={styles["error"]}>Stay not found</div>;
    }

    return (
        <>
            <div className={`${styles["hide-on-mobile"]}`}>
                <Header />
            </div>
            <div className={`${styles["stay-details"]} container`}>
                <div className={styles["stay-details__carousel"]}>
                    <HeroImageCarousel images={stayData.images} />
                    <BackButton />

                    {/* stay information */}
                    <div className={styles["stay-details__content"]}>
                        <div className={styles["stay-details__header"]}>
                            <div className={styles["stay-details__location"]}>
                                <Image
                                    src="/assets/images/location.svg"
                                    width={20}
                                    height={20}
                                    alt="Location"
                                />
                                <p>{stayData.location.name}</p>
                            </div>
                            <span
                                className={styles["stay-details__separator"]}
                            />
                            <div className={styles["stay-details__rating"]}>
                                <b>{stayData.rating.toFixed(1)}</b>
                                <Image
                                    src="/assets/images/ratings.svg"
                                    width={20}
                                    height={20}
                                    alt="Rating"
                                />
                                <p>({stayData.reviewCount} Reviews)</p>
                            </div>
                        </div>
                        <div className={styles["stay-details__title"]}>
                            <h3>{stayData.name}</h3>
                        </div>
                        <p className={styles["stay-details__capacity"]}>
                            <span
                                className={
                                    styles["stay-details__capacity--amount"]
                                }
                            >
                                {stayData.bhk}
                            </span>{" "}
                            BHK
                            <span
                                className={styles["stay-details__separator"]}
                            />
                            <span
                                className={
                                    styles["stay-details__capacity--amount"]
                                }
                            >
                                {stayData.maxGuests}
                            </span>{" "}
                            Guests
                            <span
                                className={styles["stay-details__separator"]}
                            />
                            <span className={styles["stay-details__partner"]}>
                                <PartnerLogo
                                    name={stayData.partner?.name || "elivaas"}
                                />
                            </span>
                        </p>
                        <div className={styles["stay-details__price"]}>
                            <div>
                                <span
                                    className={
                                        styles["stay-details__price--striked"]
                                    }
                                >
                                    ₹
                                    {formatCurrency(
                                        stayData.pricing.originalPrice
                                    )}
                                </span>
                                <p
                                    className={
                                        styles["stay-details__price--active"]
                                    }
                                >
                                    ₹
                                    {formatCurrency(
                                        stayData.pricing.currentPrice
                                    )}{" "}
                                    <span
                                        className={
                                            styles["stay-details__price--unit"]
                                        }
                                    >
                                        per night
                                    </span>
                                </p>
                            </div>
                            <p
                                className={
                                    styles["stay-details__price--person"]
                                }
                            >
                                Equals to{" "}
                                <b>
                                    ₹
                                    {formatCurrency(stayData.pricing.perPerson)}
                                </b>{" "}
                                per person
                            </p>
                        </div>

                        {/* Note about selected dates and guests */}
                        <div className={styles["stay-details__dates"]}>
                            <div className={styles["stay-details__summary"]}>
                                <p>
                                    <strong>{bookingInfo.nights} nights</strong>{" "}
                                    •{bookingInfo.checkin} -{" "}
                                    {bookingInfo.checkout} •{bookingInfo.guests}{" "}
                                    guest{bookingInfo.guests !== 1 ? "s" : ""}
                                </p>
                                <h3>
                                    Total: ₹
                                    {formatCurrency(
                                        stayData.pricing.currentPrice *
                                            bookingInfo.nights
                                    )}
                                </h3>
                            </div>
                        </div>
                    </div>

                    {/* map */}
                    <div className={styles["stay-details__map"]}>
                        <GoogleMapComponent location={stayData.location} />
                    </div>

                    {/* amenities */}
                    <Amenities amenities={stayData.amenities} />

                    <div className={styles["stay-details__separator-2"]}></div>

                    {/* policy */}
                    <ReturnPolicy />

                    <div className={styles["stay-details__separator-2"]}></div>

                    {/* reviews & ratings */}
                    <Reviews
                        rating={stayData.rating}
                        reviewCount={stayData.reviewCount}
                    />

                    <div className={styles["padding"]}></div>
                </div>
            </div>

            <Footer
                btnText="Proceed to checkout"
                btnType="primary"
                onClick={handleProceedToCheckout}
            />
        </>
    );
};

export default StayDetails;
