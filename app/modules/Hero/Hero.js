import React from "react";
import styles from "./Hero.module.scss";
import MobileSearch from "@/app/components/MobileSearch";

const Hero = ({ searchTxt, isListingPage = false }) => {
    return (
        <div className={`${styles["hero"]} container`}>
            {!isListingPage && (
                <>
                    <h1>
                        Book <span>Luxury Stays</span> <br />
                        At Half The Price
                    </h1>
                    <p>We redefine how you book your stays.</p>
                </>
            )}
            <MobileSearch searchTxt={searchTxt} />
            {isListingPage && <p style={{ marginTop: 12 }}>Showing you premium, hand-picked options</p>}
        </div>
    );
};

export default Hero;
