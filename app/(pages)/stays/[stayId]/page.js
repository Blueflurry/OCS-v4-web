"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import styles from "./StayDetails.module.scss";
import HeroImageCarousel from "@/app/components/HeroImageCarousel";
import Amenities from "@/app/components/Amenities";
import ReturnPolicy from "@/app/components/ReturnPolicy";
// import Image from "next/image";
// import Reviews from "@/app/components/Reviews";
import Header from "@/app/modules/Header";
import PartnerLogo from "@/app/components/PartnerLogo";
import GoogleMapComponent from "@/app/components/GMap";
import BackButton from "@/app/components/BackButton";
import Footer from "@/app/modules/Footer";
import BookingEditModal from "@/app/components/BookingEditModal";
import { createPaymentIntent } from "@/app/services/paymentService";
import { formatCurrency, formatDateRange } from "@/app/utils/formatter";
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
import Reviews from "@/app/components/Reviews";
import { renderStars } from "@/app/utils/render";

// const ArrowSwiggle = React.forwardRef((props, forwardedRef) => (
//     <svg width="150" height="82" viewBox="0 0 150 82" fill="none" xmlns="http://www.w3.org/2000/svg" ref={forwardedRef} {...props}>
//         <path
//             fillRule="evenodd"
//             clipRule="evenodd"
//             d="M67.616 0.147978C57.1498 0.781251 46.3786 4.08834 38.3061 9.10762C31.9231 13.0949 25.4463 19.3807 20.0724 26.7689C15.5199 33.0312 11.249 40.1849 8.76149 45.6967C6.18015 51.4431 4.37323 57.0487 2.26123 65.7738C-0.226243 76.0234 -0.531333 79.0491 0.712402 80.8785C1.1348 81.5118 1.36949 81.6525 2.02656 81.6525H2.84789L3.01215 79.6589C3.15295 77.6887 3.36414 76.774 6.34441 66.0552C8.85535 56.9314 10.7796 51.7714 14.018 45.4152C19.5796 34.4854 27.9103 23.626 35.2554 17.8092C42.5066 12.0629 51.1658 8.5447 61.984 6.90288C63.3216 6.71525 66.1845 6.59798 69.8453 6.59798C76.1813 6.62143 78.9269 6.90288 83.8315 8.09907C93.8987 10.5852 100.352 14.3614 113.259 25.3382C115.817 27.5194 121.003 32.4918 121.003 32.7732C121.003 32.8436 120.346 32.7732 119.548 32.6091C117.389 32.1634 116.286 32.2103 115.136 32.8202C113.939 33.4534 113.024 34.9311 113.024 36.2211C113.024 38.1678 114.291 39.5985 117.131 40.8651C117.905 41.1934 121.918 43.1636 126.048 45.2276C134.332 49.3791 135.857 50.0358 139.494 51.0443C143.906 52.2874 146.511 51.9356 148.271 49.8951C149.82 48.0891 150.031 45.6498 148.858 43.2574C148.506 42.5772 147.027 40.4898 145.549 38.6134C142.404 34.6496 141.7 33.5472 140.433 30.592C139.236 27.8009 138.18 24.0951 136.843 18.0438C134.543 7.44234 134.684 7.95834 134.027 8.61507C133.229 9.41252 132.032 17.8796 132.032 22.7112C132.032 26.1122 132.29 28.1996 133.088 31.4832C133.393 32.7732 133.628 33.8287 133.604 33.8522C133.581 33.8756 132.76 32.8202 131.797 31.5067C127.503 25.69 116.826 16.3551 107.275 10.0927C99.4838 5.00307 92.6784 2.35271 83.4091 0.851615C78.3872 0.0307056 73.248 -0.180385 67.616 0.147978Z"
//             fill="currentColor"
//             // stroke="currentColor"
//         />
//     </svg>
// ));
// ArrowSwiggle.displayName = "ArrowSwiggle";

const StayDetails = () => {
    const params = useParams();
    const { stayId } = params;
    const router = useRouter();
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

        if (typeof window !== "undefined") {
            const searchParamsStr = localStorage.getItem("searchParams");
            if (searchParamsStr) {
                try {
                    const searchParams = JSON.parse(searchParamsStr);
                    if (
                        searchParams.formattedCheckin &&
                        searchParams.formattedCheckout
                    ) {
                        setIsDefaultBooking(false);
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

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
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
                // credentials: "include",
                // withCredentials: true,
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

    // Handle booking info update
    const handleBookingUpdate = (updatedBookingInfo) => {
        setBookingInfo((prevBookingInfo) => {
            const newBookingInfo = {
                ...prevBookingInfo,
                ...updatedBookingInfo,
            };

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
            return data;
        } catch (error) {
            console.error("Error fetching location:", error);
            return null;
        }
    };

    const updateStayInfo = (paymentIntentData) => {
        // First, retrieve the current staydetails object from localStorage
        let stayDetails = JSON.parse(localStorage.getItem("stayBasics"));

        if (stayDetails && paymentIntentData) {
            stayDetails.pricing = {
                basePrice: paymentIntentData.pricing.breakdown.basePrice,
                cgst: paymentIntentData.pricing.breakdown.cgst,
                sgst: paymentIntentData.pricing.breakdown.sgst,
                gstPerc: paymentIntentData.pricing.breakdown.gst_perc,

                currentPrice: paymentIntentData.pricing.currentPrice,
                originalPrice: paymentIntentData.pricing.originalPrice,
                perPerson: paymentIntentData.pricing.perPerson,
                totalPrice: paymentIntentData.pricing.totalPrice,
            };

            localStorage.setItem("stayBasics", JSON.stringify(stayDetails));
        } else {
            console.error("staydetails not found in localStorage");
        }
    };

    const getCurrentPositionPromise = () => {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error("Geolocation not supported"));
                return;
            }

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    // Extract only the data we need to avoid circular references
                    const simplifiedPosition = {
                        coords: {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                            accuracy: position.coords.accuracy,
                        },
                        timestamp: position.timestamp,
                    };
                    resolve(simplifiedPosition);
                },
                (error) => {
                    reject(error);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0,
                }
            );
        });
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

            // Get geolocation if permission is granted
            let geoLocationData = null;
            if (geoLocationPermission) {
                try {
                    geoLocationData = await getCurrentPositionPromise();
                } catch (geoError) {
                    console.error("Error getting geolocation:", geoError);
                    // Continue without geolocation data
                }
            }

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
                    geoLocation: geoLocationData,
                    ipLocation: ipLocation,
                    userAgent: navigator.userAgent,
                    language: navigator.language,
                    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                },
            })
                .then((paymentIntent) => {
                    localStorage.setItem(
                        "paymentIntentId",
                        paymentIntent.bookingId
                    );

                    // update stay Details in localstorage
                    updateStayInfo(paymentIntent);

                    router.push(`/stays/${stayId}/addons`);
                })
                .catch((err) => {
                    console.error("Error creating payment intent:", err);
                    setBookingError(
                        "Unable to process your booking. Please try again."
                    );
                    return false;
                });
        } catch (err) {
            console.error("Error creating payment intent:", err);
            setBookingError(
                "Unable to process your booking. Please try again."
            );
            return false;
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

    return (
        stayData && (
            <>
                <div className={`${styles["hide-on-mobile"]}`}>
                    <Header />
                </div>
                <div className={`${styles["stay-details"]} container`}>
                    <div className={styles["stay-details__carousel"]}>
                        <HeroImageCarousel
                            images={Array.from(
                                new Set([
                                    stayData.featuredImage,
                                    ...Object.values(stayData.images).reduce(
                                        (a, b) => {
                                            a.push(...b);
                                            return a;
                                        },
                                        []
                                    ),
                                ])
                            )}
                            categoryImages={stayData.images}
                        />
                        <BackButton className={styles["goBack"]} />

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
                                    {renderStars(stayData.rating)}
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
                                {/* <ArrowSwiggle /> */}
                                {/* <Image src="/assets/images/arrow-swiggle.svg" width={100} height={100} /> */}
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
                                        {/* <h3>Your Stay</h3> */}
                                        Showing prices for these{" "}
                                        <span>dates</span> & <span>guests</span>
                                    </div>

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
                                                {formatDateRange([
                                                    bookingInfo.checkin,
                                                    bookingInfo.checkout,
                                                ])}
                                            </div>
                                        </div>

                                        {/* <div className={styles["stay-details__booking-row"]}>
                                            <div className={styles["stay-details__booking-label"]}>
                                                <Moon size={18} />
                                                Duration
                                            </div>
                                            <div className={styles["stay-details__booking-value"]}>
                                                {bookingInfo.nights} {bookingInfo.nights > 1 ? "Nights" : "Night"}
                                            </div>
                                        </div> */}

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
                                                    ? "Guest"
                                                    : "Guests"}
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        className={
                                            styles["stay-details__edit-button"]
                                        }
                                        onClick={() => setIsEditModalOpen(true)}
                                    >
                                        <Pencil size={16} />
                                        Edit Details
                                    </button>

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
                                    {/* {isDefaultBooking && !bookingError && (
                                        <div className={styles["stay-details__booking-notice"]}>
                                            <AlertTriangle size={16} />
                                            <span>Please confirm your stay details!</span>
                                        </div>
                                    )} */}
                                </div>
                            </div>
                        </div>

                        {/* Map */}
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

                        {/* policy */}
                        <ReturnPolicy />

                        {/* <div className={styles["stay-details__separator-2"]}></div> */}

                        {/* reviews & ratings */}
                        {stayData.rating && stayData.rating > 0 && (
                            <Reviews
                                stayId={stayId}
                                rating={stayData.rating}
                                ratingsByCategory={stayData.ratingsByCategory}
                                partner={stayData.partner?.name || "elivaas"}
                            />
                        )}

                        <div className={styles["padding"]}></div>
                    </div>
                </div>

                {/* Booking Edit Modal */}
                <BookingEditModal
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    onUpdate={handleBookingUpdate}
                    initialBookingInfo={bookingInfo}
                    maxGuests={stayData.maxGuests}
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
