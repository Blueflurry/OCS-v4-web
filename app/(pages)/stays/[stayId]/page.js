import React from "react";
import styles from "./StayDetails.module.scss";
import HeroImageCarousel from "@/app/components/HeroImageCarousel";
import { VILLA_IMAGES } from "@/app/data/dummy";
import Categories from "@/app/components/Categories";
import Image from "next/image";
import DateRangePicker from "@/app/components/DateRangePicker";
import Button from "@/app/components/Button";
import Amenities from "@/app/components/Amenities";
import ReturnPolicy from "@/app/components/ReturnPolicy";
import Reviews from "@/app/components/Reviews";
import Header from "@/app/modules/Header";
import PartnerLogo from "@/app/components/PartnerLogo";
import GoogleMapComponent from "@/app/components/GMap";
import BackButton from "@/app/components/BackButton";
import Footer from "@/app/modules/Footer";

const StayDetails = async ({ params }) => {
    const { stayId } = await params;
    console.log(stayId);

    return (
        <>
            <div className={`${styles["hide-on-mobile"]}`}>
                <Header></Header>
            </div>
            <div className={`${styles["stay-details"]} container`}>
                <div className={styles["stay-details__carousel"]}>
                    <HeroImageCarousel images={VILLA_IMAGES} />
                    <BackButton></BackButton>

                    {/* <Categories images={VILLA_IMAGES}></Categories> */}

                    {/* progress bar */}
                    {/* <div className={styles["stay-details__progress-bar"]}>
                        <span
                            className={styles["stay-details__indicator-1"]}
                        ></span>
                        <span
                            className={styles["stay-details__indicator-2"]}
                        ></span>
                    </div> */}

                    {/* stay information */}
                    <div className={styles["stay-details__content"]}>
                        <div className={styles["stay-details__progress"]} />
                        <div className={styles["stay-details__header"]}>
                            {/* <div className={styles["stay-details__location"]}>
                                <Image
                                    src="/assets/images/location.svg"
                                    width={20}
                                    height={20}
                                    alt="Location"
                                />
                                <p>Asagao, Goa</p>
                            </div>
                            <span
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
                                <PartnerLogo name="elivaas" />
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
                    </div>

                    {/* map */}
                    <div className={styles["stay-details__map"]}>
                        <GoogleMapComponent />
                    </div>

                    {/* amenities */}
                    <Amenities></Amenities>

                    {/* <div className={styles["stay-details__separator-2"]}></div> */}

                    {/* policy */}
                    <ReturnPolicy></ReturnPolicy>

                    {/* <div className={styles["stay-details__separator-2"]}></div> */}

                    {/* reviews & ratings */}
                    <Reviews></Reviews>

                    {/* <div className={styles["padding"]}></div> */}
                </div>
            </div>

            <Footer></Footer>
        </>
    );
};

export default StayDetails;
