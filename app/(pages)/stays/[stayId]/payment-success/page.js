"use client";
import React, { useEffect, useState } from "react";
import styles from "./PaymentSuccess.module.scss";
import Footer from "@/app/modules/Footer";
import Tag from "@/app/components/Tag";
import Image from "next/image";
// import Lottie from "lottie-react";
import successAnimation from "@/app/assets/success.json";
import dynamic from "next/dynamic";
import Button from "@/app/components/Button";
import Link from "next/link";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
const coinsOnBooking = 50;

const PaymentSuccess = () => {
    const [animationFlag, setAnimationFlag] = useState(false);

    const handleAnimationEnterFrame = (frame) => {
        // console.log("frame", frame);
        setTimeout(() => {
            setAnimationFlag(true);
        }, 800);
    };

    return (
        <div className={styles["payment"]}>
            <div className={styles["payment__header"]}>
                {/* animation */}
                <Lottie
                    animationData={successAnimation}
                    loop={false}
                    onEnterFrame={handleAnimationEnterFrame}
                />

                {animationFlag ? (
                    <div className={styles["payment__content"]}>
                        <h2>Hurray!</h2>
                        <p>Payment Completed Successfully.</p>
                        <Tag type="info">
                            <Image
                                src={"/assets/images/ocs-coin.svg"}
                                width={100}
                                height={100}
                                alt="OCS Coin"
                                className={styles["payment__coin-image"]}
                            ></Image>
                            <span className={styles["payment__coin-message"]}>
                                You have earned {coinsOnBooking} OCS Coins
                            </span>
                        </Tag>

                        <Link
                            href="/bookings/24"
                            className={styles["payment__bookingBtn"]}
                        >
                            <Button type="outline" large>
                                View Booking
                                <Image
                                    src="/assets/images/arrow-forward.svg"
                                    width={20}
                                    height={20}
                                    alt="arrow"
                                ></Image>
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <></>
                )}
            </div>

            {/* <Footer /> */}
        </div>
    );
};

export default PaymentSuccess;
