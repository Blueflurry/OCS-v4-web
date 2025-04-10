"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { isAuthenticated } from "@/app/services/authService";
import styles from "./LoginRedirect.module.scss";

/**
 * LoginRedirect Component - Handles redirecting to login and back to checkout
 * Shows when a user needs to login before continuing to checkout
 */
const LoginRedirect = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [redirectTo, setRedirectTo] = useState("/");

    useEffect(() => {
        // Get the redirect URL from query params
        const redirect = searchParams.get("redirect");
        if (redirect) {
            setRedirectTo(redirect);
        }

        // If user is already authenticated, redirect immediately
        if (isAuthenticated()) {
            router.push(redirect || "/");
        }
    }, [router, searchParams]);

    // Check for pendingPayment in localStorage
    useEffect(() => {
        const pendingPayment = localStorage.getItem("pendingPayment");
        if (pendingPayment) {
            // We have a pending payment, show message about continuing checkout
            console.log("Pending payment found:", JSON.parse(pendingPayment));
        }
    }, []);

    const handleLoginSuccess = () => {
        // When login is successful, redirect back to the original page
        router.push(redirectTo);

        // Clear any pending payment data
        localStorage.removeItem("pendingPayment");
    };

    return (
        <div className={styles.container}>
            <h1>Login Required</h1>
            <p>Please login to continue with your booking</p>

            {/* This would integrate with your actual login component */}
            {/* For now, just a placeholder */}
            <div className={styles.loginForm}>
                {/* Your login form would go here */}
                <p>Login form will be displayed here</p>

                {/* This button is just a placeholder - your actual login form would handle this */}
                <button
                    onClick={handleLoginSuccess}
                    className={styles.continueButton}
                >
                    Login & Continue to Checkout
                </button>
            </div>

            <div className={styles.infoBox}>
                <p>
                    After logging in, you'll be redirected back to complete your
                    booking.
                </p>
            </div>
        </div>
    );
};

export default LoginRedirect;
