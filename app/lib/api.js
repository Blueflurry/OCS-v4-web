// app/lib/api.js

/**
 * Fetches stay listings with filters from the API
 * This function runs on the server and can directly
 * connect to databases or other backend resources
 */
export async function getStayListings(params = {}) {
    try {
        // In a production app, this could be a direct database query
        // or call to an internal API without going through the public API

        const {
            location = "",
            guests = 0,
            propertyType = "all",
            minRating = 0,
            minPrice = 0,
            maxPrice = 100000,
            sort = "recommended",
            page = 1,
            limit = 10,
        } = params;

        // Build query string for API
        const queryParams = new URLSearchParams();

        if (location) queryParams.append("location", location);
        if (guests > 0) queryParams.append("guests", guests.toString());
        if (propertyType && propertyType !== "all")
            queryParams.append("propertyType", propertyType);
        if (minRating > 0)
            queryParams.append("minRating", minRating.toString());
        if (minPrice > 0) queryParams.append("minPrice", minPrice.toString());
        if (maxPrice < 100000)
            queryParams.append("maxPrice", maxPrice.toString());
        if (sort) queryParams.append("sort", sort);

        queryParams.append("page", page.toString());
        queryParams.append("limit", limit.toString());

        // Make API request - in production, this would likely be a direct DB call
        // but we're using the API route here for simplicity
        const protocol =
            process.env.NODE_ENV === "production" ? "https" : "http";
        const host = process.env.VERCEL_URL || "localhost:3000";

        const response = await fetch(
            `${protocol}://${host}/api/stays/listings?${queryParams.toString()}`,
            { next: { revalidate: 60 } } // Revalidate data every 60 seconds
        );

        if (!response.ok) {
            throw new Error(`Failed to fetch stays: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching stays data:", error);
        // Return empty data structure instead of throwing to handle gracefully
        return {
            stays: [],
            pagination: {
                total: 0,
                totalPages: 0,
                currentPage: 1,
                limit: 10,
            },
        };
    }
}

/**
 * Fetches a single stay by ID
 */
export async function getStayById(id) {
    try {
        const protocol =
            process.env.NODE_ENV === "production" ? "https" : "http";
        const host = process.env.VERCEL_URL || "localhost:3000";

        const response = await fetch(`${protocol}://${host}/api/stays/${id}`, {
            next: { revalidate: 60 },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch stay: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`Error fetching stay with ID ${id}:`, error);
        return null;
    }
}
