"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import styles from "./StayDetails.module.scss";
import HeroImageCarousel from "@/app/components/HeroImageCarousel";
import { ADDONSERVICES } from "@/app/data/dummy";
import Image from "next/image";
import DateRangePicker from "@/app/components/DateRangePicker";
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
    const [datePickerOpen, setDatePickerOpen] = useState(false);
    const [selectedDates, setSelectedDates] = useState([
        new Date(),
        new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Default 7 days
    ]);
    const [guests, setGuests] = useState(2);

    useEffect(() => {
        const fetchStayDetails = async () => {
            try {
                setIsLoading(true);
                const data = await getStayDetails(stayId);
                console.log("Stay details:", data);
                setStayData(data);
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
    }, [stayId]);

    const handleDateChange = (dates) => {
        setSelectedDates(dates);
    };

    const handleGuestChange = (count) => {
        setGuests(count);
    };

    const handleProceedToCheckout = async () => {
        try {
            // Create a payment intent
            const paymentIntent = await createPaymentIntent({
                stayId: stayData._id,
                checkin: selectedDates[0]?.toISOString(),
                checkout: selectedDates[1]?.toISOString(),
                guests: guests,
            });

            // Store the payment intent ID in localStorage to use it in the next steps
            localStorage.setItem("paymentIntentId", paymentIntent.id);

            // The default Footer navigation will handle the redirect
        } catch (err) {
            console.error("Error creating payment intent:", err);
            alert("Failed to proceed to checkout. Please try again.");
        }
    };

    if (isLoading) {
        return <Loading></Loading>;
    }

    if (error) {
        return <div className={styles["error"]}>{error}</div>;
    }

    if (!stayData) {
        return <div className={styles["error"]}>Stay not found</div>;
    }

    // Calculate nights between selected dates
    const nights =
        selectedDates[0] && selectedDates[1]
            ? Math.ceil(
                  (selectedDates[1] - selectedDates[0]) / (24 * 60 * 60 * 1000)
              )
            : 0;

    // Calculate total amount
    const totalAmount = stayData.pricing.currentPrice * (nights || 1);

    // Format dates for display
    const formatDate = (date) => {
        if (!date) return "";
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

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

                        {/* Date selection */}
                        {/* <div className={styles["stay-details__dates"]}>
                            <h3>Select your dates</h3>
                            <button
                                className={styles["stay-details__date-button"]}
                                onClick={() => setDatePickerOpen(true)}
                            >
                                {selectedDates[0] && selectedDates[1]
                                    ? `${formatDate(
                                          selectedDates[0]
                                      )} - ${formatDate(selectedDates[1])}`
                                    : "Click to select dates"}
                            </button>

                            <DateRangePicker
                                onChange={handleDateChange}
                                value={selectedDates}
                                onOpen={setDatePickerOpen}
                                isOpen={datePickerOpen}
                            />

                            <div className={styles["stay-details__summary"]}>
                                <p>
                                    <strong>{nights} nights</strong> · ₹
                                    {formatCurrency(
                                        stayData.pricing.currentPrice
                                    )}{" "}
                                    per night
                                </p>
                                <h3>Total: ₹{formatCurrency(totalAmount)}</h3>
                            </div>
                        </div> */}

                        {/* Guest selection */}
                        {/* <div className={styles["stay-details__guests"]}>
                            <h3>Number of guests</h3>
                            <div
                                className={
                                    styles["stay-details__guests-selector"]
                                }
                            >
                                <button
                                    onClick={() =>
                                        handleGuestChange(
                                            Math.max(1, guests - 1)
                                        )
                                    }
                                    disabled={guests <= 1}
                                >
                                    -
                                </button>
                                <span>{guests}</span>
                                <button
                                    onClick={() =>
                                        handleGuestChange(
                                            Math.min(
                                                stayData.maxGuests,
                                                guests + 1
                                            )
                                        )
                                    }
                                    disabled={guests >= stayData.maxGuests}
                                >
                                    +
                                </button>
                            </div>
                            <p>Maximum {stayData.maxGuests} guests allowed</p>
                        </div> */}
                    </div>

                    {/* Description */}
                    {/* <div className={styles["stay-details__description"]}>
                        <h3>About this place</h3>
                        <p>{stayData.description}</p>
                    </div> */}

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
                showTotalAmount={true}
                totalAmount={totalAmount}
            />
        </>
    );
};

export default StayDetails;
