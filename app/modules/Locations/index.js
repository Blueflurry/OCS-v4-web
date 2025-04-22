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
                // console.log("SCROLLED");
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
                                        src="/assets/images/locations/location-carousel-1.jpeg"
                                        width={120}
                                        height={120}
                                        alt="Bali"
                                        className={styles["locations__image"]}
                                    />
                                </Link>
                                <Link href="/">
                                    <Image
                                        src="/assets/images/locations/location-carousel-2.jpeg"
                                        width={120}
                                        height={120}
                                        alt="Lonavala"
                                        className={styles["locations__image"]}
                                    />
                                </Link>
                                <Link href="/">
                                    <Image
                                        src="/assets/images/locations/location-carousel-3.jpeg"
                                        width={120}
                                        height={120}
                                        alt="Kashmir"
                                        className={styles["locations__image"]}
                                    />
                                </Link>
                                <Link href="/">
                                    <Image
                                        src="/assets/images/locations/location-carousel-4.jpeg"
                                        width={120}
                                        height={120}
                                        alt="Himachal Pradesh"
                                        className={styles["locations__image"]}
                                    />
                                </Link>
                                <Link href="/">
                                    <Image
                                        src="/assets/images/locations/location-carousel-5.jpeg"
                                        width={120}
                                        height={120}
                                        alt="Uttrakhand"
                                        className={styles["locations__image"]}
                                    />
                                </Link>
                                <Link href="/">
                                    <Image
                                        src="/assets/images/locations/location-carousel-6.jpeg"
                                        width={120}
                                        height={120}
                                        alt="Rajasthan"
                                        className={styles["locations__image"]}
                                    />
                                </Link>
                                <Link href="/">
                                    <Image
                                        src="/assets/images/locations/location-carousel-7.jpeg"
                                        width={120}
                                        height={120}
                                        alt="Alibaug"
                                        className={styles["locations__image"]}
                                    />
                                </Link>
                                <Link href="/">
                                    <Image
                                        src="/assets/images/locations/location-carousel-8.jpeg"
                                        width={120}
                                        height={120}
                                        alt="Delhi"
                                        className={styles["locations__image"]}
                                    />
                                </Link>
                                <Link href="/">
                                    <Image
                                        src="/assets/images/locations/location-carousel-9.jpeg"
                                        width={120}
                                        height={120}
                                        alt="Goa"
                                        className={styles["locations__image"]}
                                    />
                                </Link>
                                <Link href="/">
                                    <Image
                                        src="/assets/images/locations/location-carousel-10.jpeg"
                                        width={120}
                                        height={120}
                                        alt="Maldives"
                                        className={styles["locations__image"]}
                                    />
                                </Link>
                                <Link href="/">
                                    <Image
                                        src="/assets/images/locations/location-carousel-11.jpeg"
                                        width={120}
                                        height={120}
                                        alt="Thailand"
                                        className={styles["locations__image"]}
                                    />
                                </Link>
                            </React.Fragment>
                        )
                    )}
                </div>
            </div>
        </>
    );
};

export default Locations;
