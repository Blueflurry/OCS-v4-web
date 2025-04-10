/**
 * Fetches stays by category for carousel display
 * @param {string} category - The category of stays to fetch
 * @returns {Promise<Object>} - Object containing stays array and carousel metadata
 */
export const fetchHomePageStays = async () => {
    try {
        const data = await fetch(
            `${process.env.NEXT_PUBLIC_BASEURL}/search/home`,
            {
                next: { revalidate: 3600 },
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            }
        );

        const response = data.json();
        return response || [];
    } catch (error) {
        console.error("Error in fetchStaysByCategory:", error);
        // throw error;
    }
};

/**
 * Get filtered stays from API with pagination support
 * @param {Object} filters - Filter parameters
 * @param {string} filters.location - Location to filter by
 * @param {string} filters.checkin - Check-in date
 * @param {string} filters.checkout - Check-out date
 * @param {number} filters.men - Number of men
 * @param {number} filters.women - Number of women
 * @param {number} filters.children - Number of children
 * @param {number} filters.pets - Number of pets
 * @param {string} [filters.managementType] - Type of management (oneclick, branded, private)
 * @param {number} [filters.priceMin] - Minimum price
 * @param {number} [filters.priceMax] - Maximum price
 * @param {string|number} [filters.bedrooms] - Number of bedrooms
 * @param {string|number} [filters.beds] - Number of beds
 * @param {string|number} [filters.bathrooms] - Number of bathrooms
 * @param {Array<string>} [filters.amenities] - Amenities to filter by
 * @param {string} [filters.propertyType] - Type of property (villa, apartment)
 * @param {number} filters.page - Page number (default: 1)
 * @param {number} filters.limit - Number of items per page (default: 10)
 * @returns {Promise<Array>} - Array of stay objects
 */
export const getFilteredStays = async (filters) => {
    try {
        // Set default pagination values if not provided

        // Pre-process special filter fields if needed
        const processedFilters = {
            location: filters.location || "",
            checkIn: filters.checkin || new Date().toISOString().split("T")[0],
            checkOut:
                filters.checkout ||
                new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
                    .toISOString()
                    .split("T")[0],
            guests:
                filters.men + filters.women + filters.children + filters.pets ||
                2,

            page: filters.page || 1,
            limit: filters.limit || 10,

            // Optional filters with default values
            managementType: filters.managementType || "everything",
            amenities: filters.amenities || [],
            propertyType: filters.propertyType || "",
            bathrooms: filters.bathrooms || "0",
            bedrooms: filters.bedrooms || "0",
            beds: filters.beds || "0",
            priceRange: {
                min: 0,
                max: 2500000,
            },
        };

        // Handle "5+" value for room filters
        if (processedFilters.bedrooms === "5+")
            processedFilters.bedrooms = "5+";
        if (processedFilters.beds === "5+") processedFilters.beds = "5+";
        if (processedFilters.bathrooms === "5+")
            processedFilters.bathrooms = "5+";

        console.log("processedFilters", processedFilters);
        // Make API request with pagination parameters
        const temp = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/search`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            credentials: "include",
            withCredentials: true,

            body: JSON.stringify({
                ...processedFilters,
            }),
        });

        const response = await temp.json();

        console.log("Filtered stays API response:", response);
        console.log("Pagination:", response.pagination);
        return response.results || [];
    } catch (error) {
        console.error("Error fetching filtered stays:", error);
        return [];
    }
};
