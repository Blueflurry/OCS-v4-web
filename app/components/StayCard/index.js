import Image from "next/image";
import React from "react";
import styles from "./StayCard.module.scss";
import PartnerLogo from "../PartnerLogo";
import Link from "next/link";

const StayCard = ({ vertical, stayData, ...props }) => {
    return (
        <Link href={`/stays/${stayData.id}`}>
            <div
                className={`${styles["stay-card"]} ${
                    vertical ? styles["stay-card-vertical"] : ""
                }`}
            >
                <Image
                    src={stayData.bannerImage}
                    width={400}
                    height={500}
                    alt={stayData.title}
                    className={styles["stay-card__image"]}
                />

                <span className={styles["stay-card__indicator"]}>
                    {stayData.availability}
                </span>
                <div className={styles["stay-card__content"]}>
                    <div className={styles["stay-card__progress"]} />
                    <div className={styles["stay-card__header"]}>
                        <div className={styles["stay-card__location"]}>
                            <Image
                                src="/assets/images/location.svg"
                                width={20}
                                height={20}
                                alt="Location"
                            />
                            <p>{stayData.location}</p>
                        </div>
                        <span className={styles["stay-card__separator"]} />
                        <div className={styles["stay-card__rating"]}>
                            <b>{stayData.rating}</b>
                            <Image
                                src="/assets/images/ratings.svg"
                                width={20}
                                height={20}
                                alt="Rating"
                            />
                            <p>({stayData.reviewsCount} Reviews)</p>
                        </div>
                    </div>
                    <div className={styles["stay-card__title"]}>
                        <h3>{stayData.title}</h3>
                    </div>
                    <p className={styles["stay-card__capacity"]}>
                        <span className={styles["stay-card__capacity--amount"]}>
                            {stayData.bhk}
                        </span>{" "}
                        BHK
                        <span className={styles["stay-card__separator"]} />
                        <span className={styles["stay-card__capacity--amount"]}>
                            {stayData.guests}
                        </span>{" "}
                        Guests
                        <span className={styles["stay-card__separator"]} />
                        <span className={styles["stay-card__partner"]}>
                            <PartnerLogo name={stayData.partner} />
                        </span>
                    </p>
                    <div className={styles["stay-card__price"]}>
                        <div>
                            <span
                                className={styles["stay-card__price--striked"]}
                            >
                                {stayData.price.original}
                            </span>
                            <p className={styles["stay-card__price--active"]}>
                                {stayData.price.discounted}{" "}
                                <span
                                    className={styles["stay-card__price--unit"]}
                                >
                                    {stayData.price.unit}
                                </span>
                            </p>
                        </div>
                        <p className={styles["stay-card__price--person"]}>
                            Equals to <b>{stayData.price.perPerson}</b> per
                            person
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default StayCard;
