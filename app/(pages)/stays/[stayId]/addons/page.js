"use client";
import React, { useEffect, useState } from "react";
import styles from "./Addons.module.scss";
import Image from "next/image";
import Footer from "@/app/modules/Footer";
import BackButton from "@/app/components/BackButton";
import PartnerLogo from "@/app/components/PartnerLogo";
import { useParams, useRouter } from "next/navigation";
import {
    getStayAddons,
    updatePaymentIntentWithAddOns,
} from "@/app/services/stayDetailsService";
import { formatCurrency } from "@/app/utils/formatter";

const Addons = () => {
    const params = useParams();
    const { stayId } = params;

    // const [isLoading, setIsLoading] = useState(true);
    // const [error, setError] = useState(null);
    const [stayDetails, setStayDetails] = useState(null);
    const [services, setServices] = useState([]);

    // Get stay details from localStorage and fetch add-ons from API
    useEffect(() => {
        const fetchData = async () => {
            try {
                // setIsLoading(true);

                // Get stay basics from localStorage
                const stayBasics = localStorage.getItem("stayBasics");
                if (!stayBasics) {
                    console.log(
                        "Stay details not found. Please return to stay details page."
                    );
                } else {
                    const parsedStayDetails = JSON.parse(stayBasics);
                    setStayDetails(parsedStayDetails);
                }

                // Fetch add-on services for this stay
                const addonsData = await getStayAddons(stayId);
                const addons = addonsData?.addOns;
                console.log("Add-ons data:", addons);
                if (Array.isArray(addons) && addons.length > 0) {
                    // Initialize isChecked property to fix uncontrolled to controlled issue
                    const servicesWithChecked = addons.map((addon) => ({
                        ...addon,
                        isChecked: false,
                    }));
                    setServices(servicesWithChecked);
                } else {
                    console.warn(
                        "No add-ons found or invalid format. Using default add-ons."
                    );
                    // If no add-ons are returned or data format is incorrect,
                    // you might want to set some default add-ons here
                    setServices([]);
                }
            } catch (err) {
                console.error("Error in Addons page:", err);
                // setError(err.message || "Something went wrong");
            } finally {
                // setIsLoading(false);
            }
        };

        fetchData();
    }, [stayId]);

    // Handle checkbox changes
    const onChangeCheckBox = (event) => {
        const { value, checked } = event.target;

        setServices((prev) => {
            return prev.map((service) =>
                service._id === value
                    ? { ...service, isChecked: checked }
                    : service
            );
        });
    };

    // Handle proceed to checkout
    const handleProceedToCheckout = async () => {
        try {
            // Get selected addons
            const selectedAddOns = services
                .filter((service) => service.isChecked)
                .map((service) => ({
                    id: service._id,
                    name: service.name,
                    price: service.pricing.basePrice,
                    catalogId: service.catalogId._id,
                    code: service.code,
                }));

            // Get the payment intent ID from localStorage
            const paymentIntentId = localStorage.getItem("paymentIntentId");

            if (!paymentIntentId) {
                console.log(
                    "No payment intent found. Please start booking process again."
                );
                return;
            }

            // Update payment intent with selected addons
            if (paymentIntentId) {
                const updatedBooking = await updatePaymentIntentWithAddOns(
                    paymentIntentId,
                    selectedAddOns
                );

                console.log("Updated booking:", updatedBooking);
                // Store selected addons for checkout page
                localStorage.setItem(
                    "selectedAddOns",
                    JSON.stringify(
                        updatedBooking.addOns
                            ? updatedBooking.addOns
                            : selectedAddOns
                    )
                );

                // The Footer component will handle the navigation
            }
        } catch (err) {
            console.error("Error updating payment intent:", err);
            // setError("Failed to update add-ons. Please try again.");
        }
    };

    return (
        <div className={styles["addons"]}>
            <BackButton />

            <div className={styles["addons__header"]}>
                <p>Make your experience special with...</p>
                <h2>
                    Exclusive Stay
                    <span>Add-Ons</span>
                </h2>

                <div className={styles["addons__header--partner"]}>
                    <Image
                        src="/assets/images/logo.svg"
                        alt="OneClick Stays"
                        width={100}
                        height={100}
                        style={{ width: "70px", marginBottom: "-4px" }}
                    />
                    <span className={styles[""]}>x</span>
                    <PartnerLogo
                        name={stayDetails?.partner?.name || "elivaas"}
                        color="white"
                    />
                </div>
            </div>

            {/* addons listing */}
            <div className={styles["addons__listing"]}>
                <h4>Pay at Stay</h4>
                <p className={styles["addons__listing--description"]}>
                    Our team will contact you after you confirm your booking for
                    these services. You don't have to pay at the time of
                    booking.
                </p>
                {services.map((service) => (
                    <div
                        className={styles["addons__listing--row"]}
                        key={service._id}
                    >
                        <label
                            htmlFor={service._id}
                            className={
                                styles["addons__listing--row-checkLabel"]
                            }
                        >
                            <input
                                type="checkbox"
                                value={service._id}
                                name="isSelected"
                                onChange={onChangeCheckBox}
                                id={service._id}
                                checked={service.isChecked || false}
                            />
                        </label>

                        {/* Item */}
                        <div
                            className={`${styles["addons__listing--item"]} ${
                                service.isChecked
                                    ? styles["addons__listing--item--selected"]
                                    : ""
                            }`}
                            onClick={() =>
                                onChangeCheckBox({
                                    target: {
                                        value: service._id,
                                        checked: !service.isChecked,
                                    },
                                })
                            }
                        >
                            <Image
                                src={
                                    service.catalogId.image ||
                                    "/assets/images/addons-1.svg"
                                }
                                width={200}
                                height={200}
                                alt={service.name}
                                className={
                                    styles["addons__listing--item-image"]
                                }
                            />
                            <div
                                className={
                                    styles["addons__listing--item-details"]
                                }
                            >
                                <h2>{service.name}</h2>
                                <h4>
                                    <span>
                                        ₹ {service.pricing?.basePrice}/day
                                    </span>
                                </h4>
                                <p>{service.catalogId.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* fixed bottom stay info */}
            <div className={styles["addons__fixed"]}>
                <div className={styles["addons__fixed--image"]}>
                    <Image
                        src={
                            stayDetails?.image ||
                            stayDetails?.images?.[0] ||
                            "/assets/images/villa-1.svg"
                        }
                        width={100}
                        height={100}
                        alt={stayDetails?.name || "Luxury Stay"}
                    />
                </div>
                <div className={styles["addons__fixed--details"]}>
                    <h4>{stayDetails?.name || "Luxury Villa"}</h4>
                    <p>
                        ₹{" "}
                        {formatCurrency(
                            stayDetails?.pricing?.currentPrice || 40000
                        )}
                        /night
                    </p>
                    <p>
                        {stayDetails?.checkin || "Check-in"} -{" "}
                        {stayDetails?.checkout || "Check-out"}
                    </p>
                </div>
            </div>

            <Footer
                btnText="Proceed to checkout"
                onClick={handleProceedToCheckout}
            />
        </div>
    );
};

export default Addons;
