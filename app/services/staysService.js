import { fetchAPI } from "./config";

/**
 * Fetches stays by category for carousel display
 * @returns {Promise<Object>} - Object containing stays array and carousel metadata
 */
export const fetchHomePageStays = async () => {
    try {
        const response = await fetchAPI("/search/home", {
            headers: {
                next: { revalidate: 3600 },
            },
        });

        return response || [];
    } catch (error) {
        console.error("Error in fetchHomePageStays:", error);
        return [];
    }
};

/**
 * Get filters from API
 * @returns {Promise<Array>} - Object of filters
 */
export const getFilters = async () => {
    try {
        const response = await fetchAPI("/catalog");
        console.log("Filters response:", response);
        return response.data || [];
    } catch (error) {
        console.error("Error fetching filters:", error);
        return [];
    }
};

/**
 * Get filtered stays from API with pagination support
 * @param {Object} filters - Filter parameters
 * @returns {Promise<Array>} - Array of stay objects
 */
export const getFilteredStays = async (filters) => {
    console.log("filters", filters);
    try {
        const guests = filters.men + filters.women + filters.children;

        // Pre-process special filter fields if needed
        const processedFilters = {
            location: filters.location || "",
            checkIn: filters.checkin || new Date().toISOString().split("T")[0],
            checkOut:
                filters.checkout ||
                new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
                    .toISOString()
                    .split("T")[0],
            guests: guests == 0 ? 2 : guests,

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
                min: filters.priceMin || 0,
                max: filters.priceMax || 2500000,
            },
        };

        // Handle "5+" value for room filters
        if (processedFilters.bedrooms === "5+")
            processedFilters.bedrooms = "5+";
        if (processedFilters.beds === "5+") processedFilters.beds = "5+";
        if (processedFilters.bathrooms === "5+")
            processedFilters.bathrooms = "5+";

        const response = await fetchAPI("/search", {
            method: "POST",
            body: processedFilters,
        });

        return response.results || [];
    } catch (error) {
        console.error("Error fetching filtered stays:", error);
        return [];
    }
};

/**
 * Get details for a specific stay
 * @param {string} stayId - The ID of the stay to fetch
 * @returns {Promise<Object>} - Stay details object
 */
export const getStayDetails = async (stayId) => {
    try {
        const response = await fetchAPI(`/stay/${stayId}`);
        // console.log("Stay details response:", response);
        return response.stay || {};
    } catch (error) {
        console.error(`Error fetching stay details for ${stayId}:`, error);
        return {};
    }
};

/**
 * Get add-on services for a specific stay
 * @param {string} stayId - The ID of the stay
 * @returns {Promise<Array>} - Array of add-on services
 */
export const getStayAddons = async (stayId) => {
    try {
        const response = await fetchAPI(`/stay/${stayId}/addons`);
        // console.log("Add-ons response:", response);
        return response || [];
    } catch (error) {
        console.error(`Error fetching add-ons for stay ${stayId}:`, error);
        return [];
    }
};
