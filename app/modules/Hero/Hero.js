import React from "react";
import styles from "./Hero.module.scss";
import MobileSearch from "@/app/components/MobileSearch";

const Hero = ({ searchTxt }) => {
    return (
        <div className={`${styles["hero"]} container`}>
            <h1>
                Book <span>Luxury Stays</span> <br />
                At Half The Price
            </h1>
            <p>We redefine how you book your stays.</p>
            <MobileSearch searchTxt={searchTxt} />
        </div>
    );
};

export default Hero;
