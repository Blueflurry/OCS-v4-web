"use client";
import React, { useEffect, useState } from "react";
import styles from "./Footer.module.scss";
import Button from "@/app/components/Button";
import Image from "next/image";
import { useParams, usePathname, useRouter } from "next/navigation";
import { PAGES } from "@/app/data/dummy";

const Footer = () => {
    const [services, setServices] = useState([]);

    const router = useRouter();
    const params = useParams();
    const stayId = params.stayId;
    const pathname = usePathname();
    // console.log(pathname);

    // console.log(services);

    const [currentPage, setCurrentPage] = useState(PAGES[0]);
    const [buttonType, setButtonType] = useState("primary");
    // type = pathname.includes("/addons") ? "secondary" : "primary";
    // console.log(params);

    const handleCheckoutClick = () => {
        // console.log("pathname", pathname);
        // let stayId = params.stayId;

        for (let idx = 0; idx < PAGES.length; idx++) {
            let page = PAGES[idx];
            page.url = page.url.replace("${stayId}", stayId);
            page.nextUrl = page.nextUrl.replace("${stayId}", stayId);
            console.log("page.url", page.url, pathname, page.nextUrl);
            if (pathname === page.url) {
                // setCurrentPage(page);
                router.push(page.nextUrl);
                break; // Exit the loop
            }
        }
    };

    useEffect(() => {
        if (pathname.includes("/addons")) {
            // setButtonType("half-fill");
            setCurrentPage(PAGES[1]);
        }

        if (pathname.includes("/checkout")) {
            setCurrentPage(PAGES[2]);
            // setButtonType("sixtyfive-fill");
        }
    }, [pathname]);

    return (
        <div className={styles["footer"]} onClick={handleCheckoutClick}>
            <Button type={buttonType} large>
                <span>
                    {currentPage.id == 1 || currentPage.id == 2
                        ? "Proceed to Checkout"
                        : "Pay now"}
                </span>
                <Image
                    src="/assets/images/arrow-forward.svg"
                    width={20}
                    height={20}
                    alt="arrow"
                ></Image>
            </Button>
        </div>
    );
};

export default Footer;
