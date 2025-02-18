import React from "react";
import styles from "./StayDetails.module.scss";
import StayCard from "@/app/components/StayCard";
import ImageCarousel from "@/app/components/ImageCarousel";
import { VILLA_IMAGES } from "@/app/data/dummy";
import Categories from "@/app/components/Categories";
import Image from "next/image";
import DateRangePicker from "@/app/components/DateRangePicker";
import Button from "@/app/components/Button";

const StayDetails = () => {
    return (
        <div className={styles["stay-details"]}>
            <div className={styles["stay-details__carousel"]}>
                <div style={{ padding: "30px 0px 200px" }}>
                    <ImageCarousel images={VILLA_IMAGES} />
                    <Categories images={VILLA_IMAGES}></Categories>

                    {/* <StayCard></StayCard> */}
                    {/* progress bar */}
                    <div className={styles["stay-details__progress-bar"]}>
                        <span
                            className={styles["stay-details__indicator-1"]}
                        ></span>
                        <span
                            className={styles["stay-details__indicator-2"]}
                        ></span>
                    </div>

                    {/* stay information */}
                    <div className={styles["stay-details__content"]}>
                        <div className={styles["stay-details__header"]}>
                            {/* <div className={styles["stay-details__location"]}>
                                <Image
                                    src="/assets/images/location.svg"
                                    width={20}
                                    height={20}
                                    alt="Location"
                                />
                                <p>Asagao, Goa</p>
                            </div> */}
                            {/* <span
                                className={styles["stay-details__separator"]}
                            /> */}
                            <div className={styles["stay-details__rating"]}>
                                <b>5.0</b>
                                <Image
                                    src="/assets/images/ratings.svg"
                                    width={20}
                                    height={20}
                                    alt="Location"
                                />
                                <p>(300 Reviews)</p>
                            </div>
                        </div>
                        <div className={styles["stay-details__title"]}>
                            <h3>Sereno By The Sea</h3>
                            {/* <span className={styles["stay-details__separator"]} />
                    <h3>
                        4 <span>BHK</span>
                    </h3> */}
                        </div>
                        <p className={styles["stay-details__capacity"]}>
                            <span
                                className={
                                    styles["stay-details__capacity--amount"]
                                }
                            >
                                2
                            </span>{" "}
                            BHK
                            <span
                                className={styles["stay-details__separator"]}
                            />
                            <span
                                className={
                                    styles["stay-details__capacity--amount"]
                                }
                            >
                                4
                            </span>{" "}
                            Guests
                            <span
                                className={styles["stay-details__separator"]}
                            />
                            <span className={styles["stay-details__partner"]}>
                                Hosted by <span>Elivaas</span>
                            </span>
                        </p>
                        <div className={styles["stay-details__price"]}>
                            <div>
                                <span
                                    className={
                                        styles["stay-details__price--striked"]
                                    }
                                >
                                    ₹65,500
                                </span>
                                <p
                                    className={
                                        styles["stay-details__price--active"]
                                    }
                                >
                                    ₹45,500{" "}
                                    <span
                                        className={
                                            styles["stay-details__price--unit"]
                                        }
                                    >
                                        per night
                                    </span>
                                </p>
                            </div>
                            <p
                                className={
                                    styles["stay-details__price--person"]
                                }
                            >
                                Equals to <b>₹10,000</b> per person
                            </p>
                        </div>

                        {/* date picker */}
                        <div className={styles["stay-details__date-picker"]}>
                            <DateRangePicker></DateRangePicker>
                        </div>

                        <div className={styles["stay-details__location_group"]}>
                            <div className={styles["stay-details__location"]}>
                                <Image
                                    src="/assets/images/location.svg"
                                    width={20}
                                    height={20}
                                    alt="Location"
                                />
                                <p>Asagao, Goa</p>
                            </div>
                            <div
                                className={styles["stay-details__locationBtn"]}
                            >
                                <Button>
                                    <Image
                                        src="/assets/images/redirect.svg"
                                        alt="Search"
                                        width={20}
                                        height={20}
                                    />
                                    Open in map
                                </Button>
                            </div>
                        </div>
                    </div>
                    {/* map */}
                    <div className={styles["stay-details__map"]}>
                        <Image
                            src="/assets/images/map.svg"
                            width={400}
                            height={250}
                            alt="Map"
                        />
                    </div>

                    {/* amenities */}
                </div>
            </div>
        </div>
    );
};

export default StayDetails;
