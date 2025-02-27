"use client";
import React from "react";
import styles from "./FooterWithoutTabs.module.scss";
import Button from "@/app/components/Button";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

const FooterWithoutTabs = () => {
    const router = useRouter();
    const params = useParams();
    const stayId = params.stayId;
    // console.log(params);

    const handleCheckoutClick = () => {
        router.push(`/stays/${stayId}/addons`);
    };

    return (
        <div className={styles["footer"]} onClick={handleCheckoutClick}>
            <Button type="primary" large>
                Proceed to Checkout
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

export default FooterWithoutTabs;
