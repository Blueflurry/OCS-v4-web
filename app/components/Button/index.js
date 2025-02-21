import React from "react";
import styles from "./Button.module.scss";

const Button = ({ type = "secondary", children, square, large }) => {
    return (
        <span
            className={`${styles["button"]} ${styles[`button--${type}`]} ${large ? styles[`button--large`] : ""} ${
                square ? styles[`button--square`] : ""
            }`}
        >
            {children}
        </span>
    );
};

export default Button;
