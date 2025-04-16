"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Button from "../../components/Button";
import styles from "./Header.module.scss";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Header = () => {
    const router = useRouter();
    const [user, setUser] = useState(null);

    // Move localStorage access into useEffect
    useEffect(() => {
        // This code will only run on the client side
        const userFromStorage = localStorage.getItem("user");

        console.log("userFromStorage", userFromStorage);
        if (userFromStorage) {
            setUser(JSON.parse(userFromStorage));
        }
    }, []);

    const handleLoginClick = () => {
        router.push("/login");
    };

    return (
        <div className={`${styles["header"]} container`}>
            <Link href={"/"}>
                <Image
                    src="/assets/images/logo.svg"
                    alt="OneClick Stays"
                    width={200}
                    height={88}
                    className={styles["header__logo"]}
                />
            </Link>
            <div className={`${styles["header__actions"]}`}>
                {
                    // don't show if user exists
                    !user && (
                        <Button type="secondary" onClick={handleLoginClick}>
                            Login
                        </Button>
                    )
                }
                {/* <Button type="secondary" square>
                    <Image
                        src="/assets/images/menu.svg"
                        alt="Menu"
                        width={20}
                        height={20}
                    />
                </Button> */}
            </div>
        </div>
    );
};

export default Header;
