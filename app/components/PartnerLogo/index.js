import React from "react";
import styles from "./PartnerLogo.module.scss";
import Image from "next/image";

const PartnerLogo = ({ name = "elivaas", color = "white", ...props }) => {
    let fileName = `${name.toLowerCase()}_${color.toLowerCase()}.svg`;

    let activeStyles = styles[name.toLowerCase()];

    return <Image src={`/assets/images/partners/${fileName}`} width={100} height={32} className={activeStyles} alt={name} {...props} />;
};

export default PartnerLogo;
