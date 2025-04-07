"use client";
import { useEffect, useRef } from "react";
import styles from "./Loading.module.scss";

export default function Loading() {
    const pathRef = useRef(null);

    useEffect(() => {
        if (pathRef.current) {
            const length = pathRef.current.getTotalLength();
            pathRef.current.style.strokeDasharray = length;
            pathRef.current.style.strokeDashoffset = length;
        }
    }, []);

    return (
        <div className={styles["loaderContainer"]}>
            {/* <svg width="794" height="793" viewBox="0 0 794 793" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles["svg"]}>
                <path
                    d="M27 440.332C26.9997 -205.951 935.341 -33.9157 738.716 540.119H60.2364C80.8898 596.448 99.1364 619.952 134.732 658.165H639.007C545.815 779.13 388.223 783.521 257.362 744.121M134.732 440.332C120.704 21.743 689.938 48.3073 656.184 440.332M250.996 436.857C232.021 171.009 578.664 203.17 540.673 436.857"
                    stroke="#FFB401"
                    strokeWidth="53"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={styles["svg-elem-1"]}
                />
            </svg> */}
            <video
                src="/assets/animations/logo.mp4"
                loop
                autoPlay
                muted
                className={styles["svg"]}
            ></video>
            <span>Finding best stay options for you...</span>
        </div>
    );
}
