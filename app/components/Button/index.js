import React from "react";
import styles from "./Button.module.scss";

const Button = ({ type = "secondary", children, square, large }) => {
    return (
        <span
            className={`${styles["button"]} ${styles[`button--${type}`]} ${
                large ? styles[`button--large`] : ""
            }
            `}
            style={{ width: square ? "46px" : "auto" }}
        >
            {children}
        </span>
    );
};

export default Button;
