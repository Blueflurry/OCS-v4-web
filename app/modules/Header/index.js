import React from "react";
import Image from "next/image";
import Button from "../../components/Button";
import styles from "./Header.module.scss";

const Header = () => {
    return (
        <div className={`${styles["header"]} container`}>
            <Image src="/assets/images/logo.svg" alt="OneClick Stays" width={110} height={44} />
            <div className={`${styles["header__actions"]}`}>
                <Button type="secondary">Login</Button>
                <Button type="secondary" square>
                    <Image src="/assets/images/menu.svg" alt="Menu" width={24} height={24} />
                </Button>
            </div>
        </div>
    );
};

export default Header;
