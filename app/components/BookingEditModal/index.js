"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Button from "../Button";
import DateRangePicker from "../DateRangePicker";
import styles from "./BookingEditModal.module.scss";
import { ArrowLeft, ArrowRight, Calendar, UserRound } from "lucide-react";
import { formatDateRange, formatISODate } from "@/app/utils/formatter";
import { GUESTS } from "@/app/data/dummy";

const BookingEditModal = ({
    isOpen,
    onClose,
    onUpdate,
    initialBookingInfo,
}) => {
    const [dateRange, setDateRange] = useState([null, null]);
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const [guests, setGuests] = useState([...GUESTS]);
    const [isUpdateDisabled, setIsUpdateDisabled] = useState(true);

    // Set initial values when initialBookingInfo changes or modal opens
    useEffect(() => {
        if (initialBookingInfo && isOpen) {
            // Set date range if available in current booking
            if (
                initialBookingInfo.rawCheckin &&
                initialBookingInfo.rawCheckout
            ) {
                setDateRange([
                    new Date(initialBookingInfo.rawCheckin),
                    new Date(initialBookingInfo.rawCheckout),
                ]);
            }

            // Set guest counts if available
            const newGuests = [...guests];
            newGuests.forEach((guest) => {
                if (
                    guest.type === "Men" &&
                    initialBookingInfo.men !== undefined
                ) {
                    guest.count = initialBookingInfo.men;
                } else if (
                    guest.type === "Women" &&
                    initialBookingInfo.women !== undefined
                ) {
                    guest.count = initialBookingInfo.women;
                } else if (
                    guest.type === "Children" &&
                    initialBookingInfo.children !== undefined
                ) {
                    guest.count = initialBookingInfo.children;
                } else if (
                    guest.type === "Pets" &&
                    initialBookingInfo.pets !== undefined
                ) {
                    guest.count = initialBookingInfo.pets;
                }
            });
            setGuests(newGuests);
        }
    }, [initialBookingInfo, isOpen]);

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
            setIsDatePickerOpen(false);
        };
    }, [isOpen]);

    useEffect(() => {
        const totalGuests = guests.reduce((sum, guest) => sum + guest.count, 0);
        if (totalGuests > 0 && dateRange[0] && dateRange[1]) {
            // Check if both check-in and check-out dates are selected
            // and at least one guest is selected
            setIsUpdateDisabled(false);
        } else setIsUpdateDisabled(true);
    }, [guests, dateRange]);

    // Handle update button click
    const handleUpdate = () => {
        if (isUpdateDisabled) {
            alert("Please select the dates & at least 1 guest");
            return;
        }

        if (dateRange[0] - dateRange[1] == 1 || dateRange[0] >= dateRange[1]) {
            alert(
                "We are not taking bookings for 1 day, please select at least 2 days"
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

        // Create updated booking information
        const updatedBookingInfo = {
            checkin: formattedCheckin,
            checkout: formattedCheckout,
            rawCheckin: checkin,
            rawCheckout: checkout,
            nights: nights,
            guests: totalGuests,
            men: menCount,
            women: womenCount,
            children: childrenCount,
            pets: petsCount,
        };

        // Save updated booking to localStorage
        localStorage.setItem("booking", JSON.stringify(updatedBookingInfo));
        console.log("Updated booking:", updatedBookingInfo);

        // Call the onUpdate callback with updated booking
        if (onUpdate) {
            onUpdate(updatedBookingInfo);
        }

        // Close the modal
        if (onClose) {
            onClose();
        }
    };

    return (
        <div
            className={`${styles["mobile-search"]} ${
                isOpen ? styles["mobile-search--open"] : ""
            }`}
        >
            {/* BACK BUTTON */}
            <div
                tabIndex="-1"
                className={styles["back-button"]}
                onClick={onClose}
            >
                <span className={styles["back-button--icon"]}>
                    <ArrowLeft size={24} />
                </span>

                <h3>Edit Booking</h3>
            </div>

            <div
                className="container"
                style={{ marginTop: 80, textAlign: "center" }}
            >
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
                            className={styles["mobile-search__guests--item"]}
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

                {/* CTA UPDATE BTN */}
                <Button
                    large
                    type="primary"
                    onClick={handleUpdate}
                    disabled={isUpdateDisabled}
                >
                    Update Booking <ArrowRight />
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
    );
};

export default BookingEditModal;
