"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Button from "../Button";
import DateRangePicker from "../DateRangePicker";
import styles from "./MobileSearch.module.scss";
import { Calendar } from "lucide-react";
import { formatDateRange } from "@/app/utils/date";

const MobileSearch = ({}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [dateRange, setDateRange] = useState([null, null]);
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

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
                <div className="container" style={{ marginTop: 90 }}>
                    <Button large type="input" onClick={() => setIsDatePickerOpen(true)}>
                        <Calendar />
                        {formatDateRange(dateRange)}
                    </Button>
                    {/* DATE PICKER */}
                    <DateRangePicker
                        onChange={setDateRange}
                        value={dateRange}
                        onOpen={setIsDatePickerOpen}
                        isOpen={isDatePickerOpen}
                        inputClassName={styles["mobile-search__input"]}
                    />
                </div>
            </div>
        </>
    );
};

export default MobileSearch;
