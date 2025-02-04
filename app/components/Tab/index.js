import Image from "next/image";
import React from "react";
import styles from "./Tab.module.scss";
import Link from "next/link";

const Tab = ({ active, icon, text, href }) => {
    return (
        <Link href={href} className={`${styles.tab} ${active ? styles["tab--active"] : ""}`}>
            <Image src={icon} alt={text} width={28} height={28} className={styles["tab__icon"]} />
            <span className={styles["tab__text"]}>{text}</span>
        </Link>
    );
};

export default Tab;
