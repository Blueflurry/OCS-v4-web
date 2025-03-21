"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import styles from "./RazorpayButton.module.scss";

const RazorpayButton = () => {
    const [loading, setLoading] = useState(false);
    const [razorpayLoaded, setRazorpayLoaded] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        script.onload = () => setRazorpayLoaded(true);
        document.body.appendChild(script);
    }, []);

    const handlePayment = async () => {
        if (!razorpayLoaded) {
            // alert("Razorpay is still loading. Please wait.");
            return;
        }

        setLoading(true);
        try {
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: 100000, // ₹1000.00 (Razorpay works in paise)
                currency: "INR",
                name: "OneClick Stays",
                description: "Test Transaction",
                image: "/assets/images/icon.svg", // Change this to your brand logo
                handler: function (response) {
                    // alert(
                    //     `✅ Payment successful! Payment ID: ${response.razorpay_payment_id}`
                    // );
                    console.log("Payment Success:", response);
                    // router.push("/stays/24/payment-success");
                    // redirecting to orders page
                    router.push("/bookings/24");
                },
                prefill: {
                    name: "Test User",
                    email: "test@example.com",
                    contact: "9999999999",
                },
                theme: { color: "#000000" },
                // redirect: true,
                // callback_url: "http://localhost:3000/stays/24/payment-success",
            };

            const razor = new window.Razorpay(options);

            // 🔴 Handle payment failure
            razor.on("payment.failed", function (response) {
                // alert("❌ Payment failed. Please try again.");
                console.error("Payment Failed:", response);
            });

            razor.open();
        } catch (error) {
            console.error(error);
            alert("❌ Payment process failed.");
        }
        setLoading(false);
    };

    return (
        <div
            onClick={handlePayment}
            disabled={loading || !razorpayLoaded}
            className={styles["razorpayBtn"]}
        >
            {loading ? "Processing..." : "Pay now"}
        </div>
    );
};

export default RazorpayButton;
