"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Button from "../Button";
import DateRangePicker from "../DateRangePicker";
import styles from "./MobileSearch.module.scss";
import {
    ArrowLeft,
    ArrowRight,
    Calendar,
    MapPin,
    MousePointer2,
    Search,
    UserRound,
} from "lucide-react";
import { formatDateRange, formatISODate } from "@/app/utils/formatter";
import { GUESTS } from "@/app/data/dummy";
import { useRouter } from "next/navigation";

const MobileSearch = ({ searchTxt }) => {
    const searchTxtRef = searchTxt || "Start your search";
    const router = useRouter();

    const [isOpen, setIsOpen] = useState(false);
    const [dateRange, setDateRange] = useState([null, null]);
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const [autocompleteVal, setAutocompleteVal] = useState("");
    const [locationDropdown, setLocationDropdown] = useState(false);
    const [filteredLocationOptions, setFilteredLocationOptions] = useState([]);
    const [guests, setGuests] = useState([...GUESTS]);
    const [isSearchDisabled, setIsSearchDisabled] = useState(true);
    const locationOptions = [
        { key: 1, value: "Goa" },
        { key: 2, value: "Mumbai" },
        { key: 3, value: "Delhi" },
        { key: 4, value: "Bangalore" },
        { key: 5, value: "Jaipur" },
        { key: 6, value: "Manali" },
        { key: 7, value: "Udaipur" },
        { key: 8, value: "Kerala" },
        { key: 9, value: "Chennai" },
        { key: 10, value: "Kolkata" },
    ];

    const handleLocationSelect = (option) => {
        setAutocompleteVal(option.value);
        setLocationDropdown(false);
    };

    const handleLocationChange = (e) => {
        setLocationDropdown(true);

        const value = e.target.value;
        setAutocompleteVal(value);

        setFilteredLocationOptions(
            locationOptions.filter((option) =>
                option.value.toLowerCase().includes(value.toLowerCase())
            )
        );
    };

    const decreaseCount = (index) => {
        const newGuests = [...guests];
        newGuests[index].count = Math.max(0, newGuests[index].count - 1);
        setGuests(newGuests);
    };

    const increaseCount = (index) => {
        const newGuests = [...guests];
        newGuests[index].count = newGuests[index].count + 1;
        setGuests(newGuests);
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

    useEffect(() => {
        const totalGuests = guests.reduce((sum, guest) => sum + guest.count, 0);
        if (totalGuests > 0 && dateRange[0] && dateRange[1]) {
            // Check if both check-in and check-out dates are selected
            // and at least one guest is selected
            setIsSearchDisabled(false);
        } else setIsSearchDisabled(true);
    }, [guests, dateRange]);

    // Handle search button click
    const handleSearch = () => {
        if (isSearchDisabled) {
            alert("Please select the dates & atleast 1 guest");
            return;
        }

        if (dateRange[0] - dateRange[1] == 1 || dateRange[0] >= dateRange[1]) {
            alert(
                "We are not taking bookings for 1 day, please select atleast 2 days"
            );
            return;
        }

        // Extract guest counts by type
        const menCount = guests.find((g) => g.type === "Men")?.count || 0;
        const womenCount = guests.find((g) => g.type === "Women")?.count || 0;
        const childrenCount =
            guests.find((g) => g.type === "Children")?.count || 0;
        const petsCount = guests.find((g) => g.type === "Pets")?.count || 0;

        // Format dates as ISO strings if they exist
        const checkin = dateRange[0] ? formatISODate(dateRange[0]) : "";
        const checkout = dateRange[1] ? formatISODate(dateRange[1]) : "";

        // Calculate number of nights if both dates are selected
        let nights = 0;
        if (dateRange[0] && dateRange[1]) {
            nights = Math.ceil(
                (dateRange[1] - dateRange[0]) / (1000 * 60 * 60 * 24)
            );
        }

        // Format dates for display
        const formattedCheckin = dateRange[0]
            ? dateRange[0].toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
              })
            : "";
        const formattedCheckout = dateRange[1]
            ? dateRange[1].toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
              })
            : "";

        // Calculate total guests
        const totalGuests = menCount + womenCount + childrenCount;

        // Save search parameters to localStorage for use in booking flow
        const searchParams = {
            location: autocompleteVal,
            checkin: checkin,
            checkout: checkout,
            formattedCheckin: formattedCheckin,
            formattedCheckout: formattedCheckout,
            nights: nights,
            men: menCount,
            women: womenCount,
            children: childrenCount,
            pets: petsCount,
            totalGuests: totalGuests,
        };

        localStorage.setItem("searchParams", JSON.stringify(searchParams));
        console.log("Saved search parameters:", searchParams);

        // Create the query string for URL
        const queryParams = new URLSearchParams({
            location: autocompleteVal,
            checkin,
            checkout,
            men: menCount,
            women: womenCount,
            children: childrenCount,
            pets: petsCount,
        }).toString();

        // Navigate to stays page with search parameters
        router.push(`/stays?${queryParams}`);

        // Close the search modal
        setIsOpen(false);
    };

    return (
        <>
            <div style={{ padding: "0 16px" }}>
                <Button large onClick={() => setIsOpen(true)}>
                    <Image
                        src="/assets/images/search.svg"
                        alt="Search"
                        width={20}
                        height={20}
                    />
                    {searchTxtRef}
                </Button>
            </div>
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
                        <ArrowLeft size={18} />
                    </span>

                    <h3>Search</h3>
                </div>

                <div className="container" style={{ marginTop: 80 }}>
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
                                        {filteredLocationOptions.length > 0 ? (
                                            filteredLocationOptions.map(
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

                    {/* guests */}
                    <div className={styles["mobile-search__guests"]}>
                        <div className={styles["mobile-search__guests--head"]}>
                            <UserRound />
                            <h4>Guests</h4>
                        </div>

                        {guests.map((guest, index) => (
                            <div
                                className={
                                    styles["mobile-search__guests--item"]
                                }
                                key={index}
                            >
                                <div>{guest.type}</div>
                                <div
                                    className={
                                        styles["mobile-search__guests--count"]
                                    }
                                >
                                    <div
                                        onClick={() => {
                                            decreaseCount(index);
                                        }}
                                    >
                                        -
                                    </div>
                                    <div>{guest.count}</div>
                                    <div
                                        onClick={() => {
                                            increaseCount(index);
                                        }}
                                    >
                                        +
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* CTA SEARCH BTN */}
                    <Button
                        large
                        type="primary"
                        onClick={handleSearch}
                        disabled={isSearchDisabled}
                    >
                        Search Stays <ArrowRight />
                    </Button>

                    {/* logo */}
                    <div style={{ marginTop: 0 }}>
                        <Image
                            src="/assets/images/logo.svg"
                            alt="OneClick Stays"
                            width={90}
                            height={90}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default MobileSearch;
