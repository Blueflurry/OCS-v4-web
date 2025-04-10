/**
 * Global axios instance configuration for both server and client components
 * Automatically uses mock in development environment
 */
import mockApi from "./axiosMock";

// Check if running in development mode
const isDevelopment = process.env.NODE_ENV === "production";

// Use mock API in development, real API in production
const api = isDevelopment ? mockApi : createRealApi();

// Real API implementation
function createRealApi() {
    // Server-safe fetch function for real API
    async function fetchAPI(endpoint, options = {}) {
        const {
            params = {},
            method = "GET",
            body = null,
            headers = {},
        } = options;

        // Build URL with params
        const url = new URL(`https://api.oneclickstays.com/api${endpoint}`);
        // const url = new URL(
        //     `https://sharing-sponge-forcibly.ngrok-free.app/api${endpoint}`
        // );
        // https://sharing-sponge-forcibly.ngrok-free.app

        // Add query parameters
        if (params && Object.keys(params).length > 0) {
            Object.keys(params).forEach((key) => {
                if (params[key] !== undefined && params[key] !== null) {
                    url.searchParams.append(key, params[key]);
                }
            });
        }

        // Configure fetch options
        const fetchOptions = {
            method,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                ...headers,
            },
            credentials: "include", // Include cookies in requests
        };

        // Add body if it exists (for POST, PUT, etc.)
        if (
            body &&
            (method === "POST" || method === "PUT" || method === "PATCH")
        ) {
            fetchOptions.body = JSON.stringify(body);
        }

        try {
            console.log(url.toString(), fetchOptions);
            const response = await fetch(url.toString(), fetchOptions);

            if (!response.ok) {
                throw new Error(
                    `API error: ${response.status} ${response.statusText}`
                );
            }

            // console.log("API response:", response);

            const data = await response.json();
            console.log("API data:", data);
            return data;
        } catch (error) {
            console.error("API Error:", error);
            // throw error;
        }
    }

    // Create common methods that work in both server and client components
    return {
        get: async (endpoint, options = {}) =>
            await fetchAPI(endpoint, { ...options, method: "GET" }),
        post: (endpoint, body, options = {}) =>
            fetchAPI(endpoint, { ...options, body, method: "POST" }),
        put: (endpoint, body, options = {}) =>
            fetchAPI(endpoint, { ...options, body, method: "PUT" }),
        patch: (endpoint, body, options = {}) =>
            fetchAPI(endpoint, { ...options, body, method: "PATCH" }),
        delete: (endpoint, options = {}) =>
            fetchAPI(endpoint, { ...options, method: "DELETE" }),
    };
}

export default api;
