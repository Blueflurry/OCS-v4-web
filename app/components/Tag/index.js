import React from "react";
import styles from "./Tag.module.scss";

const Tag = ({ children, type = "default" }) => {
    return <div className={`${styles.tag} ${styles[`tag--${type}`]}`}>{children}</div>;
};

export default Tag;
