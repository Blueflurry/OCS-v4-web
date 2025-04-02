"use client";

import React, { useState } from "react";
import Image from "next/image";
import styles from "./Addons.module.scss";

export default function AddonsClient({ addons }) {
    const [services, setServices] = useState([...addons]);

    const onChangeCheckBox = (event) => {
        const { value, checked } = event.target;

        setServices((prev) => {
            const updatedServices = prev.map((ct) =>
                ct.id.toString() === value.toString()
                    ? { ...ct, isChecked: checked }
                    : ct
            );
            return updatedServices;
        });
    };

    return (
        <>
            {services.map((service) => (
                <div
                    className={styles["addons__listing--row"]}
                    key={service.id}
                >
                    <label
                        htmlFor={service.id}
                        className={styles["addons__listing--row-checkLabel"]}
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
                            className={styles["addons__listing--item-image"]}
                        />
                        <div
                            className={styles["addons__listing--item-details"]}
                        >
                            <h2>{service.serviceName}</h2>
                            <h4>
                                <span>{service.pricePerNight}</span>
                            </h4>
                            <p>{service.description}</p>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}
