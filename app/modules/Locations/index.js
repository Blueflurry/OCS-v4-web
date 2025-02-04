import React from "react";
import styles from "./Locations.module.scss";
import Link from "next/link";
import Image from "next/image";

const Locations = () => {
    return (
        <>
            <div className={styles["locations"]}>
                <div className={styles["locations__wrapper"]}>
                    {[...Array(2)].map(
                        (
                            _,
                            i // Duplicate images for seamless looping
                        ) => (
                            <React.Fragment key={i}>
                                <Link href="/">
                                    <Image
                                        src="/assets/images/himachal.png"
                                        width={120}
                                        height={120}
                                        alt="Goa"
                                        className={styles["locations__image"]}
                                    />
                                </Link>
                                <Link href="/">
                                    <Image
                                        src="/assets/images/himachal.png"
                                        width={120}
                                        height={120}
                                        alt="Goa"
                                        className={styles["locations__image"]}
                                    />
                                </Link>
                                <Link href="/">
                                    <Image
                                        src="/assets/images/himachal.png"
                                        width={120}
                                        height={120}
                                        alt="Goa"
                                        className={styles["locations__image"]}
                                    />
                                </Link>
                                <Link href="/">
                                    <Image
                                        src="/assets/images/himachal.png"
                                        width={120}
                                        height={120}
                                        alt="Goa"
                                        className={styles["locations__image"]}
                                    />
                                </Link>
                                <Link href="/">
                                    <Image
                                        src="/assets/images/himachal.png"
                                        width={120}
                                        height={120}
                                        alt="Goa"
                                        className={styles["locations__image"]}
                                    />
                                </Link>
                            </React.Fragment>
                        )
                    )}
                </div>
            </div>
            <div className={styles["locations2"]}>
                <div className={styles["locations2__wrapper"]}>
                    {[...Array(2)].map(
                        (
                            _,
                            i // Duplicate images for seamless looping
                        ) => (
                            <React.Fragment key={i}>
                                <Link href="/">
                                    <Image
                                        src="/assets/images/himachal.png"
                                        width={120}
                                        height={120}
                                        alt="Goa"
                                        className={styles["locations2__image"]}
                                    />
                                </Link>
                                <Link href="/">
                                    <Image
                                        src="/assets/images/himachal.png"
                                        width={120}
                                        height={120}
                                        alt="Goa"
                                        className={styles["locations2__image"]}
                                    />
                                </Link>
                                <Link href="/">
                                    <Image
                                        src="/assets/images/himachal.png"
                                        width={120}
                                        height={120}
                                        alt="Goa"
                                        className={styles["locations2__image"]}
                                    />
                                </Link>
                                <Link href="/">
                                    <Image
                                        src="/assets/images/himachal.png"
                                        width={120}
                                        height={120}
                                        alt="Goa"
                                        className={styles["locations2__image"]}
                                    />
                                </Link>
                                <Link href="/">
                                    <Image
                                        src="/assets/images/himachal.png"
                                        width={120}
                                        height={120}
                                        alt="Goa"
                                        className={styles["locations2__image"]}
                                    />
                                </Link>
                            </React.Fragment>
                        )
                    )}
                </div>
            </div>
        </>
    );
};

export default Locations;
