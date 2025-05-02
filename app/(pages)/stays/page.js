import { getFilteredStays } from "@/app/services/staysService";
import StaysClient from "./StaysClient";

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

        // Default values for new filter types
        luxuryLevel: "",
        stayType: "",
        stayVibe: "",
        addOnService: "",
        amenities: {},
        priceRange: {
            min: 3000,
            max: 500000,
        },
        rooms: {
            bedrooms: "Any",
            // beds: "Any",
            bathrooms: "Any",
        },
    };

    // Fetch initial batch of filtered stays data (first 10 items)
    const initialStays = await getFilteredStays(filters);
    console.log("initialStays", initialStays);
    // Pass both the search parameters and initial stays to the client component
    return (
        <StaysClient
            searchParams={resolvedSearchParams}
            initialStays={initialStays.results}
            totalCount={initialStays.pagination?.totalStays}
        />
    );
}
