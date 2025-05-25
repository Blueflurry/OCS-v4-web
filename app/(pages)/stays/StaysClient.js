"use client";
import { useEffect, useState } from "react";
import Header from "@/app/modules/Header";
import Hero from "@/app/modules/Hero/Hero";
import styles from "./Stays.module.scss";
import { getFilteredStays } from "@/app/services/staysService";
import { SlidersHorizontal } from "lucide-react";
import StayListings from "@/app/components/StayListings";
import FooterWithoutTabs from "@/app/modules/Footer/FooterWithoutTabs";
import StaysFilter from "@/app/components/StaysFilter";

// Client-side component that handles search parameters and saving to localStorage
export default function StaysClient({ searchParams, initialStays, totalCount }) {
    // State for filter drawer and stays data
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [stays, setStays] = useState(initialStays);
    const [loading, setLoading] = useState(false);
    const [activeFilters, setActiveFilters] = useState({});
    const [resultsCount, setResultsCount] = useState(totalCount || 0);

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
                nights = Math.ceil((checkoutDate - checkinDate) / (1000 * 60 * 60 * 24));
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
            localStorage.setItem("searchParams", JSON.stringify(searchParamsObj));
            // console.log("Saved search parameters from URL:", searchParamsObj);
        }
    }, [searchParams]);

    // Handle applying filters
    const handleApplyFilters = async (filterValues) => {
        setLoading(true);

        try {
            // Prepare amenities array
            const selectedAmenities = Object.keys(filterValues.amenities || {}).filter((key) => filterValues.amenities[key]);

            // Combine search params with new filters
            const apiFilters = {
                // Keep the original search parameters
                location: searchParams?.location || "",
                checkin: searchParams?.checkin || "",
                checkout: searchParams?.checkout || "",
                men: parseInt(searchParams?.men || "0", 10),
                women: parseInt(searchParams?.women || "0", 10),
                children: parseInt(searchParams?.children || "0", 10),
                pets: parseInt(searchParams?.pets || "0", 10),

                // New filter parameters
                luxuryLevel: filterValues.luxuryLevel || "",
                stayType: filterValues.stayType || "",
                stayVibe: filterValues.stayVibe || "",
                addOnService: filterValues.addOnService || "",

                // Price range
                priceMin: filterValues.priceRange?.min || 3000,
                priceMax: filterValues.priceRange?.max || 500000,

                // Room configuration
                bedrooms: filterValues?.rooms?.bedrooms !== "Any" ? filterValues?.rooms?.bedrooms : "",
                // beds:
                //     filterValues.rooms?.beds !== "Any"
                //         ? filterValues.rooms.beds
                //         : "",
                bathrooms: filterValues?.rooms?.bathrooms !== "Any" ? filterValues?.rooms?.bathrooms : "",

                // Amenities array
                amenities: selectedAmenities.length > 0 ? selectedAmenities : [],

                // Pagination parameters
                page: 1,
                limit: 10,
            };

            // Remove undefined values
            Object.keys(apiFilters).forEach((key) => apiFilters[key] === undefined && delete apiFilters[key]);

            // console.log("Applying filters to API:", apiFilters);

            // Fetch filtered stays
            const filteredStays = await getFilteredStays(apiFilters);
            setStays(filteredStays.results);

            // console.log("filteredStays", filteredStays);
            setResultsCount(filteredStays.pagination.totalResults);

            // Save active filters
            setActiveFilters(filterValues);
        } catch (error) {
            console.error("Error applying filters:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setStays(initialStays);

        // console.log("filteredStays", filteredStays);
        setResultsCount(totalCount);

        // Save active filters
        // setActiveFilters(filterValues);

        // handleApplyFilters(searchParams);
    }, [initialStays]);

    // Create description with dates and guests if available
    let description = "";
    if (searchParams?.checkin && searchParams?.checkout) {
        const checkInDate = new Date(searchParams.checkin);
        const checkOutDate = new Date(searchParams.checkout);
        description += `${checkInDate.toLocaleDateString("en-US")} - ${checkOutDate.toLocaleDateString("en-US")}`;
    }

    const totalGuests =
        parseInt(searchParams?.men || "0", 10) + parseInt(searchParams?.women || "0", 10) + parseInt(searchParams?.children || "0", 10);

    if (totalGuests > 0) {
        description += description ? " • " : "";
        description += `${totalGuests} guest${totalGuests !== 1 ? "s" : ""}`;
    }

    if (parseInt(searchParams?.pets || "0", 10) > 0) {
        description += description ? " • " : "";
        description += `${searchParams.pets} pet${searchParams.pets !== 1 ? "s" : ""}`;
    }

    return (
        <>
            <Header />
            <br />
            <Hero searchTxt={"Edit your search"} isListingPage />
            <div className={styles["main"]}>
                {/* Filter button */}
                <div className={styles["filter-button-container"]}>
                    <h4>Showing {resultsCount} results</h4>
                    <button className={styles["filter-button"]} onClick={() => setIsFilterOpen(true)}>
                        <SlidersHorizontal size={18} />
                        <span>Filters</span>
                        {Object.keys(activeFilters).length > 0 && <span className={styles["filter-count"]}>{countActiveFilters(activeFilters)}</span>}
                    </button>
                </div>
                {loading && <p>Loading...</p>}
                {!loading && <StayListings initialStays={stays} noHeader filters={searchParams} loading={loading} />}
            </div>

            {/* Stays Filter */}
            <StaysFilter
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
                onApplyFilters={handleApplyFilters}
                initialFilters={activeFilters}
            />

            <FooterWithoutTabs />
        </>
    );
}

// Helper function to count active filters for the badge
function countActiveFilters(filters) {
    let count = 0;

    // Luxury level
    if (filters.luxuryLevel) count++;

    // Stay type
    if (filters.stayType) count++;

    // Stay vibe
    if (filters.stayVibe) count++;

    // Add-on service
    if (filters.addOnService) count++;

    // Price range (if different from default)
    if (filters.priceRange?.min > 3000 || (filters.priceRange?.max && filters.priceRange.max < 500000)) count++;

    // Rooms
    if (filters.rooms?.bedrooms && filters.rooms.bedrooms !== "Any") count++;
    // if (filters.rooms?.beds && filters.rooms.beds !== "Any") count++;
    if (filters.rooms?.bathrooms && filters.rooms.bathrooms !== "Any") count++;

    // Amenities
    const amenityCount = Object.values(filters.amenities || {}).filter(Boolean).length;
    if (amenityCount > 0) count++;

    return count;
}
