import React, { Suspense } from "react";
import styles from "./Addons.module.scss";
import Image from "next/image";
import Footer from "@/app/modules/Footer";
import BackButton from "@/app/components/BackButton";
import PartnerLogo from "@/app/components/PartnerLogo";
import { dummyAddonsData, dummyStaysData } from "@/app/constants/dummy";
import AddonsClient from "./AddonsClient";
import FooterWithAction from "./FooterWithAction";
import Loading from "./loading";

// Server component to fetch addons data
async function getAddonsData(stayId) {
    try {
        // MOCK DATA MODE - Use dummy data
        // Find the stay with the matching ID to get basic stay details
        const stay = dummyStaysData.find(
            (stay) => stay.id.toString() === stayId.toString()
        );

        if (!stay) {
            throw new Error("Stay not found");
        }

        // Combine stay details with addons data
        const addonsData = {
            ...dummyAddonsData,
            stayDetails: {
                title: stay.title,
                price: stay.price,
                bookingDates: {
                    checkIn: "2025-03-24",
                    checkOut: "2025-03-30",
                },
            },
        };

        return addonsData;

        // REAL API MODE - Uncomment this section when your API is ready
        /*
    const response = await fetch(`/api/stays/${stayId}/addons`, {
      cache: "no-store",
      next: { tags: [`stay-${stayId}-addons`] },
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch addons: ${response.status}`);
    }
    
    return await response.json();
    */
    } catch (error) {
        console.error("Error fetching addons:", error);
        throw error;
    }
}

const Addons = async ({ params }) => {
    // const { stayId } = params;
    const unwrappedParams = React.use(params);
    const { stayId } = unwrappedParams;

    // Fetch addons data
    const addonsData = await getAddonsData(stayId);

    return (
        <div className={styles["addons"]}>
            <BackButton />

            <div className={styles["addons__header"]}>
                <p>Make your experience special with...</p>
                <h2>
                    Exclusive Stay
                    <span>Add-Ons</span>
                </h2>

                <div className={styles["addons__header--partner"]}>
                    <Image
                        src="/assets/images/logo.svg"
                        alt="OneClick Stays"
                        width={100}
                        height={100}
                        style={{ width: "70px", marginBottom: "-4px" }}
                    />
                    <span className={styles[""]}>x</span>
                    <PartnerLogo
                        name={addonsData.partner || "elivaas"}
                        color="white"
                    />
                </div>
            </div>

            {/* addons listing */}
            <div className={styles["addons__listing"]}>
                <h4>{addonsData.title || "Pay at Stay"}</h4>
                <p className={styles["addons__listing--description"]}>
                    {addonsData.description ||
                        "Our team will contact you after you confirm your booking for these services. You don't have to pay at the time of booking."}
                </p>

                {/* Client component for interactive addons selection */}
                <Suspense fallback={<Loading />}>
                    <AddonsClient addons={addonsData.addons} />
                </Suspense>
            </div>

            {/* fixed */}
            <div className={styles["addons__fixed"]}>
                <div className={styles["addons__fixed--image"]}>
                    <Image
                        src="/assets/images/villa-1.svg"
                        width={100}
                        height={100}
                        alt="villa"
                    />
                </div>
                <div className={styles["addons__fixed--details"]}>
                    <h4>
                        {addonsData.stayDetails.title ||
                            "CEO's Paradise - OneClick Exclusive"}
                    </h4>
                    <p>
                        {addonsData.stayDetails.price?.discounted ||
                            "₹ 4,000/night"}
                    </p>
                    <p>
                        {new Date(
                            addonsData.stayDetails.bookingDates.checkIn
                        ).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                        })}{" "}
                        -
                        {new Date(
                            addonsData.stayDetails.bookingDates.checkOut
                        ).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                        })}
                    </p>
                </div>
            </div>

            {/* Client component for footer with proceed button */}
            <Suspense
                fallback={<div className={styles["footer-loading"]}></div>}
            >
                <FooterWithAction stayId={stayId} />
            </Suspense>
        </div>
    );
};

export default Addons;
