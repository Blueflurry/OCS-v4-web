"use client";
import React, { useEffect, useState } from "react";
import styles from "./Footer.module.scss";
import Button from "@/app/components/Button";
import Image from "next/image";
import { useParams, usePathname, useRouter } from "next/navigation";
import { PAGES } from "@/app/data/dummy";
import { ArrowRight } from "lucide-react";
import RazorpayButton from "@/app/components/RazorpayButton";
import { formatCurrency } from "@/app/utils/formatter";

/**
 * Footer component with action button
 * @param {Object} props - Component props
 * @param {string} props.btnText - Button text
 * @param {string} props.btnType - Button type (primary, whatsapp, razorpay)
 * @param {Function} props.onClick - Function to call when button is clicked
 * @param {boolean} props.showTotalAmount - Whether to show total amount
 * @param {number} props.totalAmount - Total amount to display
 * @returns {JSX.Element} Footer component
 */
const Footer = ({ btnText, btnType = "primary", onClick }) => {
    const router = useRouter();
    const params = useParams();
    const stayId = params.stayId;
    const pathname = usePathname();
    const [currentPage, setCurrentPage] = useState(PAGES[0]);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const handleCheckoutClick = () => {
        // Temporarily disable button to prevent multiple clicks
        setIsButtonDisabled(true);

        // If custom onClick is provided, call it first
        if (onClick) {
            // Try to execute onClick and see if it performs any actions
            // that would indicate we should stop the flow (like showing an error)
            const result = onClick();

            if (result === false) {
                setTimeout(() => setIsButtonDisabled(false), 1500); // Re-enable after delay
                return;
            }
        }

        for (let idx = 0; idx < PAGES.length; idx++) {
            let page = PAGES[idx];
            page.url = page.url?.replace("${stayId}", stayId);
            page.nextUrl = page.nextUrl?.replace("${stayId}", stayId);

            if (btnType === "razorpay") {
                setIsButtonDisabled(false);
                return;
            }

            // if (pathname === page.url) {
            //     router.push(page.nextUrl);
            //     return;
            // }
        }
        setIsButtonDisabled(false);
    };

    useEffect(() => {
        if (pathname.includes("/addons")) {
            setCurrentPage(PAGES[1]);
        }

        if (pathname.includes("/checkout")) {
            setCurrentPage(PAGES[2]);
        }

        if (pathname.includes("/payment")) {
            setCurrentPage(PAGES[3]);
        }

        if (pathname.includes("/payment-success")) {
            setCurrentPage(PAGES[4]);
        }
    }, [pathname]);

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
                        {btnType === "whatsapp" ? (
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
