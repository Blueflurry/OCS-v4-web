"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Button from "../Button";
import DateRangePicker from "../DateRangePicker";
import styles from "./MobileSearch.module.scss";
import { Calendar, MapPin, MousePointer2, Search } from "lucide-react";
import { formatDateRange } from "@/app/utils/date";

const MobileSearch = ({}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [dateRange, setDateRange] = useState([null, null]);
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const [autocompleteVal, setAutocompleteVal] = useState("");
    const [locationDropdown, setLocationDropdown] = useState(false);
    const options = [
        { key: 1, value: "Apple" },
        { key: 2, value: "Banana" },
        { key: 3, value: "Cherry" },
        { key: 4, value: "Date" },
        { key: 5, value: "Grapes" },
        { key: 6, value: "Mango" },
        { key: 7, value: "Orange" },
        { key: 8, value: "Peach" },
        { key: 9, value: "Pineapple" },
        { key: 10, value: "Strawberry" },
    ];

    const [filteredOptions, setFilteredOptions] = useState([]);

    const handleLocationSelect = (option) => {
        setAutocompleteVal(option.value);
        setLocationDropdown(false);
    };

    const handleLocationChange = (e) => {
        setLocationDropdown(true);

        const value = e.target.value;
        setAutocompleteVal(value);

        setFilteredOptions(
            options.filter((option) =>
                option.value.toLowerCase().includes(value.toLowerCase())
            )
        );
    };

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = ""; // Cleanup when component unmounts
            setLocationDropdown(false);
            setIsDatePickerOpen(false);
        };
    }, [isOpen]);

    return (
        <>
            <Button large onClick={() => setIsOpen(true)}>
                <Image
                    src="/assets/images/search.svg"
                    alt="Search"
                    width={20}
                    height={20}
                />
                Start your search
            </Button>
            <div
                className={`${styles["mobile-search"]} ${
                    isOpen ? styles["mobile-search--open"] : ""
                }`}
            >
                {/* BACK BUTTON */}
                <div
                    tabIndex="-1"
                    className={styles["back-button"]}
                    onClick={() => setIsOpen(false)}
                >
                    <span className={styles["back-button--icon"]}>
                        <Image
                            src="/assets/images/arrow-backward.svg"
                            width={20}
                            height={20}
                            alt="Back"
                        ></Image>
                    </span>

                    <h3>Search</h3>
                </div>

                <div className="container" style={{ marginTop: 90 }}>
                    {/* LOCATION */}
                    <div className={styles["autocomplete"]}>
                        <div className={styles["autocomplete--input-wrapper"]}>
                            <Search className={styles["search-icon"]} />
                            <input
                                type="text"
                                value={autocompleteVal}
                                onChange={handleLocationChange}
                                onClick={handleLocationChange}
                                className={styles["autocomplete--input"]}
                                style={{
                                    marginBottom: locationDropdown ? 0 : 20,
                                }}
                                placeholder="Location"
                            />
                        </div>

                        {locationDropdown && (
                            <div
                                className={styles.modal}
                                onClick={() => setIsLocationOpen(false)}
                            >
                                <div
                                    className={styles.modalContent}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <ul
                                        className={
                                            styles["autocomplete--dropdown"]
                                        }
                                    >
                                        {/* fixed current location */}
                                        <li
                                            className={
                                                styles["autocomplete--item"]
                                            }
                                        >
                                            {/* mouse-pointer-2 */}
                                            <MousePointer2></MousePointer2>
                                            <span>Use my current location</span>
                                        </li>
                                        {/* list */}
                                        {filteredOptions.length > 0 ? (
                                            filteredOptions.map(
                                                (option, index) => (
                                                    <li
                                                        key={option.key}
                                                        className={
                                                            styles[
                                                                "autocomplete--item"
                                                            ]
                                                        }
                                                        onClick={() =>
                                                            handleLocationSelect(
                                                                option
                                                            )
                                                        }
                                                    >
                                                        <MapPin></MapPin>
                                                        <span>
                                                            {option.value}
                                                        </span>
                                                    </li>
                                                )
                                            )
                                        ) : (
                                            <li
                                                className={
                                                    styles[
                                                        "autocomplete--no-results"
                                                    ]
                                                }
                                            >
                                                No results found
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* DATE PICKER BUTTON */}
                    <Button
                        large
                        type="input"
                        onClick={() => setIsDatePickerOpen(true)}
                    >
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

                    {/* GUESTS */}

                    {/* CTA SEARCH BTN */}
                </div>
            </div>
        </>
    );
};

export default MobileSearch;
