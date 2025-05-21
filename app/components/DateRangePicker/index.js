"use client";
import { useState } from "react";
import DatePicker from "react-datepicker";
import styles from "./DateRangePicker.module.scss";

const DateRangePicker = ({
    onChange,
    value = [null, null],
    onOpen,
    isOpen,
}) => {
    const [dateRange, setDateRange] = useState(value);
    const [startDate, endDate] = dateRange;
    const today = new Date();

    return (
        <div
            className={`${styles["datepicker-container"]} ${
                isOpen ? styles["datepicker-container--open"] : ""
            }`}
        >
            <DatePicker
                selectsRange={true}
                placeholderText="Click to select a date"
                startDate={startDate}
                endDate={endDate}
                onChange={(update) => {
                    setDateRange(update);
                    if (update[1] && onChange) {
                        onChange(update);
                        setTimeout(() => onOpen(false), 180);
                    }
                }}
                minDate={today}
                monthsShown={2}
                inline
                shouldCloseOnSelect={false}
                portalHost={
                    typeof document !== "undefined" ? document.body : null
                }
            />
        </div>
    );
};

export default DateRangePicker;
