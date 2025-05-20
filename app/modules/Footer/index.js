"use client";
import React, { useState } from "react";
import styles from "./Footer.module.scss";
import Button from "@/app/components/Button";
import Image from "next/image";
import RazorpayButton from "@/app/components/RazorpayButton";
import { Loader2 } from "lucide-react"; // Import loading spinner icon

/**
 * Footer component with action button
 * @param {Object} props - Component props
 * @param {string} props.btnText - Button text
 * @param {string} props.btnType - Button type (primary, whatsapp, razorpay)
 * @param {Function} props.onClick - Function to call when button is clicked
 * @returns {JSX.Element} Footer component
 */
const Footer = ({ btnText, btnType = "primary", onClick }) => {
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleCheckoutClick = () => {
        // Temporarily disable button to prevent multiple clicks
        setIsButtonDisabled(true);
        setIsLoading(true);

        // If custom onClick is provided, call it first
        if (onClick) {
            // Try to execute onClick and see if it performs any actions
            // that would indicate we should stop the flow (like showing an error)
            const result = onClick();

            if (result === false) {
                setTimeout(() => {
                    setIsButtonDisabled(false);
                    setIsLoading(false);
                }, 1500); // Re-enable after delay
                return;
            }
        }

        // This will only execute if onClick doesn't return false
        // In most cases, navigation will happen before this timeout fires
        setTimeout(() => {
            setIsButtonDisabled(false);
            setIsLoading(false);
        }, 10000); // Safety timeout to prevent permanently disabled button
    };

    return (
        <div className={styles["footer"]}>
            <div
                className={styles["button-container"]}
                onClick={!isButtonDisabled ? handleCheckoutClick : undefined}
            >
                {btnType === "razorpay" ? (
                    <RazorpayButton />
                ) : (
                    <Button type={btnType} large disabled={isButtonDisabled}>
                        {isLoading ? (
                            <div className={styles["loading-container"]}>
                                <Loader2
                                    className={styles["loading-spinner"]}
                                    size={20}
                                />
                                <span>Processing...</span>
                            </div>
                        ) : btnType === "whatsapp" ? (
                            <>
                                <Image
                                    src="/assets/images/whatsapp-icon.webp"
                                    width={24}
                                    height={24}
                                    alt="WhatsApp"
                                />
                                <span>{btnText}</span>
                            </>
                        ) : (
                            <>
                                <span>{btnText}</span>
                                <Image
                                    src="/assets/images/arrow-forward.svg"
                                    width={20}
                                    height={20}
                                    alt="arrow"
                                />
                            </>
                        )}
                    </Button>
                )}
            </div>
        </div>
    );
};

export default Footer;
