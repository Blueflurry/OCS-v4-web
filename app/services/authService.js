/**
 * Standard response object structure for API calls
 * @typedef {Object} ServiceResponse
 * @property {boolean} success - Whether the call was successful
 * @property {Object|null} data - Response data (null if error)
 * @property {string|null} error - Error message (null if success)
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
    const url = `${API_BASE_URL}${endpoint}`;

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

    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw {
            status: response.status,
            message: errorData.error || response.statusText,
            response: { data: errorData },
        };
    }

    return response.json();
};

/**
 * Handles API errors consistently
 * @param {Error} error - The error object
 * @param {string} context - Context where the error occurred
 * @returns {ServiceResponse} - Standardized error response
 */
const handleApiError = (error, context) => {
    console.error(`Error in ${context}:`, error);

    let errorMessage = "Something went wrong. Please try again.";

    // Extract more specific error message if available
    if (error.response && error.response.data && error.response.data.error) {
        errorMessage = error.response.data.error;
    } else if (error.message) {
        errorMessage = error.message;
    }

    return {
        success: false,
        data: null,
        error: errorMessage,
    };
};

/**
 * Send login OTP to the provided phone number
 * @param {string} phoneNumber - User's phone number
 * @returns {Promise<ServiceResponse>} - Standardized response
 */
export const sendLoginOtp = async (phoneNumber) => {
    try {
        const response = await fetchAPI("/login", {
            method: "POST",
            body: { phoneNumber },
        });

        return {
            success: true,
            data: response,
            error: null,
        };
    } catch (error) {
        return handleApiError(error, "sendLoginOtp");
    }
};

/**
 * Resend OTP to the provided phone number
 * @param {string} phoneNumber - User's phone number
 * @returns {Promise<ServiceResponse>} - Standardized response
 */
export const resendOtp = async (phoneNumber) => {
    try {
        const response = await fetchAPI("/resend-otp", {
            method: "POST",
            body: { phoneNumber },
        });

        return {
            success: true,
            data: response,
            error: null,
        };
    } catch (error) {
        return handleApiError(error, "resendOtp");
    }
};

/**
 * Verify OTP and check if user exists
 * @param {string} phoneNumber - User's phone number
 * @param {string} otp - OTP entered by user
 * @returns {Promise<ServiceResponse>} - Standardized response
 */
export const verifyOtp = async (phoneNumber, otp) => {
    try {
        const response = await fetchAPI("/otp-verification", {
            method: "POST",
            body: { phoneNumber, otp },
        });

        return {
            success: true,
            data: response,
            error: null,
        };
    } catch (error) {
        return handleApiError(error, "verifyOtp");
    }
};

/**
 * Create a new user account
 * @param {Object} userData - User data object
 * @param {string} userData.fullName - User's full name
 * @param {string} userData.email - User's email address
 * @param {string} userData.phoneNumber - User's phone number
 * @returns {Promise<ServiceResponse>} - Standardized response
 */
export const createUser = async (userData) => {
    try {
        const response = await fetchAPI("/signup", {
            method: "POST",
            body: userData,
        });

        return {
            success: true,
            data: response,
            error: null,
        };
    } catch (error) {
        return handleApiError(error, "createUser");
    }
};

/**
 * Check if user is authenticated
 * @returns {boolean} - Authentication status
 */
export const isAuthenticated = () => {
    try {
        if (typeof window === "undefined") return false;

        const user = localStorage.getItem("user");
        return !!user;
    } catch (error) {
        console.error("Error checking authentication status:", error);
        return false;
    }
};

/**
 * Get current user data
 * @returns {Object|null} - User data or null if not authenticated
 */
export const getCurrentUser = () => {
    try {
        if (typeof window === "undefined") return null;

        const user = localStorage.getItem("user");
        return user ? JSON.parse(user) : null;
    } catch (error) {
        console.error("Error getting current user:", error);
        return null;
    }
};

/**
 * Logout user
 * @returns {boolean} - Whether logout was successful
 */
export const logout = () => {
    try {
        if (typeof window === "undefined") return false;

        localStorage.removeItem("user");
        sessionStorage.removeItem("phoneNumber");
        return true;
    } catch (error) {
        console.error("Error during logout:", error);
        return false;
    }
};
