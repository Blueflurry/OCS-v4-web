import { fetchAPI, isAuthenticated } from "./config";

// Add this function for protected booking operations
const checkAuthForBooking = () => {
    if (!isAuthenticated() && typeof window !== "undefined") {
        const currentPath = window.location.pathname;
        window.location.href = `/login?redirect=${currentPath}`;
        throw new Error("Authentication required for booking operations");
    }
};

/**
 * Get details for a specific booking
 * @param {string} bookingId - The ID of the booking to fetch
 * @returns {Promise<Object>} - Booking details object
 */
export const getBookingDetails = async (bookingId) => {
    checkAuthForBooking();

    try {
        const response = await fetchAPI(`/bookings/${bookingId}`, {}, true);
        console.log("Booking details response:", response);
        return response.booking || {};
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
        const response = await fetchAPI(`/users/bookings/${status}`, {}, true);
        return response.bookings || [];
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
