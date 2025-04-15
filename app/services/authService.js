// api/services/authService.js
import { fetchAPI, handleApiError } from "./config";

/**
 * Standard response object structure for API calls
 * @typedef {Object} ServiceResponse
 * @property {boolean} success - Whether the call was successful
 * @property {Object|null} data - Response data (null if error)
 * @property {string|null} error - Error message (null if success)
 */

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
