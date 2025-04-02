/**
 * Mock implementation of the API for development and testing
 */
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { carouselData, mockStays } from "./mockData";

// Create a new instance of axios
const axiosInstance = axios.create({
    baseURL: "https://api.oneclickstays.com/api",
    timeout: 10000,
});

// Create a mock adapter
const mock = new MockAdapter(axiosInstance, { delayResponse: true });

// Generate random delay between 300-600ms
const getRandomDelay = () => Math.floor(Math.random() * 300) + 300;

// Setup mock endpoints
mock.onGet(/\/stays\/carousel/).reply((config) => {
    // Extract category parameter from the request
    const category = config.params.category;

    // Add a random delay between 300-600ms
    const delay = getRandomDelay();

    return new Promise((resolve) => {
        setTimeout(() => {
            // Check if we have data for this category
            if (category && carouselData[category]) {
                resolve([200, carouselData[category]]);
            } else {
                // Return a fallback if category doesn't exist
                resolve([200, carouselData.trending]);
            }
        }, delay);
    });
});

// Setup the /stays POST endpoint
mock.onPost("/stays").reply((config) => {
    // Add random delay to simulate network latency
    const delay = Math.floor(Math.random() * 300) + 300; // 300-600ms delay

    try {
        // Parse the request body
        const filters = JSON.parse(config.data);

        // Apply filters to mock data
        let filteredStays = [...mockStays];

        // Filter by location if provided
        if (filters.location && filters.location.trim() !== "") {
            const locationLower = filters.location.toLowerCase();
            filteredStays = filteredStays.filter(
                (stay) =>
                    stay.location.city.toLowerCase().includes(locationLower) ||
                    stay.location.state.toLowerCase().includes(locationLower) ||
                    stay.location.country.toLowerCase().includes(locationLower)
            );
        }

        // Filter by dates if both check-in and check-out are provided
        if (filters.checkin && filters.checkout) {
            const checkinDate = new Date(filters.checkin);
            const checkoutDate = new Date(filters.checkout);

            if (!isNaN(checkinDate) && !isNaN(checkoutDate)) {
                filteredStays = filteredStays.filter((stay) => {
                    // In a real app, you would check availability here
                    // For mock purposes, just filter out random stays to simulate availability
                    return stay.id % 3 !== 0; // Just a simple rule for demonstration
                });
            }
        }

        // Filter by total guests if any guest count is provided
        const totalGuests =
            (filters.men || 0) + (filters.women || 0) + (filters.children || 0);
        if (totalGuests > 0) {
            filteredStays = filteredStays.filter(
                (stay) => stay.capacity >= totalGuests
            );
        }

        // Filter by pets if needed
        if (filters.pets > 0) {
            filteredStays = filteredStays.filter((stay) => stay.petsAllowed);
        }

        // Apply any additional filters here...

        // Return the filtered results after the delay
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([200, filteredStays]);
            }, delay);
        });
    } catch (error) {
        console.error("Error in mock /stays endpoint:", error);
        return [500, { error: "Internal server error" }];
    }
});

// Export the mocked axios instance
export default {
    get: (endpoint, options = {}) => {
        return axiosInstance.get(endpoint, options);
    },
    post: (endpoint, data, options = {}) => {
        return axiosInstance.post(endpoint, data, options);
    },
    put: (endpoint, data, options = {}) => {
        return axiosInstance.put(endpoint, data, options);
    },
    patch: (endpoint, data, options = {}) => {
        return axiosInstance.patch(endpoint, data, options);
    },
    delete: (endpoint, options = {}) => {
        return axiosInstance.delete(endpoint, options);
    },
};
