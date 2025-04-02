"use client";
import React, { useState, useEffect } from "react";
import styles from "./StayDetails.module.scss";
import HeroImageCarousel from "@/app/components/HeroImageCarousel";
import Image from "next/image";
import Button from "@/app/components/Button";
import Amenities from "@/app/components/Amenities";
import ReturnPolicy from "@/app/components/ReturnPolicy";
import Reviews from "@/app/components/Reviews";
import Header from "@/app/modules/Header";
import PartnerLogo from "@/app/components/PartnerLogo";
import GoogleMapComponent from "@/app/components/GMap";
import BackButton from "@/app/components/BackButton";
import Footer from "@/app/modules/Footer";
import { dummyStaysData } from "@/app/constants/dummy";

const StayDetails = ({ params }) => {
    // Unwrap params using React.use()
    const unwrappedParams = React.use(params);
    const { stayId } = unwrappedParams;

    // State management
    const [stayData, setStayData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch stay details when component mounts or stayId changes
    useEffect(() => {
        const fetchStayDetails = async () => {
            if (!stayId) return;

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

                setStayData(stay);
                setIsLoading(false);

                // REAL API MODE - Uncomment this section when your API is ready
                /*
                // API call to get stay details
                const response = await fetch(`/api/stays/${stayId}`);

                if (!response.ok) {
                    throw new Error(
                        `Failed to fetch stay details: ${response.status}`
                    );
                }

                const data = await response.json();
                setStayData(data);

                // Fetch additional services
                try {
                    const servicesResponse = await fetch(
                        `//api/stays/${stayId}/services`
                    );
                    if (servicesResponse.ok) {
                        const servicesData = await servicesResponse.json();
                        setServices(servicesData);
                    }
                } catch (serviceError) {
                    console.warn("Failed to fetch services:", serviceError);
                }
                */

                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching stay details:", error);
                setError(error.message || "Failed to load stay details");
                setIsLoading(false);
            }
        };

        fetchStayDetails();
    }, [stayId]);

    // Handle checkout process
    const handleCheckout = () => {
        // Navigate to checkout or process booking
        console.log("Proceeding to checkout with:", {
            stayId,
        });
        // Example: router.push(`/checkout?stayId=${stayId}`);
    };

    // Loading state
    if (isLoading) {
        return (
            <div className={`${styles["stay-details"]} container`}>
                <div className={styles["stay-details__loading"]}>
                    <p>Loading stay details...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className={`${styles["stay-details"]} container`}>
                <div className={styles["stay-details__error"]}>
                    <h3>Something went wrong</h3>
                    <p>{error}</p>
                    <Button onClick={() => window.location.reload()}>
                        Retry
                    </Button>
                </div>
            </div>
        );
    }

    // If no stay data was found
    if (!stayData) {
        return (
            <div className={`${styles["stay-details"]} container`}>
                <div className={styles["stay-details__error"]}>
                    <h3>Stay not found</h3>
                    <p>We couldn't find the stay you're looking for.</p>
                    <Button onClick={() => window.history.back()}>
                        Go Back
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className={`${styles["hide-on-mobile"]}`}>
                <Header />
            </div>
            <div className={`${styles["stay-details"]} container`}>
                <div className={styles["stay-details__carousel"]}>
                    <HeroImageCarousel images={stayData.heroImages || []} />
                    <BackButton />

                    {/* stay information */}
                    <div className={styles["stay-details__content"]}>
                        <div className={styles["stay-details__progress"]} />
                        <div className={styles["stay-details__header"]}>
                            <div className={styles["stay-details__rating"]}>
                                <b>{stayData.rating || "5.0"}</b>
                                <Image
                                    src="/assets/images/ratings.svg"
                                    width={20}
                                    height={20}
                                    alt="Rating"
                                />
                                <p>({stayData.reviewsCount || 0} Reviews)</p>
                            </div>
                        </div>
                        <div className={styles["stay-details__title"]}>
                            <h3>{stayData.title}</h3>
                        </div>
                        <p className={styles["stay-details__capacity"]}>
                            <span
                                className={
                                    styles["stay-details__capacity--amount"]
                                }
                            >
                                {stayData.bhk || 2}
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
                                {stayData.guests || 4}
                            </span>{" "}
                            Guests
                            <span
                                className={styles["stay-details__separator"]}
                            />
                            <span className={styles["stay-details__partner"]}>
                                <PartnerLogo
                                    name={stayData.partner || "elivaas"}
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
                                    {stayData.price?.original || "₹65,500"}
                                </span>
                                <p
                                    className={
                                        styles["stay-details__price--active"]
                                    }
                                >
                                    {stayData.price?.discounted || "₹45,500"}{" "}
                                    <span
                                        className={
                                            styles["stay-details__price--unit"]
                                        }
                                    >
                                        {stayData.price?.unit || "per night"}
                                    </span>
                                </p>
                            </div>
                            <p
                                className={
                                    styles["stay-details__price--person"]
                                }
                            >
                                Equals to{" "}
                                <b>{stayData.price?.perPerson || "₹10,000"}</b>{" "}
                                per person
                            </p>
                        </div>

                        {/* Date selection and Guest selection sections removed */}
                    </div>

                    {/* map */}
                    <div className={styles["stay-details__map"]}>
                        <GoogleMapComponent
                            latitude={stayData.mapLocation?.lat}
                            longitude={stayData.mapLocation?.lng}
                        />
                    </div>

                    {/* amenities */}
                    <Amenities amenities={stayData.amenties || []} />

                    {/* policy */}
                    <ReturnPolicy policies={stayData.policies} />

                    {/* reviews & ratings */}
                    <Reviews reviews={stayData.reviews} />
                </div>
            </div>

            <Footer btnText="Proceed to checkout" onClick={handleCheckout} />
        </>
    );
};

export default StayDetails;
