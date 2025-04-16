/**
 * Common API configuration
 */

// Base API URL from environment variables
export const API_BASE_URL =
    process.env.NEXT_PUBLIC_BASEURL || "https://api.oneclickstays.com/api";

/**
 * Check if user is authenticated
 * @returns {boolean} - Whether user is authenticated
 */
export const isAuthenticated = () => {
    if (typeof window === "undefined") return false;

    try {
        const userStr = localStorage.getItem("user");
        if (!userStr) return false;

        const user = JSON.parse(userStr);
        return !!user.token;
    } catch (e) {
        console.error("Error checking authentication:", e);
        return false;
    }
};

/**
 * Helper function for making API requests
 * @param {string} endpoint - API endpoint
 * @param {Object} options - Fetch options
 * @param {boolean} requiresAuth - Whether endpoint requires authentication
 * @returns {Promise<any>} - API response
 */
export const fetchAPI = async (
    endpoint,
    options = {},
    requiresAuth = false
) => {
    // Add authentication token to headers if authentication is required
    if (requiresAuth && typeof window !== "undefined") {
        const userStr = localStorage.getItem("user");
        if (userStr) {
            try {
                const user = JSON.parse(userStr);
                if (user.token) {
                    options.headers = {
                        ...options.headers,
                        Authorization: `Bearer ${user.token}`,
                    };
                }
            } catch (e) {
                console.error("Error parsing user data:", e);
            }
        }
    }

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

            // Check if error is due to authentication
            if (response.status === 401 && typeof window !== "undefined") {
                console.error(
                    "Authentication error: Token may be invalid or expired"
                );
                // Clear user data for auth errors
                localStorage.removeItem("user");
            }

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
