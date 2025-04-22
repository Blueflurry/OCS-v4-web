"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Button from "@/app/components/Button";
import BackButton from "@/app/components/BackButton";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./Login.module.scss";
import { sendLoginOtp } from "@/app/services/authService";

const Login = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [redirectUrl, setRedirectUrl] = useState("/");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    // Add this useEffect
    useEffect(() => {
        // Get the redirect URL from query params
        const redirect = searchParams.get("redirect");
        if (redirect) {
            setRedirectUrl(redirect);
            // Store redirect URL in session storage to use after OTP verification
            sessionStorage.setItem("redirectUrl", redirect);
        }
    }, [searchParams]);

    const handlePhoneChange = (e) => {
        // Allow only numbers and limit to 10 digits
        const value = e.target.value.replace(/\D/g, "").slice(0, 10);
        setPhoneNumber(value);
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate phone number (should be 10 digits for Indian numbers)
        if (phoneNumber.length !== 10) {
            setError("Please enter a valid 10-digit phone number");
            return;
        }

        setIsLoading(true);
        setError("");

        try {
            // Call login API to send OTP
            const response = await sendLoginOtp(phoneNumber);

            // console.log("OTP sent response:", response);

            if (response.success) {
                // Store phone number in session storage for OTP verification
                sessionStorage.setItem("phoneNumber", phoneNumber);

                // Navigate to OTP verification page
                router.push("/otp-verification");
            }
        } catch (error) {
            console.error("Login error:", error);
            setError("Failed to send verification code. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles["login"]}>
            <div className={styles["login__header"]}>
                {/* <BackButton link="/welcome" /> */}
                <Image
                    src="/assets/images/logo.svg"
                    alt="OneClick Stays"
                    width={100}
                    height={100}
                />
            </div>

            <div className={styles["login__container"]}>
                <h1 className={styles["login__title"]}>Login</h1>
                <p className={styles["login__description"]}>
                    Enter your phone number to receive a verification code
                </p>

                <form className={styles["login__form"]}>
                    <div className={styles["login__input-group"]}>
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <div className={styles["login__phone-input"]}>
                            <div className={styles["login__country-code"]}>
                                +91
                            </div>
                            <input
                                type="tel"
                                id="phoneNumber"
                                value={phoneNumber}
                                onChange={handlePhoneChange}
                                placeholder="Enter your phone number"
                                disabled={isLoading}
                                required
                            />
                        </div>
                        {error && (
                            <p className={styles["login__error"]}>{error}</p>
                        )}
                    </div>

                    <Button
                        type="primary"
                        large
                        disabled={isLoading || phoneNumber.length !== 10}
                        onClick={handleSubmit}
                    >
                        {isLoading ? "Sending..." : "Send Verification Code"}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default Login;
