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
import BookingEditModal from "@/app/components/BookingEditModal";
import {
    getStayDetails,
    createPaymentIntent,
} from "@/app/services/stayDetailsService";
import { formatCurrency } from "@/app/utils/formatter";
import Loading from "../loading";
import {
    Calendar,
    Moon,
    Pencil,
    Users,
    AlertTriangle,
    Star,
    MapPin,
} from "lucide-react";
import useSWR from "swr";

const StayDetails = () => {
    const params = useParams();
    const { stayId } = params;

    // const [stayData, setStayData] = useState(null);
    // const [isLoading, setIsLoading] = useState(true);
    // const [error, setError] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [bookingError, setBookingError] = useState(null);
    const [isDefaultBooking, setIsDefaultBooking] = useState(true);

    // Get booking info from localStorage if available
    const [bookingInfo, setBookingInfo] = useState(() => {
        // Default booking info if none is available
        const defaultBooking = {
            checkin: new Date().toLocaleDateString(),
            checkout: new Date(
                Date.now() + 5 * 24 * 60 * 60 * 1000
            ).toLocaleDateString(),
            rawCheckin: new Date().toISOString().split("T")[0],
            rawCheckout: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
                .toISOString()
                .split("T")[0],
            nights: 5,
            guests: 2,
            men: 1,
            women: 1,
            children: 0,
            pets: 0,
        };

        // Try to get search parameters from localStorage
        if (typeof window !== "undefined") {
            const searchParamsStr = localStorage.getItem("searchParams");
            if (searchParamsStr) {
                try {
                    const searchParams = JSON.parse(searchParamsStr);
                    // console.log("Retrieved search parameters:", searchParams);

                    // If we have search parameters with dates and guests, use them
                    if (
                        searchParams.formattedCheckin &&
                        searchParams.formattedCheckout
                    ) {
                        setIsDefaultBooking(false); // User has explicitly set booking info
                        return {
                            checkin: searchParams.formattedCheckin,
                            checkout: searchParams.formattedCheckout,
                            rawCheckin: searchParams.checkin,
                            rawCheckout: searchParams.checkout,
                            nights: searchParams.nights || 7,
                            guests: searchParams.totalGuests || 2,
                            men: searchParams.men || 1,
                            women: searchParams.women || 1,
                            children: searchParams.children || 0,
                            pets: searchParams.pets || 0,
                        };
                    }
                } catch (e) {
                    console.error("Error parsing search parameters:", e);
                }
            }
        }

        return defaultBooking;
    });

    console.log("Booking info:", bookingInfo);
    const {
        data: stayData,
        error,
        isLoading,
    } = useSWR(
        // Include params in the URL key
        `${process.env.NEXT_PUBLIC_BASEURL}/stay/${stayId}?checkIn=${bookingInfo.rawCheckin}&checkOut=${bookingInfo.rawCheckout}&guests=${bookingInfo.guests}`,
        // Simple fetcher that just calls the URL
        (url) =>
            fetch(url, {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                method: "GET",
                credentials: "include",
                withCredentials: true,
            })
                .then((res) => res.json())
                .then((result) => {
                    const data = result.stay;
                    if (data && data._id) {
                        const stayBasics = {
                            id: data._id,
                            name: data.name,
                            description: data.description,
                            image: data.featuredImage,
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

                    return data;
                }),

        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        }
    );

    console.log("Stay data:", stayData);

    // Handle booking info update
    const handleBookingUpdate = (updatedBookingInfo) => {
        setBookingInfo((prevBookingInfo) => {
            const newBookingInfo = {
                ...prevBookingInfo,
                ...updatedBookingInfo,
            };

            // Update localStorage with the new search parameters
            if (typeof window !== "undefined") {
                const searchParams = {
                    location: stayData?.location?.name || "",
                    checkin: newBookingInfo.rawCheckin,
                    checkout: newBookingInfo.rawCheckout,
                    formattedCheckin: newBookingInfo.checkin,
                    formattedCheckout: newBookingInfo.checkout,
                    nights: newBookingInfo.nights,
                    men: newBookingInfo.men,
                    women: newBookingInfo.women,
                    children: newBookingInfo.children,
                    pets: newBookingInfo.pets,
                    totalGuests: newBookingInfo.guests,
                };

                localStorage.setItem(
                    "searchParams",
                    JSON.stringify(searchParams)
                );
                console.log("Updated search parameters:", searchParams);
            }

            // Clear booking error since user has updated information
            setBookingError(null);
            setIsDefaultBooking(false);

            return newBookingInfo;
        });
    };

    const hasGeolocationPermission = async () => {
        if (!navigator.permissions || !navigator.permissions.query) {
            // Permissions API not supported, assume false (needs prompt or unavailable)
            return false;
        }

        try {
            const permissionStatus = await navigator.permissions.query({
                name: "geolocation",
            });
            return permissionStatus.state === "granted";
        } catch (error) {
            console.error("Error checking geolocation permission:", error);
            return false;
        }
    };

    const getLocationFromIP = async () => {
        try {
            const response = await fetch("https://ipapi.co/json/");
            const data = await response.json();
            // console.log(
            //     `Location: ${data.city}, ${data.region}, ${data.country_name}`
            // );
            return data;
        } catch (error) {
            console.error("Error fetching location:", error);
            return null;
        }
    };

    const handleProceedToCheckout = async () => {
        // Validate booking info before proceeding
        if (isDefaultBooking) {
            setBookingError(
                "Please confirm your stay details before proceeding"
            );
            setIsEditModalOpen(true);
            return false;
        }

        try {
            const geoLocationPermission = await hasGeolocationPermission();
            const ipLocation = await getLocationFromIP();

            // Create a payment intent using stored data
            createPaymentIntent({
                stayId: stayData._id,
                checkIn: bookingInfo.rawCheckin,
                checkOut: bookingInfo.rawCheckout,
                guests: {
                    men: bookingInfo.men,
                    women: bookingInfo.women,
                    children: bookingInfo.children,
                    pets: bookingInfo.pets,
                },
                pricing: {
                    ...stayData.pricing,
                },
                device: {
                    timeSpent: performance.now(),
                    connectionType: navigator.connection,
                    geoLocation: geoLocationPermission
                        ? navigator.geolocation.getCurrentPosition()
                        : null,
                    ipLocation: ipLocation,
                    userAgent: navigator.userAgent,
                    language: navigator.language,
                    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                },
            })
                .then((paymentIntent) => {
                    // Store the payment intent ID in localStorage
                    localStorage.setItem(
                        "paymentIntentId",
                        paymentIntent.bookingId
                    );
                    console.log("Payment intent created:", paymentIntent);

                    // Let the normal flow continue by returning undefined (not false)
                    // The Footer component will handle navigation
                })
                .catch((err) => {
                    console.error("Error creating payment intent:", err);
                    setBookingError(
                        "Unable to process your booking. Please try again."
                    );
                    return false; // Prevent navigation
                });
        } catch (err) {
            console.error("Error creating payment intent:", err);
            setBookingError(
                "Unable to process your booking. Please try again."
            );
            return false; // Prevent navigation
        }
    };

    if (isLoading) {
        return <Loading />;
    }

    if (error) {
        return <div className={styles["error"]}>{JSON.stringify(error)}</div>;
    }

    if (!stayData) {
        return <div className={styles["error"]}>Stay not found</div>;
    }

    // Calculate total price based on nights
    // const totalPrice = stayData.pricing.currentPrice * bookingInfo.nights;

    return (
        stayData && (
            <>
                <div className={`${styles["hide-on-mobile"]}`}>
                    <Header />
                </div>
                <div className={`${styles["stay-details"]} container`}>
                    <div className={styles["stay-details__carousel"]}>
                        <HeroImageCarousel
                            images={[
                                stayData.featuredImage,

                                ...Object.values(stayData.images).reduce(
                                    (a, b) => {
                                        a.push(...b);
                                        return a;
                                    },
                                    []
                                ),
                            ]}
                        />
                        <BackButton />

                        {/* stay information */}
                        <div className={styles["stay-details__content"]}>
                            <div className={styles["stay-details__header"]}>
                                <div
                                    className={styles["stay-details__location"]}
                                >
                                    <MapPin
                                        size={16}
                                        stroke="rgba(255, 255, 255, 0.4)"
                                    />
                                    <p>{stayData.location.name}</p>
                                </div>
                                <span
                                    className={
                                        styles["stay-details__separator"]
                                    }
                                />
                                <div className={styles["stay-details__rating"]}>
                                    <b>{stayData.rating.toFixed(1)}</b>
                                    {/* <Image
                                        src="/assets/images/ratings.svg"
                                        width={20}
                                        height={20}
                                        alt="Rating"
                                    /> */}

                                    <Star size={16} />
                                    <Star size={16} />
                                    <Star size={16} />
                                    <Star size={16} />
                                    <Star size={16} />
                                    {/* <StarHalf /> */}

                                    {stayData.reviewCount > 0 && (
                                        <p>({stayData.reviewCount} Reviews)</p>
                                    )}
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
                                    className={
                                        styles["stay-details__separator"]
                                    }
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
                                    className={
                                        styles["stay-details__separator"]
                                    }
                                />
                                <span
                                    className={styles["stay-details__partner"]}
                                >
                                    <PartnerLogo
                                        name={
                                            stayData.partner?.name || "elivaas"
                                        }
                                    />
                                </span>
                            </p>
                            <div className={styles["stay-details__price"]}>
                                <div>
                                    <span
                                        className={
                                            styles[
                                                "stay-details__price--striked"
                                            ]
                                        }
                                    >
                                        ₹
                                        {formatCurrency(
                                            stayData.pricing.originalPrice
                                        )}
                                    </span>
                                    <p
                                        className={
                                            styles[
                                                "stay-details__price--active"
                                            ]
                                        }
                                    >
                                        ₹
                                        {formatCurrency(
                                            stayData.pricing.currentPrice
                                        )}{" "}
                                        <span
                                            className={
                                                styles[
                                                    "stay-details__price--unit"
                                                ]
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
                                        {formatCurrency(
                                            stayData.pricing.perPerson
                                        )}
                                    </b>{" "}
                                    per person
                                </p>
                            </div>

                            {/* Display booking info from search parameters */}
                            <div className={styles["stay-details__dates"]}>
                                <div
                                    className={
                                        styles["stay-details__booking-info"]
                                    }
                                >
                                    <div
                                        className={
                                            styles[
                                                "stay-details__booking-header"
                                            ]
                                        }
                                    >
                                        <h3>Your Stay</h3>
                                        <button
                                            className={
                                                styles[
                                                    "stay-details__edit-button"
                                                ]
                                            }
                                            onClick={() =>
                                                setIsEditModalOpen(true)
                                            }
                                        >
                                            <Pencil size={16} />
                                            Edit
                                        </button>
                                    </div>

                                    {/* Error message */}
                                    {bookingError && (
                                        <div
                                            className={
                                                styles[
                                                    "stay-details__booking-error"
                                                ]
                                            }
                                        >
                                            <AlertTriangle size={16} />
                                            <span>{bookingError}</span>
                                        </div>
                                    )}

                                    {/* Visual indicator for default booking */}
                                    {isDefaultBooking && !bookingError && (
                                        <div
                                            className={
                                                styles[
                                                    "stay-details__booking-notice"
                                                ]
                                            }
                                        >
                                            <AlertTriangle size={16} />
                                            <span>
                                                Please confirm your stay details
                                                by clicking Edit
                                            </span>
                                        </div>
                                    )}

                                    <div
                                        className={
                                            styles[
                                                "stay-details__booking-details"
                                            ]
                                        }
                                    >
                                        <div
                                            className={
                                                styles[
                                                    "stay-details__booking-row"
                                                ]
                                            }
                                        >
                                            <div
                                                className={
                                                    styles[
                                                        "stay-details__booking-label"
                                                    ]
                                                }
                                            >
                                                <Calendar size={18} />
                                                Dates
                                            </div>
                                            <div
                                                className={
                                                    styles[
                                                        "stay-details__booking-value"
                                                    ]
                                                }
                                            >
                                                {bookingInfo.checkin} -{" "}
                                                {bookingInfo.checkout}
                                            </div>
                                        </div>

                                        <div
                                            className={
                                                styles[
                                                    "stay-details__booking-row"
                                                ]
                                            }
                                        >
                                            <div
                                                className={
                                                    styles[
                                                        "stay-details__booking-label"
                                                    ]
                                                }
                                            >
                                                <Moon size={18} />
                                                Duration
                                            </div>
                                            <div
                                                className={
                                                    styles[
                                                        "stay-details__booking-value"
                                                    ]
                                                }
                                            >
                                                {bookingInfo.nights}{" "}
                                                {bookingInfo.nights > 1
                                                    ? "nights"
                                                    : "night"}
                                            </div>
                                        </div>

                                        <div
                                            className={
                                                styles[
                                                    "stay-details__booking-row"
                                                ]
                                            }
                                        >
                                            <div
                                                className={
                                                    styles[
                                                        "stay-details__booking-label"
                                                    ]
                                                }
                                            >
                                                <Users size={18} />
                                                Guests
                                            </div>
                                            <div
                                                className={
                                                    styles[
                                                        "stay-details__booking-value"
                                                    ]
                                                }
                                            >
                                                {bookingInfo.guests}{" "}
                                                {bookingInfo.guests === 1
                                                    ? "guest"
                                                    : "guests"}
                                                {bookingInfo.men > 0 &&
                                                    ` (${bookingInfo.men} men)`}
                                                {bookingInfo.women > 0 &&
                                                    ` (${bookingInfo.women} women)`}
                                                {bookingInfo.children > 0 &&
                                                    ` (${bookingInfo.children} children)`}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* map */}
                        {/* {stayData.location.googleMapEmbedLink && (
                        <div>
                            <iframe
                                src={stayData.location.googleMapEmbedLink}
                                width="100%"
                                height={300}
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title={"Google Maps"}
                            ></iframe>
                        </div>
                    )} */}

                        {stayData.location.coordinates && (
                            <div className={styles["stay-details__map"]}>
                                <GoogleMapComponent
                                    location={stayData.location}
                                />
                            </div>
                        )}

                        {/* amenities */}
                        <Amenities
                            amenities={stayData.amenities}
                            amenityImages={stayData.amenityImages}
                        />

                        <div
                            className={styles["stay-details__separator-2"]}
                        ></div>

                        {/* policy */}
                        <ReturnPolicy />

                        {/* <div className={styles["stay-details__separator-2"]}></div> */}

                        {/* reviews & ratings */}
                        {/* <Reviews
                        rating={stayData.rating}
                        reviewCount={stayData.reviewCount}
                    /> */}

                        <div className={styles["padding"]}></div>
                    </div>
                </div>

                {/* Booking Edit Modal */}
                <BookingEditModal
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    onUpdate={handleBookingUpdate}
                    initialBookingInfo={bookingInfo}
                />

                <Footer
                    btnText={
                        isDefaultBooking
                            ? "Confirm stay details"
                            : "Proceed to checkout"
                    }
                    btnType="primary"
                    onClick={handleProceedToCheckout}
                />
            </>
        )
    );
};

export default StayDetails;
