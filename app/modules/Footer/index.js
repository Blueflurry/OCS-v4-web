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
        if (pathname.includes("/addons")) {
            setCurrentPage(PAGES[2]);
            router.push(`/stays/${stayId}/checkout`);
            return;
        } else {
            setCurrentPage(PAGES[1]);
            router.push(`/stays/${stayId}/addons`);
            return;
        }
    };

    useEffect(() => {
        // if (pathname.includes("/addons")) setButtonType("half-fill");
        // else setButtonType("sixtyfive-fill");
    }, [pathname]);

    return (
        <div className={styles["footer"]} onClick={handleCheckoutClick}>
            <Button type={buttonType} large>
                Proceed to Checkout
                {currentPage.id == 1 ? (
                    <Image
                        src="/assets/images/arrow-forward.svg"
                        width={20}
                        height={20}
                        alt="arrow"
                    ></Image>
                ) : currentPage.id == 2 ? (
                    <span>with 50%</span>
                ) : (
                    <span>Pay now</span>
                )}
            </Button>
        </div>
    );
};

export default Footer;
