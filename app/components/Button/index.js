import React from "react";
import styles from "./Button.module.scss";

const Button = ({ type, children, square, large, disabled, ...props }) => {
    return (
        <div
            className={`${styles["button"]} ${
                type ? styles[`button--${type}`] : ""
            } ${large ? styles[`button--large`] : ""} ${
                square ? styles[`button--square`] : ""
            }
            ${disabled ? styles[`button--disabled`] : ""}
            `}
            {...props}
        >
            {children}
        </div>
    );
};

export default Button;
