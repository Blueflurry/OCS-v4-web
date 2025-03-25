import Header from "@/app/modules/Header";
import React from "react";
import Link from "next/link";
import Loading from "@/app/loading";
import Hero from "@/app/modules/Hero/Hero";
import StayCarousel from "@/app/modules/StayCarousel";
import styles from "./Stays.module.scss";

const Stays = () => {
    return (
        <>
            <Header />
            <Hero />
            <div className={styles["main"]}>
                <StayCarousel vertical={true} />
            </div>
        </>
    );
};

export default Stays;
