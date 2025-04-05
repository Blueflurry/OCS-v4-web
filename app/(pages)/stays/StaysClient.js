"use client";
import { useEffect } from "react";
import Header from "@/app/modules/Header";
import Hero from "@/app/modules/Hero/Hero";
import styles from "./Stays.module.scss";
import { getFilteredStays } from "@/app/services/staysService";
import { Search } from "lucide-react";
import StayListings from "@/app/components/StayListings";
import FooterWithoutTabs from "@/app/modules/Footer/FooterWithoutTabs";

// Client-side component that handles search parameters and saving to localStorage
export default function StaysClient({ searchParams, initialStays }) {
    // Parse and save search parameters to localStorage on page load
    useEffect(() => {
        if (typeof window !== "undefined" && searchParams) {
            // Extract search parameters from URL
            const location = searchParams?.location || "";
            const checkin = searchParams?.checkin || "";
            const checkout = searchParams?.checkout || "";
            const men = parseInt(searchParams?.men || "0", 10);
            const women = parseInt(searchParams?.women || "0", 10);
            const children = parseInt(searchParams?.children || "0", 10);
            const pets = parseInt(searchParams?.pets || "0", 10);

            // Calculate total guests
            const totalGuests = men + women + children;

            // Format dates for display
            let formattedCheckin = "";
            let formattedCheckout = "";
            let nights = 0;

            if (checkin) {
                const checkinDate = new Date(checkin);
                formattedCheckin = checkinDate.toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                });
            }

            if (checkout) {
                const checkoutDate = new Date(checkout);
                formattedCheckout = checkoutDate.toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                });
            }

            // Calculate nights if both dates are provided
            if (checkin && checkout) {
                const checkinDate = new Date(checkin);
                const checkoutDate = new Date(checkout);
                nights = Math.ceil(
                    (checkoutDate - checkinDate) / (1000 * 60 * 60 * 24)
                );
            }

            // Create search parameters object
            const searchParamsObj = {
                location,
                checkin,
                checkout,
                formattedCheckin,
                formattedCheckout,
                nights,
                men,
                women,
                children,
                pets,
                totalGuests,
            };

            // Save to localStorage
            localStorage.setItem(
                "searchParams",
                JSON.stringify(searchParamsObj)
            );
            console.log("Saved search parameters from URL:", searchParamsObj);
        }
    }, [searchParams]);

    // Create description with dates and guests if available
    let description = "";
    if (searchParams?.checkin && searchParams?.checkout) {
        const checkInDate = new Date(searchParams.checkin);
        const checkOutDate = new Date(searchParams.checkout);
        description += `${checkInDate.toLocaleDateString(
            "en-US"
        )} - ${checkOutDate.toLocaleDateString("en-US")}`;
        description += `${checkInDate.toLocaleDateString()} - ${checkOutDate.toLocaleDateString()}`;
    }

    const totalGuests =
        parseInt(searchParams?.men || "0", 10) +
        parseInt(searchParams?.women || "0", 10) +
        parseInt(searchParams?.children || "0", 10);

    if (totalGuests > 0) {
        description += description ? " • " : "";
        description += `${totalGuests} guest${totalGuests !== 1 ? "s" : ""}`;
    }

    if (parseInt(searchParams?.pets || "0", 10) > 0) {
        description += description ? " • " : "";
        description += `${searchParams.pets} pet${
            searchParams.pets !== 1 ? "s" : ""
        }`;
    }

    return (
        <>
            <Header />
            <Hero searchTxt={"Edit your search"} />
            <div className={styles["main"]}>
                <StayListings
                    initialStays={initialStays}
                    title={`Stays in ${
                        searchParams?.location || "All Destinations"
                    }`}
                    filters={searchParams}
                />
                {/* description={description} */}
            </div>
            <FooterWithoutTabs />
        </>
    );
}
