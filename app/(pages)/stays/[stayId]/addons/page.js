"use client";
import React, { use, useState, useEffect } from "react";
import styles from "./Addons.module.scss";
import Image from "next/image";
import Footer from "@/app/modules/Footer";
import BackButton from "@/app/components/BackButton";
import { ADDONSERVICES } from "@/app/data/dummy";
import PartnerLogo from "@/app/components/PartnerLogo";

const Addons = ({ params }) => {
    const { stayId } = use(params);
    const [services, setServices] = useState(ADDONSERVICES);
    // console.log(stayId);

    const onChangeCheckBox = (event) => {
        const { value, checked } = event.target;

        setServices((prev) => {
            const updatedServices = prev.map((ct) =>
                ct.id == value ? { ...ct, isChecked: checked } : ct
            );
            return updatedServices;
            // .sort((a, b) => b.isChecked - a.isChecked);
        });
    };

    return (
        <div className={styles["addons"]}>
            {/* <BackButton></BackButton> */}

            <div className={styles["addons__header"]}>
                <p>
                    Make your experience special with...
                    {/* Book Now <span>|</span> Pay Later <span>|</span> 0%
                    Commission */}
                </p>
                <h2>
                    Exclusive Stay
                    <span>Add-Ons</span>
                </h2>

                <div className={styles["addons__header--partner"]}>
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
            </div>

            {/* addons listing */}
            <div className={styles["addons__listing"]}>
                <h4>Pay at Stay</h4>
                <p className={styles["addons__listing--description"]}>
                    {/* Exclusive in-stay services from Elivaas on OneClick Stay
                    bookings. Tap to select, pay later at the stay, with 0%
                    commission. */}
                    Our team will contact you after you confirm your booking for
                    these services. You don't have to pay at the time of
                    booking.
                </p>
                {services.map((service, index) => (
                    <div
                        className={styles["addons__listing--row"]}
                        key={service.id}
                    >
                        <label
                            htmlFor={service.id}
                            className={
                                styles["addons__listing--row-checkLabel"]
                            }
                        >
                            <input
                                type="checkbox"
                                value={service.id}
                                name="isSelected"
                                onChange={onChangeCheckBox}
                                id={service.id}
                                checked={service.isChecked}
                            />
                        </label>

                        {/* Item */}
                        <div
                            className={`${styles["addons__listing--item"]} ${
                                service.isChecked
                                    ? styles["addons__listing--item--selected"]
                                    : ""
                            }`}
                            onClick={() =>
                                onChangeCheckBox({
                                    target: {
                                        value: service.id,
                                        checked: !service.isChecked,
                                    },
                                })
                            }
                        >
                            <Image
                                src={service.imgUrl}
                                width={200}
                                height={200}
                                alt="activity"
                                className={
                                    styles["addons__listing--item-image"]
                                }
                            ></Image>
                            <div
                                className={
                                    styles["addons__listing--item-details"]
                                }
                            >
                                <h2>{service.serviceName}</h2>
                                <h4>
                                    {/* Starting from */}
                                    <span>{service.pricePerNight}</span>
                                </h4>
                                <p>{service.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* fixed */}
            <div className={styles["addons__fixed"]}>
                <div className={styles["addons__fixed--image"]}>
                    <Image
                        src="/assets/images/villa-1.svg"
                        width={100}
                        height={100}
                        alt="villa"
                    ></Image>
                </div>
                <div className={styles["addons__fixed--details"]}>
                    <h4>CEO’s Paradise - OneClick Exclusive</h4>
                    <p>Rs. 4,000/night</p>
                    <p>Mar 24, 2025 - Mar 30, 2025</p>
                </div>
            </div>

            <Footer></Footer>
        </div>
    );
};

export default Addons;
