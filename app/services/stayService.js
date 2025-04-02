/**
 * Service file for handling all stay-related API calls
 */
import axios from "@/app/services/axios";

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
