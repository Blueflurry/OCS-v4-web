import Image from "next/image";
import React from "react";
import styles from "./StayCard.module.scss";

const StayCard = () => {
    return (
        <div className={styles["stay-card"]}>
            <Image src="/assets/images/banner.webp" width={400} height={300} alt="Shimla" className={styles["stay-card__image"]} />
            <div className={styles["stay-card__content"]}>
                {/* <Image src="/assets/images/lohono.svg" width={70} height={30} alt="Lohono Stays" className={styles["stay-card__content--vendor"]} /> */}
                <div className={styles["stay-card__location"]}>
                    <Image src="/assets/images/location.svg" width={20} height={20} alt="Location" />
                    <p>Asagao, Goa</p>
                </div>
                <h3>Villa Ola Amigo</h3>
                <p className={styles["stay-card__capacity"]}>
                    <span className={styles["stay-card__capacity--amount"]}>2</span> BHK
                    <span className={styles["stay-card__capacity--separator"]} />
                    <span className={styles["stay-card__capacity--amount"]}>4</span> Guests
                </p>
                <p className={styles["stay-card__partner"]}>
                    In partnership with <span>Lohono Stays</span>
                </p>
                <hr />
                <div className={styles["stay-card__price"]}>
                    <div>
                        <span className={styles["stay-card__price--striked"]}>₹65,500</span>
                        <p className={styles["stay-card__price--active"]}>
                            ₹45,500{" "}
                            <span className={styles["stay-card__price--unit"]}>
                                <span>/</span>night
                            </span>
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
