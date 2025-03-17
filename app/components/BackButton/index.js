"use client";
import React from "react";
import styles from "./BackButton.module.scss";
import { useRouter } from "next/navigation";
import Image from "next/image";

const BackButton = ({ className, link, ...props }) => {
    const router = useRouter();

    const onClickBackBtn = () => {
        // console.log("Back Button Clicked");
        if (link) {
            router.push(link);
            return;
        }
        router.back();
    };

    return (
        <div
            tabIndex="-1"
            className={`${styles["back-button"]} ${className}`}
            onClick={onClickBackBtn}
            {...props}
        >
            <span className={styles["back-button--icon"]}>
                <Image
                    src="/assets/images/arrow-backward.svg"
                    width={20}
                    height={20}
                    alt="Back"
                ></Image>
            </span>
        </div>
    );
};

export default BackButton;
