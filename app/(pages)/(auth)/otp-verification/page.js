"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Button from "@/app/components/Button";
import BackButton from "@/app/components/BackButton";
import { useRouter } from "next/navigation";
import styles from "./OtpVerification.module.scss";
import { verifyOtp, resendOtp } from "@/app/services/authService";

const OtpVerification = () => {
    const router = useRouter();
    const [otp, setOtp] = useState(["", "", "", ""]);
    const [isLoading, setIsLoading] = useState(false);
    const [isResending, setIsResending] = useState(false);
    const [error, setError] = useState("");
    const [resendError, setResendError] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [countdown, setCountdown] = useState(0);
    const inputRefs = [useRef(), useRef(), useRef(), useRef()];
    const timerRef = useRef(null);
    const formRef = useRef(null);

    useEffect(() => {
        // Retrieve phone number from session storage
        try {
            const storedPhoneNumber = sessionStorage.getItem("phoneNumber");
            if (!storedPhoneNumber) {
                // Redirect to login if phone number is not available
                router.push("/login");
                return;
            }

            setPhoneNumber(storedPhoneNumber);

            // Focus the first input field when component mounts
            if (inputRefs[0].current) {
                inputRefs[0].current.focus();
            }
        } catch (err) {
            // Handle any errors accessing sessionStorage
            console.error("Error accessing session storage:", err);
            router.push("/login");
        }

        // Clean up the timer when the component unmounts
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [router]);

    // Countdown timer effect
    useEffect(() => {
        if (countdown > 0) {
            timerRef.current = setInterval(() => {
                setCountdown((prev) => prev - 1);
            }, 1000);
        } else if (timerRef.current) {
            clearInterval(timerRef.current);
        }

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [countdown]);

    // Check if all OTP inputs are filled and submit automatically
    useEffect(() => {
        if (otp.every((digit) => digit !== "") && formRef.current) {
            handleSubmit();
        }
    }, [otp]);

    const handleOtpChange = (index, value) => {
        // Allow only single digit numbers
        if (!/^\d?$/.test(value)) return;

        // Clear any error when user starts changing the OTP
        if (error) setError("");

        // Update OTP array
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-focus next input field if value is entered
        if (value && index < 3 && inputRefs[index + 1].current) {
            inputRefs[index + 1].current.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        // Move to previous input on backspace if current input is empty
        if (
            e.key === "Backspace" &&
            !otp[index] &&
            index > 0 &&
            inputRefs[index - 1].current
        ) {
            inputRefs[index - 1].current.focus();
        }
    };

    // Handle pasting the entire OTP
    const handlePaste = (e, index) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text");

        // Check if pasted content is numeric and of valid length
        if (!/^\d+$/.test(pastedData)) return;

        // Fill the OTP inputs with the pasted digits
        const digits = pastedData.slice(0, 4).split("");
        const newOtp = [...otp];

        digits.forEach((digit, i) => {
            if (index + i < 4) {
                newOtp[index + i] = digit;
            }
        });

        setOtp(newOtp);

        // Focus the appropriate input after pasting
        const nextIndex = Math.min(index + digits.length, 3);
        if (nextIndex < 4 && inputRefs[nextIndex].current) {
            inputRefs[nextIndex].current.focus();
        }
    };

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();

        // Check if OTP is complete
        const otpValue = otp.join("");
        if (otpValue.length !== 4) {
            setError("Please enter the complete 4-digit verification code");
            return;
        }

        setIsLoading(true);
        setError("");

        // Call API to verify OTP with improved error handling
        const response = await verifyOtp(phoneNumber, otpValue);

        if (response.success) {
            try {
                const userData = response.data;

                if (userData.user) {
                    const user = { ...userData.user, token: userData.token };
                    localStorage.setItem("user", JSON.stringify(user || {}));

                    // Check if there's a redirect URL
                    const redirectUrl = sessionStorage.getItem("redirectUrl");
                    if (redirectUrl) {
                        sessionStorage.removeItem("redirectUrl");
                        router.push(redirectUrl);
                    } else {
                        router.push("/");
                    }
                } else {
                    router.push("/signup");
                }
            } catch (storageError) {
                console.error("Error storing user data:", storageError);
                // Try to navigate anyway
                const redirectUrl = sessionStorage.getItem("redirectUrl");
                router.push(userData?.user ? redirectUrl || "/" : "/signup");
            }
        } else {
            setError(
                response.error || "Invalid verification code. Please try again."
            );

            // Clear OTP fields on error
            setOtp(["", "", "", ""]);

            // Focus back on the first input
            if (inputRefs[0].current) {
                inputRefs[0].current.focus();
            }
        }

        setIsLoading(false);
    };

    const handleResendCode = async () => {
        // Don't do anything if countdown is active
        if (countdown > 0) return;

        setIsResending(true);
        setResendError("");

        // Call resend API with improved error handling
        const response = await resendOtp(phoneNumber);

        if (response.success) {
            // Set countdown timer for 30 seconds
            setCountdown(30);

            // Clear any existing error
            setError("");

            // Clear OTP fields
            setOtp(["", "", "", ""]);

            // Focus on first input
            if (inputRefs[0].current) {
                inputRefs[0].current.focus();
            }
        } else {
            // Handle resend failure
            setResendError(
                response.error || "Failed to resend code. Please try again."
            );
        }

        setIsResending(false);
    };

    const formatPhoneNumber = (phone) => {
        if (!phone || phone.length !== 10) return phone;
        return `+91 ${phone.slice(0, 5)} ${phone.slice(5)}`;
    };

    // Safely handle the case where router or session storage isn't available yet
    if (!phoneNumber) {
        return (
            <div className={styles["otp-verification"]}>
                <div className={styles["otp-verification__container"]}>
                    <p>Loading verification page...</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles["otp-verification"]}>
            <div className={styles["otp-verification__header"]}>
                <BackButton link="/login" />
                <Image
                    src="/assets/images/logo.svg"
                    alt="OneClick Stays"
                    width={100}
                    height={100}
                />
            </div>

            <div className={styles["otp-verification__container"]}>
                <h1 className={styles["otp-verification__title"]}>
                    OTP Verification
                </h1>
                <p className={styles["otp-verification__description"]}>
                    Enter the 4-digit code sent to{" "}
                    {formatPhoneNumber(phoneNumber)}
                </p>

                <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className={styles["otp-verification__form"]}
                >
                    <div className={styles["otp-verification__inputs"]}>
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                ref={inputRefs[index]}
                                type="tel"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                maxLength={1}
                                autoComplete="one-time-code"
                                value={digit}
                                onChange={(e) =>
                                    handleOtpChange(index, e.target.value)
                                }
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                onPaste={(e) => handlePaste(e, index)}
                                disabled={isLoading || isResending}
                                className={error ? styles["input-error"] : ""}
                                required
                            />
                        ))}
                    </div>

                    {error && (
                        <div className={styles["otp-verification__error"]}>
                            {error}
                        </div>
                    )}

                    <Button
                        type="primary"
                        large
                        disabled={
                            isLoading ||
                            isResending ||
                            otp.join("").length !== 4
                        }
                        onClick={handleSubmit}
                    >
                        {isLoading ? "Verifying..." : "Login"}
                    </Button>
                </form>

                {resendError && (
                    <div className={styles["otp-verification__resend-error"]}>
                        {resendError}
                    </div>
                )}

                <div className={styles["otp-verification__resend"]}>
                    <p>Didn't receive the code?</p>
                    <button
                        onClick={handleResendCode}
                        disabled={countdown > 0 || isResending}
                        className={styles["otp-verification__resend-button"]}
                    >
                        {isResending
                            ? "Sending..."
                            : countdown > 0
                            ? `Resend Code in ${countdown}s`
                            : "Resend Code"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OtpVerification;
