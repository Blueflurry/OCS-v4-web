/**
 * Booking service for handling all booking-related API operations
 */

const API_BASE_URL =
    process.env.NEXT_PUBLIC_BASEURL || "https://api.oneclickstays.com/api";

/**
 * Helper function for making API requests
 * @param {string} endpoint - API endpoint
 * @param {Object} options - Fetch options
 * @returns {Promise<any>} - API response
 */
const fetchAPI = async (endpoint, options = {}) => {
    // Build the full URL with query parameters if provided
    let url = `${API_BASE_URL}${endpoint}`;

    // Handle query parameters
    if (options.params && Object.keys(options.params).length > 0) {
        const queryParams = new URLSearchParams();
        Object.entries(options.params).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                queryParams.append(key, value);
            }
        });
        url += `?${queryParams.toString()}`;
    }

    const fetchOptions = {
        method: options.method || "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            ...(options.headers || {}),
        },
        credentials: "include",
        ...(options.body && { body: JSON.stringify(options.body) }),
    };

    try {
        const response = await fetch(url, fetchOptions);

        if (!response.ok) {
            throw new Error(
                `API error: ${response.status} ${response.statusText}`
            );
        }

        return await response.json();
    } catch (error) {
        console.error(`Error in API request to ${endpoint}:`, error);
        throw error;
    }
};

/**
 * Get details for a specific booking
 * @param {string} bookingId - The ID of the booking to fetch
 * @returns {Promise<Object>} - Booking details object
 */
export const getBookingDetails = async (bookingId) => {
    try {
        // console.log("Fetching booking details for ID:", bookingId);
        const response = await fetchAPI(`/bookings/${bookingId}`);
        console.log("Booking details response:", response);
        return response || {};
    } catch (error) {
        console.error(
            `Error fetching booking details for ${bookingId}:`,
            error
        );
        return {};
    }
};

/**
 * Get all bookings for the current user
 * @param {string} status - Optional status filter ('upcoming' or 'completed')
 * @returns {Promise<Array>} - Array of booking objects
 */
export const getUserBookings = async (status) => {
    try {
        const response = await fetchAPI("/bookings", {
            params: status ? { status } : {},
        });
        return response || [];
    } catch (error) {
        console.error(`Error fetching user bookings:`, error);
        return [];
    }
};

/**
 * Get upcoming bookings for the current user
 * @returns {Promise<Array>} - Array of upcoming booking objects
 */
export const getUpcomingBookings = async () => {
    return getUserBookings("upcoming");
};

/**
 * Get completed bookings for the current user
 * @returns {Promise<Array>} - Array of completed booking objects
 */
export const getCompletedBookings = async () => {
    return getUserBookings("completed");
};

/**
 * Helper function to format date strings for display
 * @param {string} dateString - ISO date string
 * @returns {string} - Formatted date string (e.g., "Mar 24, 2025")
 */
export const formatBookingDate = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
};

/**
 * Helper function to format currency values
 * @param {number} amount - Amount to format
 * @returns {string} - Formatted amount string
 */
export const formatBookingAmount = (amount) => {
    if (!amount && amount !== 0) return "";

    return amount.toLocaleString("en-US");
};
