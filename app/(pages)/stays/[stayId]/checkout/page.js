"use client";
import React, { useEffect, useState } from "react";
import styles from "./Checkout.module.scss";
import Image from "next/image";
import BackButton from "@/app/components/BackButton";
import {
    CheckCheck,
    Info,
    Shield,
    Clock,
    CreditCard,
    CheckCircleIcon,
    Badge,
    Award,
    Receipt,
    UserCircle,
    Lock,
    CreditCardIcon,
    Headphones,
    ShieldCheck,
} from "lucide-react";
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

    // Checkout progress steps
    const checkoutSteps = [
        { id: 1, name: "Details", success: true },
        { id: 2, name: "Add-ons", success: true },
        { id: 3, name: "Payment", current: true },
    ];

    // Custom Footer with Razorpay button
    const CustomFooter = () => (
        <div className={styles["footer"]}>
            <div className={styles["secure-payment-info"]}>
                <div className={styles["secure-payment-icon"]}>
                    <Shield size={16} />
                </div>
                <span>All payments are secure and encrypted</span>
            </div>

            <div className={styles["button-container"]}>
                {paymentIntent && (
                    <div className={styles["payment-action"]}>
                        <div className={styles["payment-methods"]}>
                            <Image
                                src="/assets/images/payment/visa.svg"
                                width={28}
                                height={32}
                                alt="Visa"
                            />
                            <Image
                                src="/assets/images/payment/mastercard.svg"
                                width={28}
                                height={32}
                                alt="Mastercard"
                            />
                            <Image
                                src="/assets/images/payment/rupay.svg"
                                width={32}
                                height={32}
                                alt="RuPay"
                            />
                            <Image
                                src="/assets/images/payment/upi.svg"
                                width={32}
                                height={32}
                                alt="UPI"
                            />
                        </div>
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
                    </div>
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

                        {/* Checkout progress steps */}
                        <div className={styles["checkout-progress"]}>
                            {checkoutSteps.map((step) => (
                                <div
                                    key={step.id}
                                    className={`${styles["progress-step"]} ${
                                        step.current ? styles["active"] : ""
                                    }
                                     ${step.success ? styles["success"] : ""}
                                    `}
                                >
                                    <div className={styles["step-number"]}>
                                        {step.id}
                                    </div>
                                    <div className={styles["step-name"]}>
                                        {step.name}
                                    </div>
                                </div>
                            ))}
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

                            {/* Booking guarantees section */}
                            <div className={styles["booking-guarantees"]}>
                                <div className={styles["guarantee-item"]}>
                                    <div className={styles["guarantee-icon"]}>
                                        {/* <Image
                                            src="/assets/images/trust/verified.svg"
                                            width={24}
                                            height={24}
                                            alt="Verified"
                                        /> */}

                                        <CheckCircleIcon
                                            size={24}
                                            color="#10b981"
                                        />
                                    </div>
                                    <div className={styles["guarantee-text"]}>
                                        <h4>Verified Property</h4>
                                        <p>
                                            All listings are verified by our
                                            team
                                        </p>
                                    </div>
                                </div>
                                <div className={styles["guarantee-item"]}>
                                    <div className={styles["guarantee-icon"]}>
                                        {/* <Image
                                            src="/assets/images/trust/best-price.svg"
                                            width={24}
                                            height={24}
                                            alt="Best Price"
                                        /> */}
                                        <Award size={24} color="#0891b2" />
                                    </div>
                                    <div className={styles["guarantee-text"]}>
                                        <h4>Best Price Guarantee</h4>
                                        <p>
                                            You won't find a better price
                                            anywhere
                                        </p>
                                    </div>
                                </div>
                                <div className={styles["guarantee-item"]}>
                                    <div className={styles["guarantee-icon"]}>
                                        {/* <Image
                                            src="/assets/images/trust/no-hidden-fees.svg"
                                            width={24}
                                            height={24}
                                            alt="No Hidden Fees"
                                        /> */}
                                        <Receipt size={24} color="#6366f1" />
                                    </div>
                                    <div className={styles["guarantee-text"]}>
                                        <h4>No Hidden Fees</h4>
                                        <p>The price you see is what you pay</p>
                                    </div>
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

                            {/* Guest reviews section */}
                            {/* <div className={styles["guest-reviews"]}>
                                <h2>
                                    <span className={styles["review-score"]}>
                                        4.9
                                    </span>{" "}
                                    Excellent
                                    <span className={styles["review-count"]}>
                                        (125 reviews)
                                    </span>
                                </h2>
                                <div className={styles["review-item"]}>
                                    <div className={styles["review-icon"]}>
                                     
                                        <UserCircle size={24} color="#6b7280" />
                                    </div>
                                    <div className={styles["review-content"]}>
                                        <p>
                                            "Amazing stay, very clean and just
                                            as described. The check-in process
                                            was very smooth."
                                        </p>
                                        <span
                                            className={styles["reviewer-name"]}
                                        >
                                            - Priya S.
                                        </span>
                                    </div>
                                </div>
                            </div> */}

                            {/* Cancellation policy */}
                            <div className={styles["cancellation-policy"]}>
                                <div className={styles["policy-header"]}>
                                    <Clock size={16} />
                                    <h3>
                                        Free cancellation until 48 hours before
                                        check-in
                                    </h3>
                                </div>
                                <p>
                                    After that, cancel before check-in and get a
                                    50% refund, minus the service fee.
                                </p>
                            </div>

                            {/* Trust badges section */}
                            <div className={styles["trust-badges"]}>
                                <div className={styles["badge-container"]}>
                                    <div className={styles["badge"]}>
                                        {/* <Image
                                            src="/assets/images/trust/ssl-secure.svg"
                                            width={40}
                                            height={40}
                                            alt="SSL Secure"
                                        /> */}
                                        <Lock size={24} color="#10b981" />
                                        <span>SSL Secured</span>
                                    </div>
                                    <div className={styles["badge"]}>
                                        {/* <Image
                                            src="/assets/images/trust/pci-dss.svg"
                                            width={40}
                                            height={40}
                                            alt="PCI DSS"
                                        /> */}
                                        <CreditCardIcon
                                            size={24}
                                            color="#6366f1"
                                        />
                                        <span>PCI Compliant</span>
                                    </div>
                                    <div className={styles["badge"]}>
                                        {/* <Image
                                            src="/assets/images/trust/support.svg"
                                            width={40}
                                            height={40}
                                            alt="24/7 Support"
                                        /> */}
                                        <Headphones size={24} color="#0891b2" />
                                        <span>24/7 Support</span>
                                    </div>
                                    <div className={styles["badge"]}>
                                        {/* <Image
                                            src="/assets/images/trust/encrypted.svg"
                                            width={40}
                                            height={40}
                                            alt="Encrypted"
                                        /> */}
                                        <ShieldCheck
                                            size={24}
                                            color="#10b981"
                                        />
                                        <span>Encrypted Data</span>
                                    </div>
                                </div>
                                <div className={styles["support-text"]}>
                                    <Info size={14} />
                                    <span>
                                        Need help? Call our team at{" "}
                                        <strong>+91 98765 43210</strong>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <CustomFooter />
                    </div>
                </>
            )}
        </>
    );
};

export default Checkout;
