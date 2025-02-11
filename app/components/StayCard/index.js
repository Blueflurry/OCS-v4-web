import Image from "next/image";
import React from "react";
import styles from "./StayCard.module.scss";

const StayCard = () => {
    return (
        <div className={styles["stay-card"]}>
            <Image src="/assets/images/banner.webp" width={400} height={500} alt="Shimla" className={styles["stay-card__image"]} />
            {/* <div className={styles["stay-card__overlay"]} /> */}

            <span className={styles["stay-card__indicator"]}>Few dates left</span>
            <div className={styles["stay-card__content"]}>
                <div className={styles["stay-card__progress"]} />
                <div className={styles["stay-card__header"]}>
                    <div className={styles["stay-card__location"]}>
                        <Image src="/assets/images/location.svg" width={20} height={20} alt="Location" />
                        <p>Asagao, Goa</p>
                    </div>
                    <span className={styles["stay-card__separator"]} />
                    <div className={styles["stay-card__rating"]}>
                        <b>5.0</b>
                        <Image src="/assets/images/ratings.svg" width={20} height={20} alt="Location" />
                        <p>(300 Reviews)</p>
                    </div>
                </div>
                <div className={styles["stay-card__title"]}>
                    <h3>Sereno By The Sea</h3>
                    {/* <span className={styles["stay-card__separator"]} />
                    <h3>
                        4 <span>BHK</span>
                    </h3> */}
                </div>
                <p className={styles["stay-card__capacity"]}>
                    <span className={styles["stay-card__capacity--amount"]}>2</span> BHK
                    <span className={styles["stay-card__separator"]} />
                    <span className={styles["stay-card__capacity--amount"]}>4</span> Guests
                    <span className={styles["stay-card__separator"]} />
                    <span className={styles["stay-card__partner"]}>
                        Hosted by <span>Elivaas</span>
                    </span>
                </p>
                <div className={styles["stay-card__price"]}>
                    <div>
                        <span className={styles["stay-card__price--striked"]}>₹65,500</span>
                        <p className={styles["stay-card__price--active"]}>
                            ₹45,500 <span className={styles["stay-card__price--unit"]}>per night</span>
                        </p>
                    </div>
                    <p className={styles["stay-card__price--person"]}>
                        Equals to <b>₹10,000</b> per person
                    </p>
                </div>
            </div>
        </div>
    );
};

export default StayCard;
