import React from "react";
import styles from "./Addons.module.scss";
import Image from "next/image";

const Addons = async ({ params }) => {
    const { stayId } = await params;
    // console.log(stayId);

    return (
        <div className={styles["addons"]}>
            <h2>Stays</h2>

            {/* fixed */}
            <div className={styles["addons__fixed"]}>
                <div className={styles["addons__fixed--image"]}>
                    <Image
                        src="/assets/images/villa-1.jpg"
                        width={40}
                        height={40}
                        alt="villa"
                    ></Image>
                </div>
                <div className={styles["addons__fixed--image"]}></div>
            </div>
        </div>
    );
};

export default Addons;
