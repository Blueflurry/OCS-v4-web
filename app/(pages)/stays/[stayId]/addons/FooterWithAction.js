"use client";

import React from "react";
import Footer from "@/app/modules/Footer";

export default function FooterWithAction({ stayId }) {
    const handleProceed = () => {
        // Navigate to checkout
        window.location.href = `/stays/${stayId}/checkout`;
    };

    return <Footer btnText="Proceed to checkout" onClick={handleProceed} />;
}
