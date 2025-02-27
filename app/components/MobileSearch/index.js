"use client";
import Image from "next/image";
import Button from "../Button";
import styles from "./MobileSearch.module.scss";
import { useEffect, useState } from "react";
import DateRangePicker from "../DateRangePicker";

const MobileSearch = ({}) => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = ""; // Cleanup when component unmounts
        };
    }, [isOpen]);

    return (
        <>
            <Button large onClick={() => setIsOpen(true)}>
                <Image src="/assets/images/search.svg" alt="Search" width={20} height={20} />
                Start your search
            </Button>
            <div className={`${styles["mobile-search"]} ${isOpen ? styles["mobile-search--open"] : ""}`}>
                {/* BACK BUTTON */}
                <div tabIndex="-1" className={styles["back-button"]} onClick={() => setIsOpen(false)}>
                    <span className={styles["back-button--icon"]}>
                        <Image src="/assets/images/arrow-backward.svg" width={20} height={20} alt="Back"></Image>
                    </span>
                </div>
                {/* DATE PICKER */}
                <DateRangePicker />
            </div>
        </>
    );
};

export default MobileSearch;
