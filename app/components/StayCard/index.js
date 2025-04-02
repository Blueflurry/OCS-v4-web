import Image from "next/image";
import React from "react";
import styles from "./StayCard.module.scss";
import PartnerLogo from "../PartnerLogo";
import Link from "next/link";

const StayCard = ({ stay }) => {
    // If stay data is not provided, don't render
    if (!stay) return null;

    const {
        id,
        _id,
        name,
        location,
        images,
        rating,
        reviewCount,
        available,
        bhk,
        maxGuests,
        partner,
        pricing,
    } = stay;

    console.log(stay);
    // Get the first image or use a placeholder
    const imageUrl =
        images && images.length > 0 ? images[0] : "/assets/images/banner.webp";

    // Format prices for display (with thousands separator)
    const formatPrice = (price) => {
        return price.toLocaleString("en-IN");
    };

    return (
        <Link href={`/stays/${id | _id}`}>
            <div className={`${styles["stay-card"]}`}>
                <Image
                    src={imageUrl}
                    width={400}
                    height={500}
                    alt={name}
                    className={styles["stay-card__image"]}
                />

                <span className={styles["stay-card__indicator"]}>
                    {available ? "available" : "unavailable"}
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
                            <p>{location?.name || "Location Not Available"}</p>
                        </div>
                        <span className={styles["stay-card__separator"]} />
                        <div className={styles["stay-card__rating"]}>
                            <b>{rating?.toFixed(1) || "N/A"}</b>
                            <Image
                                src="/assets/images/ratings.svg"
                                width={20}
                                height={20}
                                alt="Rating"
                            />
                            <p>({reviewCount || 0} Reviews)</p>
                        </div>
                    </div>
                    <div className={styles["stay-card__title"]}>
                        <h3>{name}</h3>
                    </div>
                    <p className={styles["stay-card__capacity"]}>
                        <span className={styles["stay-card__capacity--amount"]}>
                            {bhk}
                        </span>{" "}
                        BHK
                        <span className={styles["stay-card__separator"]} />
                        <span className={styles["stay-card__capacity--amount"]}>
                            {maxGuests}
                        </span>{" "}
                        Guests
                        {partner && (
                            <>
                                <span
                                    className={styles["stay-card__separator"]}
                                />
                                <span className={styles["stay-card__partner"]}>
                                    <PartnerLogo name={partner.name} />
                                </span>
                            </>
                        )}
                    </p>
                    {pricing && (
                        <div className={styles["stay-card__price"]}>
                            <div>
                                {pricing.originalPrice && (
                                    <span
                                        className={
                                            styles["stay-card__price--striked"]
                                        }
                                    >
                                        ₹{formatPrice(pricing.originalPrice)}
                                    </span>
                                )}
                                <p
                                    className={
                                        styles["stay-card__price--active"]
                                    }
                                >
                                    ₹{formatPrice(pricing.currentPrice)}{" "}
                                    <span
                                        className={
                                            styles["stay-card__price--unit"]
                                        }
                                    >
                                        per night
                                    </span>
                                </p>
                            </div>
                            {pricing.perPerson && (
                                <p
                                    className={
                                        styles["stay-card__price--person"]
                                    }
                                >
                                    Equals to{" "}
                                    <b>₹{formatPrice(pricing.perPerson)}</b> per
                                    person
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
};

export default StayCard;
