"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "./Locations.module.scss";
import Link from "next/link";
import Image from "next/image";

// Import all images from local folder
import baliImage from "../../../public/assets/images/locations/bali.jpeg";
import lonavalaImage from "../../../public/assets/images/locations/lonavala.jpeg";
import kashmirImage from "../../../public/assets/images/locations/kashmir.jpeg";
import himachalImage from "../../../public/assets/images/locations/himachal-pradesh.jpeg";
import uttarakhandImage from "../../../public/assets/images/locations/uttarakhand.jpeg";
import rajasthanImage from "../../../public/assets/images/locations/rajasthan.jpeg";
import alibaugImage from "../../../public/assets/images/locations/alibaug.jpeg";
import delhiImage from "../../../public/assets/images/locations/delhi.jpeg";
import goaImage from "../../../public/assets/images/locations/goa.jpeg";
import maldivesImage from "../../../public/assets/images/locations/maldives.jpeg";
import thailandImage from "../../../public/assets/images/locations/thailand.jpeg";

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
                                <Link href="/stays">
                                    <Image
                                        src={baliImage}
                                        width={120}
                                        height={120}
                                        alt="Bali"
                                        className={styles["locations__image"]}
                                    />
                                </Link>
                                <Link href="/stays?location=Lonavala, Maharashtra">
                                    <Image
                                        src={lonavalaImage}
                                        width={120}
                                        height={120}
                                        alt="Lonavala"
                                        className={styles["locations__image"]}
                                    />
                                </Link>
                                <Link href="/stays">
                                    <Image
                                        src={kashmirImage}
                                        width={120}
                                        height={120}
                                        alt="Kashmir"
                                        className={styles["locations__image"]}
                                    />
                                </Link>
                                <Link href="/stays?location=Himachal Pradesh, India">
                                    <Image
                                        src={himachalImage}
                                        width={120}
                                        height={120}
                                        alt="Himachal Pradesh"
                                        className={styles["locations__image"]}
                                    />
                                </Link>
                                <Link href="/stays?location=Uttarakhand, India">
                                    <Image
                                        src={uttarakhandImage}
                                        width={120}
                                        height={120}
                                        alt="Uttarakhand"
                                        className={styles["locations__image"]}
                                    />
                                </Link>
                                <Link href="/stays?location=Rajasthan, India">
                                    <Image
                                        src={rajasthanImage}
                                        width={120}
                                        height={120}
                                        alt="Rajasthan"
                                        className={styles["locations__image"]}
                                    />
                                </Link>
                                <Link href="/stays?location=Alibaug, Maharashtra">
                                    <Image
                                        src={alibaugImage}
                                        width={120}
                                        height={120}
                                        alt="Alibaug"
                                        className={styles["locations__image"]}
                                    />
                                </Link>
                                <Link href="/stays?location=Delhi, India">
                                    <Image
                                        src={delhiImage}
                                        width={120}
                                        height={120}
                                        alt="Delhi"
                                        className={styles["locations__image"]}
                                    />
                                </Link>
                                <Link href="/stays?location=Goa, India">
                                    <Image
                                        src={goaImage}
                                        width={120}
                                        height={120}
                                        alt="Goa"
                                        className={styles["locations__image"]}
                                    />
                                </Link>
                                <Link href="/stays">
                                    <Image
                                        src={maldivesImage}
                                        width={120}
                                        height={120}
                                        alt="Maldives"
                                        className={styles["locations__image"]}
                                    />
                                </Link>
                                <Link href="/stays">
                                    <Image
                                        src={thailandImage}
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
