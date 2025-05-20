"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Button from "@/app/components/Button";
import BackButton from "@/app/components/BackButton";
import { useRouter } from "next/navigation";
import styles from "./Signup.module.scss";
import { createUser } from "@/app/services/authService";
import { CheckCircle } from "lucide-react";

const Signup = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Retrieve verified phone number from session storage
        const phoneNumber = sessionStorage.getItem("phoneNumber");
        if (!phoneNumber) {
            // Redirect to login if phone number is not available
            router.push("/login");
            return;
        }

        // Pre-fill phone number
        setFormData((prev) => ({ ...prev, phoneNumber }));
    }, [router]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        // Clear error for the field being edited
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.firstName.trim()) {
            newErrors.firstName = "First name is required";
        }

        if (!formData.lastName.trim()) {
            newErrors.lastName = "Last name is required";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);

        try {
            // Call API to create user
            const response = await createUser({
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phone: formData.phoneNumber,
            });

            if (response.success) {
                localStorage.setItem(
                    "user",
                    JSON.stringify({
                        ...response.data.user,
                        token: response.data.token,
                    })
                );

                const redirectUrl = sessionStorage.getItem("redirectUrl");
                if (redirectUrl) {
                    sessionStorage.removeItem("redirectUrl");
                    router.push(redirectUrl);
                } else {
                    router.push("/");
                }
            }
        } catch (error) {
            console.error("Signup error:", error);

            // Handle specific API errors
            if (error.response && error.response.data) {
                const apiErrors = error.response.data.errors;
                if (apiErrors) {
                    setErrors(apiErrors);
                } else {
                    setErrors({
                        general: "Failed to create account. Please try again.",
                    });
                }
            } else {
                setErrors({
                    general: "Network error. Please check your connection.",
                });
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles["signup"]}>
            <div className={styles["signup__header"]}>
                <BackButton link="/otp-verification" />
                <Image
                    src="/assets/images/logo.svg"
                    alt="OneClick Stays"
                    width={100}
                    height={100}
                />
            </div>

            <div className={styles["signup__container"]}>
                <h1 className={styles["signup__title"]}>Create Account</h1>
                <p className={styles["signup__description"]}>
                    Complete your profile to get started
                </p>

                <form className={styles["signup__form"]}>
                    <div className={styles["signup__name-row"]}>
                        <div className={styles["signup__input-group"]}>
                            <label htmlFor="firstName">First Name</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                placeholder="First name"
                                disabled={isLoading}
                                required
                            />
                            {errors.firstName && (
                                <p className={styles["signup__error"]}>
                                    {errors.firstName}
                                </p>
                            )}
                        </div>

                        <div className={styles["signup__input-group"]}>
                            <label htmlFor="lastName">Last Name</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                placeholder="Last name"
                                disabled={isLoading}
                                required
                            />
                            {errors.lastName && (
                                <p className={styles["signup__error"]}>
                                    {errors.lastName}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className={styles["signup__input-group"]}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Enter your email address"
                            disabled={isLoading}
                            required
                        />
                        {errors.email && (
                            <p className={styles["signup__error"]}>
                                {errors.email}
                            </p>
                        )}
                    </div>

                    <div className={styles["signup__input-group"]}>
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <div className={styles["signup__phone-container"]}>
                            <div className={styles["signup__phone-input"]}>
                                <div className={styles["signup__country-code"]}>
                                    +91
                                </div>
                                <input
                                    type="tel"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    disabled={true}
                                    readOnly
                                />
                            </div>
                            <div className={styles["signup__verified-tag"]}>
                                <CheckCircle size={16} />
                                <span>Verified</span>
                            </div>
                        </div>
                    </div>

                    {errors.general && (
                        <p className={styles["signup__error-general"]}>
                            {errors.general}
                        </p>
                    )}

                    <Button
                        type="primary"
                        large
                        disabled={isLoading}
                        onClick={handleSubmit}
                    >
                        {isLoading ? "Creating Account..." : "Create Account"}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default Signup;
