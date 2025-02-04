"use client";
import React from "react";
import styles from "./Footer.module.scss";
import Tab from "@/app/components/Tab";
import { usePathname } from "next/navigation";

const Footer = () => {
    const pathname = usePathname();

    return (
        <div className={styles["footer"]}>
            <Tab active={pathname === "/"} icon="/assets/images/icon.svg" text="Home" href="/" />
            <Tab active={pathname === "/stays"} icon="/assets/images/icon.svg" text="Stays" href="/stays" />
            <Tab active={pathname === "/"} icon="/assets/images/icon.svg" text="Home" href="/" />
            <Tab active={pathname === "/"} icon="/assets/images/icon.svg" text="Home" href="/" />
            <Tab active={pathname === "/"} icon="/assets/images/icon.svg" text="Home" href="/" />
        </div>
    );
};

export default Footer;
