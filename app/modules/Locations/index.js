"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "./Locations.module.scss";
import Link from "next/link";
import Image from "next/image";

const Locations = () => {
    const [scrolled, setScrolled] = useState(false);
    const locationsRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                console.log("SCROLLED");
                setScrolled(
                    entry.boundingClientRect.top <= window.innerHeight * 0.2
                );
            },
            { threshold: 0.1 }
        );

        if (locationsRef.current) {
            observer.observe(locationsRef.current);
        }

        return () => {
            if (locationsRef.current) {
                observer.unobserve(locationsRef.current);
            }
        };
    }, []);

    return (
        <>
            <div
                className={`${styles["locations"]} ${
                    scrolled ? styles["locations__scrolled"] : ""
                }`}
            >
                <div className={styles["locations__wrapper"]}>
                    {[...Array(2)].map(
                        (
                            _,
                            i // Duplicate images for seamless looping
                        ) => (
                            <React.Fragment key={i}>
                                <Link href="/">
                                    <Image
                                        src="/assets/images/location-carousel-1.png"
                                        width={120}
                                        height={120}
                                        alt="Goa"
                                        className={styles["locations__image"]}
                                    />
                                </Link>
                                <Link href="/">
                                    <Image
                                        src="/assets/images/location-carousel-2.png"
                                        width={120}
                                        height={120}
                                        alt="Goa"
                                        className={styles["locations__image"]}
                                    />
                                </Link>
                                <Link href="/">
                                    <Image
                                        src="/assets/images/location-carousel-3.png"
                                        width={120}
                                        height={120}
                                        alt="Goa"
                                        className={styles["locations__image"]}
                                    />
                                </Link>
                                <Link href="/">
                                    <Image
                                        src="/assets/images/location-carousel-4.png"
                                        width={120}
                                        height={120}
                                        alt="Goa"
                                        className={styles["locations__image"]}
                                    />
                                </Link>
                                <Link href="/">
                                    <Image
                                        src="/assets/images/location-carousel-5.png"
                                        width={120}
                                        height={120}
                                        alt="Goa"
                                        className={styles["locations__image"]}
                                    />
                                </Link>
                            </React.Fragment>
                        )
                    )}
                </div>
            </div>
            {/* <div className={styles["locations2"]}>
                <div className={styles["locations2__wrapper"]}>
                    {[...Array(2)].map(
                        (
                            _,
                            i // Duplicate images for seamless looping
                        ) => (
                            <React.Fragment key={i}>
                                <Link href="/">
                                    <Image
                                        src="/assets/images/himachal.png"
                                        width={120}
                                        height={120}
                                        alt="Goa"
                                        className={styles["locations2__image"]}
                                    />
                                </Link>
                                <Link href="/">
                                    <Image
                                        src="/assets/images/himachal.png"
                                        width={120}
                                        height={120}
                                        alt="Goa"
                                        className={styles["locations2__image"]}
                                    />
                                </Link>
                                <Link href="/">
                                    <Image
                                        src="/assets/images/himachal.png"
                                        width={120}
                                        height={120}
                                        alt="Goa"
                                        className={styles["locations2__image"]}
                                    />
                                </Link>
                                <Link href="/">
                                    <Image
                                        src="/assets/images/himachal.png"
                                        width={120}
                                        height={120}
                                        alt="Goa"
                                        className={styles["locations2__image"]}
                                    />
                                </Link>
                                <Link href="/">
                                    <Image
                                        src="/assets/images/himachal.png"
                                        width={120}
                                        height={120}
                                        alt="Goa"
                                        className={styles["locations2__image"]}
                                    />
                                </Link>
                            </React.Fragment>
                        )
                    )}
                </div>
            </div> */}
        </>
    );
};

export default Locations;
