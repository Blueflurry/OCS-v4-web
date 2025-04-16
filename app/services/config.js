/**
 * Common API configuration
 */

// Base API URL from environment variables
export const API_BASE_URL =
    process.env.NEXT_PUBLIC_BASEURL || "https://api.oneclickstays.com/api";

/**
 * Helper function for making API requests
 * @param {string} endpoint - API endpoint
 * @param {Object} options - Fetch options
 * @returns {Promise<any>} - API response
 */
export const fetchAPI = async (endpoint, options = {}) => {
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
        withCredentials: true,
        ...(options.body && { body: JSON.stringify(options.body) }),
    };

    try {
        const response = await fetch(url, fetchOptions);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw {
                status: response.status,
                message: errorData.error || response.statusText,
                response: { data: errorData },
            };
        }

        return await response.json();
    } catch (error) {
        console.error(`Error in API request to ${endpoint}:`, error);
        throw error;
    }
};

/**
 * Handles API errors consistently
 * @param {Error} error - The error object
 * @param {string} context - Context where the error occurred
 * @returns {Object} - Standardized error response
 */
export const handleApiError = (error, context) => {
    console.error(`Error in ${context}:`, error);

    let errorMessage = "Something went wrong. Please try again.";

    // Extract more specific error message if available
    if (error.message) {
        errorMessage = error.message;
    } else if (
        error.response &&
        error.response.data &&
        error.response.data.error
    ) {
        errorMessage = error.response.data.error;
    }

    return {
        success: false,
        data: null,
        error: errorMessage,
    };
};
