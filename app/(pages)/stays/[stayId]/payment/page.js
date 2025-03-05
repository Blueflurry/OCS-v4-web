import React from "react";
import styles from "./Payment.module.scss";
import Footer from "@/app/modules/Footer";

const Payment = () => {
    return (
        <div className={styles["payment"]}>
            <h1>Payment in Progress</h1>
            <Footer />
        </div>
    );
};
export default Payment;
