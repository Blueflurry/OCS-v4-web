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
const Footer = ({
    btnText,
    btnType = "primary",
    onClick,
    showTotalAmount = false,
    totalAmount = 0,
}) => {
    const router = useRouter();
    const params = useParams();
    const stayId = params.stayId;
    const pathname = usePathname();
    const [currentPage, setCurrentPage] = useState(PAGES[0]);

    const handleCheckoutClick = () => {
        // If custom onClick is provided, call it first
        if (onClick) {
            onClick();
            return;
        }

        // Otherwise, use the default navigation logic
        for (let idx = 0; idx < PAGES.length; idx++) {
            let page = PAGES[idx];
            page.url = page.url?.replace("${stayId}", stayId);
            page.nextUrl = page.nextUrl?.replace("${stayId}", stayId);

            if (btnType === "razorpay") {
                return;
            }

            if (pathname === page.url) {
                router.push(page.nextUrl);
                return; // Exit the loop
            }
        }
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
            {/* {showTotalAmount && (
                <div className={styles["total-amount"]}>
                    <span>Total</span>
                    <h4>₹{formatCurrency(totalAmount)}</h4>
                </div>
            )} */}

            <div
                className={styles["button-container"]}
                onClick={handleCheckoutClick}
            >
                {btnType === "razorpay" ? (
                    <RazorpayButton />
                ) : (
                    <Button type={btnType} large>
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
