"use client";
import React, { useEffect, useState } from "react";
import styles from "./Footer.module.scss";
import Button from "@/app/components/Button";
import Image from "next/image";
import { useParams, usePathname, useRouter } from "next/navigation";
import { PAGES } from "@/app/data/dummy";
import { ArrowRight } from "lucide-react";
import RazorpayButton from "@/app/components/RazorpayButton";

const Footer = ({ btnText, btnType = "primary", ...props }) => {
    const router = useRouter();
    const params = useParams();
    const stayId = params.stayId;
    const pathname = usePathname();
    const [currentPage, setCurrentPage] = useState(PAGES[0]);
    const [buttonType, setButtonType] = useState("primary");
    // type = pathname.includes("/addons") ? "secondary" : "primary";

    const handleCheckoutClick = () => {
        for (let idx = 0; idx < PAGES.length; idx++) {
            let page = PAGES[idx];
            page.url = page.url?.replace("${stayId}", stayId);
            page.nextUrl = page.nextUrl?.replace("${stayId}", stayId);
            // console.log("page.url", page.url, pathname, page.nextUrl);

            if (btnType == "razorpay") {
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
            // setButtonType("half-fill");
            setCurrentPage(PAGES[1]);
        }

        if (pathname.includes("/checkout")) {
            // setButtonType("sixtyfive-fill");
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
        <div className={styles["footer"]} onClick={handleCheckoutClick}>
            {btnType == "razorpay" ? (
                <>
                    <RazorpayButton></RazorpayButton>
                </>
            ) : (
                <Button type={btnType} large>
                    {btnType == "whatsapp" ? (
                        <>
                            <Image
                                src="/assets/images/whatsapp-icon.webp"
                                width={24}
                                height={24}
                                alt="arrow"
                            ></Image>

                            <span>
                                {/* {currentPage.id == 1 || currentPage.id == 2
                        ? "Proceed to Checkout"
                        : "Pay now"} */}

                                {btnText}
                            </span>
                        </>
                    ) : (
                        <></>
                    )}

                    {btnType != "whatsapp" && btnType != "razorpay" ? (
                        <>
                            <span>
                                {/* {currentPage.id == 1 || currentPage.id == 2
                         ? "Proceed to Checkout"
                         : "Pay now"} */}

                                {btnText}
                            </span>
                            <Image
                                src="/assets/images/arrow-forward.svg"
                                width={20}
                                height={20}
                                alt="arrow"
                            ></Image>
                        </>
                    ) : (
                        <></>
                    )}

                    {/* <ArrowRight /> */}
                </Button>
            )}
        </div>
    );
};

export default Footer;
