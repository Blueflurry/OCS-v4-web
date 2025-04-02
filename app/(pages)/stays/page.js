import Header from "@/app/modules/Header";
import Hero from "@/app/modules/Hero/Hero";
import styles from "./Stays.module.scss";
import { getFilteredStays } from "@/app/services/staysService";
import { Search } from "lucide-react";
import StayListings from "@/app/components/StayListings";

// Next.js server component that handles search parameters
export default async function Stays({ searchParams }) {
    const resolvedSearchParams = await searchParams;

    // Safely extract search parameters with defaults
    const location = resolvedSearchParams?.location || "";
    const checkin = resolvedSearchParams?.checkin || "";
    const checkout = resolvedSearchParams?.checkout || "";
    const men = parseInt(resolvedSearchParams?.men || "0", 10);
    const women = parseInt(resolvedSearchParams?.women || "0", 10);
    const children = parseInt(resolvedSearchParams?.children || "0", 10);
    const pets = parseInt(resolvedSearchParams?.pets || "0", 10);

    // Create a filters object with all search parameters
    const filters = {
        location,
        checkin,
        checkout,
        men,
        women,
        children,
        pets,
        page: 1,
        limit: 10,
    };

    // Fetch initial batch of filtered stays data (first 10 items)
    const initialStays = await getFilteredStays(filters);

    // Create description with dates and guests if available
    let description = "";
    if (checkin && checkout) {
        const checkInDate = new Date(checkin);
        const checkOutDate = new Date(checkout);
        description += `${checkInDate.toLocaleDateString()} - ${checkOutDate.toLocaleDateString()}`;
    }

    const totalGuests = men + women + children;
    if (totalGuests > 0) {
        description += description ? " • " : "";
        description += `${totalGuests} guest${totalGuests !== 1 ? "s" : ""}`;
    }

    if (pets > 0) {
        description += description ? " • " : "";
        description += `${pets} pet${pets !== 1 ? "s" : ""}`;
    }

    return (
        <>
            <Header />
            <Hero />
            <div className={styles["main"]}>
                <StayListings
                    initialStays={initialStays}
                    title={`Stays in ${location || "All Destinations"}`}
                    description={description}
                    filters={filters}
                />
                {/* icon={<Search />} */}
            </div>
        </>
    );
}
