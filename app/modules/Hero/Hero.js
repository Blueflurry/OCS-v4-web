import Button from "@/app/components/Button";
import Image from "next/image";
import React from "react";
import styles from "./Hero.module.scss";

const Hero = () => {
    return (
        <div className={`${styles["hero"]} container`}>
            <h1>
                Book <span>Luxury Stays</span> <br />
                At Half The Price
            </h1>
            <p>We redefine how you book your stays.</p>
            <Button type="primary" large>
                <Image src="/assets/images/search.svg" alt="Search" width={20} height={20} />
                Start your search
            </Button>
        </div>
    );
};

export default Hero;
