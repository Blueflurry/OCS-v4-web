/**
 * Service file for handling all stay-related API calls
 */
import axios from "@/app/services/axios";
import api from "@/app/services/axios";

/**
 * Fetches stays by category for carousel display
 * @param {string} category - The category of stays to fetch
 * @returns {Promise<Object>} - Object containing stays array and carousel metadata
 */
export const fetchStaysByCategory = async (category) => {
    try {
        if (!category) {
            throw new Error("Category is required");
        }

        // The axios instance already has the base URL and will automatically return response.data
        return await axios.get(`/stays/carousel`, {
            params: { category },
        });
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
        const page = filters.page || 1;
        const limit = filters.limit || 10;

        // Pre-process special filter fields if needed
        const processedFilters = { ...filters };

        // Handle "5+" value for room filters
        if (processedFilters.bedrooms === "5+")
            processedFilters.bedrooms = "5+";
        if (processedFilters.beds === "5+") processedFilters.beds = "5+";
        if (processedFilters.bathrooms === "5+")
            processedFilters.bathrooms = "5+";

        // Make API request with pagination parameters
        const temp = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/stays`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...processedFilters,
                page,
                limit,
            }),
        });

        const response = await temp.json();

        console.log(
            "Filtered stays API response:",
            response.data.length,
            "results"
        );
        return response.data || [];
    } catch (error) {
        console.error("Error fetching filtered stays:", error);
        return [];
    }
};
