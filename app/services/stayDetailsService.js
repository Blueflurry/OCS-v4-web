import api from "@/app/services/axios";

/**
 * Get details for a specific stay
 * @param {string} stayId - The ID of the stay to fetch
 * @returns {Promise<Object>} - Stay details object
 */
export const getStayDetails = async (stayId, options = {}) => {
    try {
        const response = await api.get(`/stay/${stayId}`, options);
        console.log("Stay details response:", response);
        return response.stay || {};
    } catch (error) {
        console.error(`Error fetching stay details for ${stayId}:`, error);
        return {};
    }
};

/**
 * Get add-on services for a specific stay
 * @param {string} stayId - The ID of the stay
 * @returns {Promise<Array>} - Array of add-on services
 */
export const getStayAddons = async (stayId) => {
    try {
        const temp = await fetch(
            `${process.env.NEXT_PUBLIC_BASEURL}/stay/${stayId}/addons`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                credentials: "include",
            }
        );
        const response = await temp.json();
        console.log("Add-ons response:", response);
        return response || [];
    } catch (error) {
        console.error(`Error fetching add-ons for stay ${stayId}:`, error);
        return [];
    }
};

/**
 * Create a new payment intent for a stay
 * @param {Object} paymentDetails - Payment details
 * @param {string} paymentDetails.stayId - The ID of the stay
 * @param {string} paymentDetails.checkin - Check-in date
 * @param {string} paymentDetails.checkout - Check-out date
 * @param {number} paymentDetails.guests - Number of guests
 * @returns {Promise<Object>} - Payment intent object
 */
export const createPaymentIntent = async (paymentDetails) => {
    try {
        const temp = await fetch(
            `${process.env.NEXT_PUBLIC_BASEURL}/bookings`,
            {
                body: JSON.stringify(paymentDetails),
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                credentials: "include",
            }
        );

        const response = await temp.json();
        return response || {};
    } catch (error) {
        console.error("Error creating payment intent:", error);
        // throw error;
    }
};

/**
 * Update payment intent with add-ons
 * @param {Object} addOnDetails - Add-on details
 * @param {string} addOnDetails.paymentIntentId - The payment intent ID
 * @param {Array} addOnDetails.addOns - Selected add-ons
 * @returns {Promise<Object>} - Updated payment intent object
 */
export const updatePaymentIntentWithAddOns = async (addOnDetails) => {
    try {
        const response = await api.patch(
            "/payment-intent-addons",
            addOnDetails
        );
        return response.data || {};
    } catch (error) {
        console.error("Error updating payment intent with add-ons:", error);
        // throw error;
    }
};

/**
 * Create payment for a payment intent
 * @param {Object} paymentDetails - Payment details
 * @param {string} paymentDetails.paymentIntentId - The payment intent ID
 * @returns {Promise<Object>} - Payment response
 */
export const createPayment = async (paymentDetails) => {
    try {
        const response = await api.post("/create-payment", paymentDetails);
        return response.data || {};
    } catch (error) {
        console.error("Error creating payment:", error);
        throw new Error(
            error.response?.data?.message || "Payment processing failed"
        );
    }
};
