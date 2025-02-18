"use client";
import React from "react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import styles from "./DateRangePicker.module.scss";
import "react-datepicker/dist/react-datepicker.css";

const DateRangePicker = (props) => {
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;
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
                isClearable={true}
            />
        </div>
    );
};

export default DateRangePicker;
