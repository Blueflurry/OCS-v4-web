import React from "react";
import styles from "./FooterWithoutTabs.module.scss";
import Image from "next/image";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";

const FooterWithoutTabs = () => {
    const currentYear = new Date().getFullYear();
    return (
        <div className={styles["footer"]}>
            <div className="container">
                <div className={styles["footer__brand"]}>
                    <Link href={"/"}>
                        <Image src="/assets/images/logo.svg" alt="OneClick Stays" width={100} height={44} />
                    </Link>
                    <div className={styles["footer__brand--social"]}>
                        <Link href={"/terms-and-conditions"}>
                            <Instagram />
                        </Link>
                        <Link href={"/terms-and-conditions"}>
                            <Linkedin style={{ marginLeft: 6 }} />
                        </Link>
                        <Link href={"/terms-and-conditions"}>
                            <Facebook />
                        </Link>
                    </div>
                </div>
                <div className={styles["footer__menu"]}>
                    <Link href={"/terms-and-conditions"}>Terms & Conditions</Link>
                    <Link href={"/privacy-policy"}>Privacy Policy</Link>
                    <Link href={"/refund-policy"}>Refund Policy</Link>
                </div>
                <div className={styles["footer__copyright"]}>
                    Copyright &copy; {currentYear}. All Rights Reserved.
                    <small>An entity of NurtureLuxe Experience Private Limited.</small>
                </div>
            </div>
        </div>
    );
};

export default FooterWithoutTabs;
