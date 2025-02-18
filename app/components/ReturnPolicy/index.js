"use client";
import React from "react";
import styles from "./ReturnPolicy.module.scss";
import { POLICY_LIST } from "@/app/data/dummy";
import Image from "next/image";

const ReturnPolicy = () => {
    const policy = POLICY_LIST;
    return (
        <div className={styles["policy"]}>
            <h3>Cancellation & Refund Policy</h3>

            <div className={styles["policy__list"]}>
                {policy.map((policy_item) => (
                    <div
                        key={policy_item.id}
                        className={styles["policy__item"]}
                    >
                        <div className={styles["policy__item-icon"]}>
                            <Image
                                src={policy_item.icon}
                                alt={policy_item.name}
                                width={50}
                                height={60}
                            />
                        </div>
                        <div className={styles["policy__item-description"]}>
                            <h4>{policy_item.title}</h4>
                            <p>{policy_item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReturnPolicy;
