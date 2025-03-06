import React from "react";
import styles from "./Checkout.module.scss";
import Footer from "@/app/modules/Footer";
import Image from "next/image";
import BackButton from "@/app/components/BackButton";
import { CheckCheck } from "lucide-react";

const Checkout = ({}) => {
    return (
        <div className={styles["checkout"]}>
            <div className={styles["checkout__header"]}>
                <h2>Checkout</h2>
                {/* <BackButton></BackButton> */}
            </div>

            <div className={styles["checkout__details"]}>
                <div className={styles["checkout__stay-details"]}>
                    <div className={styles["checkout__stay-details--image"]}>
                        <Image
                            src="/assets/images/villa-1.svg"
                            width={100}
                            height={100}
                            alt="villa"
                        ></Image>
                    </div>
                    <div className={styles["checkout__stay-details--details"]}>
                        <h4>CEO’s Paradise - OneClick Exclusive</h4>
                        <p>₹ 4,000/night</p>
                        <p>Mar 24, 2025 - Mar 30, 2025</p>
                    </div>
                </div>

                <div className={styles["checkout__price-breakup"]}>
                    <h2>Stay Price Breakup</h2>
                    <div className={styles["checkout__price-breakup--item"]}>
                        <h4>CEO’s Paradise - OneClick Exclusive</h4>
                        <p>₹98000</p>
                    </div>
                    <div className={styles["checkout__price-breakup--item"]}>
                        <h4>SGST (8%)</h4>
                        <p>₹12000</p>
                    </div>
                    <div className={styles["checkout__price-breakup--item"]}>
                        <h4>IGST (8%)</h4>
                        <p>₹12000</p>
                    </div>
                    <div className={styles["checkout__price-breakup--item"]}>
                        <h4>Grand Total</h4>
                        <p>₹1,24,000</p>
                    </div>
                </div>

                <div className={styles["checkout__addons"]}>
                    <h2>Requested Add-ons</h2>
                    <p>Our team will contact you to discuss these add-ons.</p>
                    <div className={styles["checkout__addons--item"]}>
                        <CheckCheck />
                        <h4>Indian Starboy Festival</h4>
                    </div>
                    <div className={styles["checkout__addons--item"]}>
                        <CheckCheck />
                        <h4>Gourmet Meals</h4>
                    </div>
                    <div className={styles["checkout__addons--item"]}>
                        <CheckCheck />
                        <h4>Airport Pickup</h4>
                    </div>
                    <div className={styles["checkout__addons--item"]}>
                        <CheckCheck />
                        <h4>Sea Food & Crabs</h4>
                    </div>
                </div>

                <div className={styles["padding"]}></div>
            </div>

            <Footer></Footer>
        </div>
    );
};

export default Checkout;
