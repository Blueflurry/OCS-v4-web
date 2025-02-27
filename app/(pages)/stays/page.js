import Header from "@/app/modules/Header";
import React from "react";
import Link from "next/link";

const Stays = () => {
    return (
        <>
            <Header />
            <Link href="/stays/24">Stays 24</Link>
        </>
    );
};

export default Stays;
