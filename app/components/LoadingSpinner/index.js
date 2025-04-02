// app/components/LoadingSpinner.js
"use client";

import React from "react";
import styles from "./LoadingSpinner.module.scss";

const LoadingSpinner = () => {
    return (
        <div className={styles.spinnerContainer}>
            <div className={styles.spinner}></div>
            <p>Loading...</p>
        </div>
    );
};

export default LoadingSpinner;
