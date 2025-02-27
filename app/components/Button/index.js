import React from "react";
import styles from "./Button.module.scss";

const Button = ({ type, children, square, large, ...props }) => {
    return (
        <span
            className={`${styles["button"]} ${type ? styles[`button--${type}`] : ""} ${large ? styles[`button--large`] : ""} ${
                square ? styles[`button--square`] : ""
            }`}
            {...props}
        >
            {children}
        </span>
    );
};

export default Button;
