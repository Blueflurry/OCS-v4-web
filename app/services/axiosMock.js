/**
 * Mock implementation of the API for development and testing
 */
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { carouselData, allStays } from "./mockData";

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
        let filteredStays = [...allStays];

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

// Mock the stay details endpoint
mock.onGet(/\/stay\/\w+/).reply((config) => {
    const stayId = config.url.split("/").pop();

    // Find the stay by ID
    const stay = allStays.find((s) => s._id === stayId) || allStays[0];

    return [200, stay];
});

// Mock the create payment intent endpoint
mock.onPost("/create-payment-intent").reply((config) => {
    try {
        const { stayId, checkin, checkout, guests } = JSON.parse(config.data);

        // Find the stay
        const stay = allStays.find((s) => s._id === stayId) || allStays[0];

        // Calculate number of nights
        const checkInDate = new Date(checkin || new Date());
        const checkOutDate = new Date(
            checkout ||
                new Date(checkInDate.getTime() + 7 * 24 * 60 * 60 * 1000)
        );
        const nights = Math.ceil(
            (checkOutDate - checkInDate) / (24 * 60 * 60 * 1000)
        );

        // Calculate the total amount
        const stayTotal = stay.pricing.currentPrice * nights;
        const gst = Math.round(stayTotal * 0.18); // 18% GST
        const totalAmount = stayTotal + gst;

        const paymentIntent = {
            id: `pi_${Math.random().toString(36).substring(2, 15)}`,
            stayId,
            stayName: stay.name,
            stayImage: stay.images[0],
            checkin: checkInDate.toISOString(),
            checkout: checkOutDate.toISOString(),
            nights,
            guests: guests || stay.maxGuests,
            pricing: {
                stayPrice: stayTotal,
                gst,
                totalAmount,
            },
            addOns: [],
            createdAt: new Date().toISOString(),
            status: "created",
        };

        return [200, paymentIntent];
    } catch (error) {
        console.error("Error in mock payment intent handler:", error);
        return [500, { error: "Internal server error" }];
    }
});

// Mock the update payment intent with addons endpoint
mock.onPatch("/payment-intent-addons").reply((config) => {
    try {
        const { paymentIntentId, addOns } = JSON.parse(config.data);

        // In a real implementation, you would retrieve the payment intent first
        // For the mock, we'll create a new one
        const paymentIntent = {
            id: paymentIntentId,
            addOns: addOns,
            status: "updated",
        };

        return [200, paymentIntent];
    } catch (error) {
        console.error("Error in mock update payment intent handler:", error);
        return [500, { error: "Internal server error" }];
    }
});

// Mock the create payment endpoint
mock.onPost("/create-payment").reply((config) => {
    try {
        const { paymentIntentId } = JSON.parse(config.data);

        // Success response from payment gateway
        const paymentResponse = {
            id: `pay_${Math.random().toString(36).substring(2, 15)}`,
            paymentIntentId,
            status: "success",
            transactionId: `txn_${Math.random().toString(36).substring(2, 15)}`,
            processingTime: new Date().toISOString(),
        };

        return [200, paymentResponse];
    } catch (error) {
        console.error("Error in mock payment handler:", error);
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
