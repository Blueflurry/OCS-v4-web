"use client";
import React from "react";
import Image from "next/image";
import Button from "@/app/components/Button";
import { useRouter } from "next/navigation";
import styles from "./Welcome.module.scss";

const Welcome = () => {
    const router = useRouter();

    const handleCreateAccount = () => {
        router.push("/signup");
    };

    const handleLogin = () => {
        router.push("/login");
    };

    return (
        <div className={styles["welcome"]}>
            <div className={styles["welcome__container"]}>
                <div className={styles["welcome__logo"]}>
                    <Image
                        src="/assets/images/logo.svg"
                        alt="OneClick Stays"
                        width={150}
                        height={150}
                    />
                </div>

                <h1 className={styles["welcome__title"]}>
                    Welcome to <br />
                    OneClick Stays
                </h1>

                <p className={styles["welcome__description"]}>
                    Your gateway to luxury accommodations across India
                </p>

                <div className={styles["welcome__actions"]}>
                    {/* <Button type="primary" large onClick={handleCreateAccount}>
                        Create Account
                    </Button> */}

                    <Button type="primary" large onClick={handleLogin}>
                        Login
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Welcome;
