"use client";
import React from "react";
import Image from "next/image";
import Button from "../../components/Button";
import styles from "./Header.module.scss";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Header = () => {
    const router = useRouter();

    const handleLoginClick = () => {
        router.push("/login");
    };

    return (
        <div className={`${styles["header"]} container`}>
            <Link href={"/"}>
                <Image
                    src="/assets/images/logo.svg"
                    alt="OneClick Stays"
                    width={100}
                    height={44}
                />
            </Link>
            <div className={`${styles["header__actions"]}`}>
                <Button type="secondary" onClick={handleLoginClick}>
                    Login
                </Button>
                <Button type="secondary" square>
                    <Image
                        src="/assets/images/menu.svg"
                        alt="Menu"
                        width={20}
                        height={20}
                    />
                </Button>
            </div>
        </div>
    );
};

export default Header;
