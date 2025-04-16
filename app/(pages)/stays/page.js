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

        // Optional filters with default values
        managementType: "everything",
        amenities: [],
        propertyType: "villa",
        bathrooms: "0",
        bedrooms: "0",
        beds: "0",
        priceRange: {
            min: 0,
            max: 2500000,
        },
    };

    // Fetch initial batch of filtered stays data (first 10 items)
    const initialStays = await getFilteredStays(filters);

    // Pass both the search parameters and initial stays to the client component
    return (
        <StaysClient
            searchParams={resolvedSearchParams}
            initialStays={initialStays}
        />
    );
}
