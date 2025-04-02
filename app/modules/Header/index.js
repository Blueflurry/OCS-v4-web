// Header Component
import React from "react";
import Image from "next/image";
import Button from "../../components/Button";
import styles from "./Header.module.scss";
import Link from "next/link";

const Header = () => {
    return (
        <header className={`${styles["header"]} container`}>
            <Link href="/">
                <Image
                    src="/assets/images/logo.svg"
                    alt="OneClick Stays"
                    width={100}
                    height={44}
                    priority
                />
            </Link>
            <nav className={styles["header__actions"]}>
                <Button type="secondary">Login</Button>
                <Button type="secondary" square>
                    <Image
                        src="/assets/images/menu.svg"
                        alt="Menu"
                        width={20}
                        height={20}
                        priority
                    />
                </Button>
            </nav>
        </header>
    );
};

export default Header;
