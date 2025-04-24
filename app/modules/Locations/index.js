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
                                <Link href="/stays?location=Bali">
                                    <Image
                                        src="/assets/images/locations/bali.jpeg"
                                        width={120}
                                        height={120}
                                        alt="Bali"
                                        className={styles["locations__image"]}
                                    />
                                </Link>
                                <Link href="/stays?location=Lonavala">
                                    <Image
                                        src="/assets/images/locations/lonavala.jpeg"
                                        width={120}
                                        height={120}
                                        alt="Lonavala"
                                        className={styles["locations__image"]}
                                    />
                                </Link>
                                <Link href="/stays?location=Kashmir">
                                    <Image
                                        src="/assets/images/locations/kashmir.jpeg"
                                        width={120}
                                        height={120}
                                        alt="Kashmir"
                                        className={styles["locations__image"]}
                                    />
                                </Link>
                                <Link href="/stays?location=Himachal Pradesh">
                                    <Image
                                        src="/assets/images/locations/himachal-pradesh.jpeg"
                                        width={120}
                                        height={120}
                                        alt="Himachal Pradesh"
                                        className={styles["locations__image"]}
                                    />
                                </Link>
                                <Link href="/stays?location=Uttrakhand">
                                    <Image
                                        src="/assets/images/locations/uttrakhand.jpeg"
                                        width={120}
                                        height={120}
                                        alt="Uttrakhand"
                                        className={styles["locations__image"]}
                                    />
                                </Link>
                                <Link href="/stays?location=Rajasthan">
                                    <Image
                                        src="/assets/images/locations/rajasthan.jpeg"
                                        width={120}
                                        height={120}
                                        alt="Rajasthan"
                                        className={styles["locations__image"]}
                                    />
                                </Link>
                                <Link href="/stays?location=Alibaug">
                                    <Image
                                        src="/assets/images/locations/alibaug.jpeg"
                                        width={120}
                                        height={120}
                                        alt="Alibaug"
                                        className={styles["locations__image"]}
                                    />
                                </Link>
                                <Link href="/stays?location=Delhi">
                                    <Image
                                        src="/assets/images/locations/delhi.jpeg"
                                        width={120}
                                        height={120}
                                        alt="Delhi"
                                        className={styles["locations__image"]}
                                    />
                                </Link>
                                <Link href="/stays?location=Goa">
                                    <Image
                                        src="/assets/images/locations/goa.jpeg"
                                        width={120}
                                        height={120}
                                        alt="Goa"
                                        className={styles["locations__image"]}
                                    />
                                </Link>
                                <Link href="/stays?location=Maldives">
                                    <Image
                                        src="/assets/images/locations/maldives.jpeg"
                                        width={120}
                                        height={120}
                                        alt="Maldives"
                                        className={styles["locations__image"]}
                                    />
                                </Link>
                                <Link href="/stays?location=Thailand">
                                    <Image
                                        src="/assets/images/locations/thailand.jpeg"
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
