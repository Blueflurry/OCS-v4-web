"use client";
import React from "react";
import styles from "./BackButton.module.scss";
import { useRouter } from "next/navigation";
import Image from "next/image";

const BackButton = () => {
    const router = useRouter();

    const onClickBackBtn = () => {
        console.log("Back Button Clicked");
        router.back();
    };

    return (
        <div
            tabIndex="-1"
            className={styles["back-button"]}
            onClick={onClickBackBtn}
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
