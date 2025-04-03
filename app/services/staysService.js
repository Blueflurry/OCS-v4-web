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
        throw error;
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
 * @param {number} filters.page - Page number (default: 1)
 * @param {number} filters.limit - Number of items per page (default: 10)
 * @returns {Promise<Array>} - Array of stay objects
 */
export const getFilteredStays = async (filters) => {
    try {
        // Set default pagination values if not provided
        const page = filters.page || 1;
        const limit = filters.limit || 10;

        // Make API request with pagination parameters
        const response = await api.post("/stays", {
            ...filters,
            page,
            limit,
        });

        // console.log("Filtered stays:", response.data);
        return response.data || [];
    } catch (error) {
        console.error("Error fetching filtered stays:", error);
        return [];
    }
};
