import React from "react";
import styles from "./Addons.module.scss";
import Image from "next/image";
import Footer from "@/app/modules/Footer";
import BackButton from "@/app/components/BackButton";
import { ADDONSERVICES } from "@/app/data/dummy";

const Addons = async ({ params }) => {
    const { stayId } = await params;
    const services = ADDONSERVICES;
    // console.log(stayId);

    return (
        <div className={styles["addons"]}>
            <BackButton></BackButton>

            <div className={styles["addons__header"]}>
                <h2>
                    Enhance your experience with incredible
                    <span>Add-Ons</span>
                </h2>
                <p>
                    Book Now <span>|</span> Pay Later <span>|</span> 0%
                    Commission
                </p>
            </div>

            {/* addons listing */}
            <div className={styles["addons__listing"]}>
                {services.map((service, index) => (
                    <div
                        className={styles["addons__listing--item"]}
                        key={service.id}
                    >
                        <div className={styles["addons__listing--item-image"]}>
                            <Image
                                src={service.imgUrl}
                                width={100}
                                height={100}
                                alt="activity"
                            ></Image>
                        </div>
                        <div
                            className={styles["addons__listing--item-details"]}
                        >
                            <h2>{service.serviceName}</h2>
                            <h4>
                                Starting from
                                <span>{service.pricePerNight}</span>
                            </h4>
                            <p>{service.description}</p>
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
