"use client";
import React, { forwardRef } from "react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import styles from "./DateRangePicker.module.scss";

const DateRangePicker = (props) => {
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;

    const ExampleCustomInput = forwardRef(({ value, onClick, className }, ref) => (
        <button className={className} onClick={onClick} ref={ref}>
            {value}
        </button>
    ));

    return (
        <div className={styles["datepicker-container"]}>
            <DatePicker
                selectsRange={true}
                placeholderText="Click to select a date"
                startDate={startDate}
                endDate={endDate}
                onChange={(update) => {
                    setDateRange(update);
                }}
                monthsShown={2}
                withPortal
                customInput={<ExampleCustomInput className="example-custom-input" />}
            />
        </div>
    );
};

export default DateRangePicker;
