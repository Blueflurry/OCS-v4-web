import React from "react";
import styles from "./Addons.module.scss";

const Addons = async ({ params }) => {
    const { stayId } = await params;
    // console.log(stayId);

    return (
        <div>
            <h2>Stays</h2>
        </div>
    );
};

export default Addons;
