import React from "react";
import styles from "./BookingDetails.module.scss";
import Footer from "@/app/modules/Footer";
import Image from "next/image";
import BackButton from "@/app/components/BackButton";
import { BadgeCheck, CheckCheck, CircleCheckBig, Copy } from "lucide-react";
import Tag from "@/app/components/Tag";
import PartnerLogo from "@/app/components/PartnerLogo";
const COINSONBOOKING = 50;

const BookingDetails = () => {
    return (
        <div className={styles["booking"]}>
            <div className={styles["booking__header"]}>
                <div className={styles["booking__header--partner"]}>
                    <Image
                        src="/assets/images/logo.svg"
                        alt="OneClick Stays"
                        width={100}
                        height={100}
                        style={{ width: "70px", marginBottom: "-4px" }}
                    />
                    <span className={styles[""]}>x</span>
                    <PartnerLogo name="elivaas" color="white" />
                </div>
                <h2>Booking Details</h2>
                <p>
                    <span>Booking Id:</span>
                    #OCSBK299024
                    <Copy />
                </p>
                <p>
                    <span>Created at:</span>
                    Mar 24, 2025
                </p>

                <p>
                    <span>Status:</span>

                    <span className={styles["confirmed"]}>Confirmed</span>
                    <CircleCheckBig style={{ stroke: "lightgreen" }} />
                    {/* <BadgeCheck style={{ stroke: "lightgreen" }} /> */}
                </p>

                <BackButton className={styles["booking__backbtn"]}></BackButton>
            </div>

            <div className={styles["booking__details"]}>
                <div className={styles["booking__stay-details"]}>
                    <div className={styles["booking__stay-details--image"]}>
                        <Image
                            src="/assets/images/villa-1.svg"
                            width={100}
                            height={100}
                            alt="villa"
                        ></Image>
                    </div>
                    <div className={styles["booking__stay-details--details"]}>
                        <h4>CEO’s Paradise - OneClick Exclusive</h4>
                        <p>₹ 4,000/night</p>
                        <p>Mar 24, 2025 - Mar 30, 2025</p>
                    </div>
                </div>

                <div className={styles["booking__price-breakup"]}>
                    <h2>Stay Price Breakup</h2>
                    <div className={styles["booking__price-breakup--item"]}>
                        <h4>CEO’s Paradise - OneClick Exclusive</h4>
                        <p>₹98000</p>
                    </div>
                    <div className={styles["booking__price-breakup--item"]}>
                        <h4>SGST (8%)</h4>
                        <p>₹12000</p>
                    </div>
                    <div className={styles["booking__price-breakup--item"]}>
                        <h4>IGST (8%)</h4>
                        <p>₹12000</p>
                    </div>
                    <div className={styles["booking__price-breakup--item"]}>
                        <h4>Grand Total</h4>
                        <p>₹1,24,000</p>
                    </div>
                </div>

                <div className="container">
                    <Tag type="info">
                        <Image
                            src={"/assets/images/ocs-coin.svg"}
                            width={100}
                            height={100}
                            alt="OCS Coin"
                            className={styles["booking__coin-image"]}
                        ></Image>
                        <span className={styles["booking__coin-message"]}>
                            You have earned {COINSONBOOKING} OCS Coins
                        </span>
                    </Tag>
                </div>

                <div className={styles["booking__addons"]}>
                    <h2>Selected Add-ons</h2>
                    <p>You had requested these add-ons while booking.</p>
                    <div className={styles["booking__addons--item"]}>
                        <CheckCheck />
                        <h4>Indian Starboy Festival</h4>
                    </div>
                    <div className={styles["booking__addons--item"]}>
                        <CheckCheck />
                        <h4>Gourmet Meals</h4>
                    </div>
                    <div className={styles["booking__addons--item"]}>
                        <CheckCheck />
                        <h4>Airport Pickup</h4>
                    </div>
                    <div className={styles["booking__addons--item"]}>
                        <CheckCheck />
                        <h4>Sea Food & Crabs</h4>
                    </div>
                </div>

                <div className={styles["padding"]}></div>
            </div>

            <Footer btnText="Customer Support" btnType="whatsapp"></Footer>
        </div>
    );
};

export default BookingDetails;
