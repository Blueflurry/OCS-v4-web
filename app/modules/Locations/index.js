"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "./Locations.module.scss";
import Link from "next/link";
import Image from "next/image";

const Locations = ({ data }) => {
    // console.log(data);
    const [scrolled, setScrolled] = useState(false);
    const locationsRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
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
                    {data.map((location, i) => (
                        <Link href={location.link} key={i}>
                            <Image
                                src={location.image}
                                width={120}
                                height={120}
                                alt={location.name}
                                className={styles["locations__image"]}
                            />
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Locations;
