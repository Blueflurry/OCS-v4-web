// api/services/paymentService.js
import { fetchAPI } from "./config";

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
        const response = await fetchAPI("/bookings", {
            method: "POST",
            body: paymentDetails,
        });
        return response.booking || {};
    } catch (error) {
        console.error("Error creating payment intent:", error);
        throw error;
    }
};

/**
 * Update payment intent with add-ons
 * @param {string} bookingId - The booking ID
 * @param {Array} addOnDetails - Selected add-ons
 * @returns {Promise<Object>} - Updated payment intent object
 */
export const updatePaymentIntentWithAddOns = async (
    bookingId,
    addOnDetails
) => {
    try {
        const response = await fetchAPI(`/bookings/${bookingId}`, {
            method: "PATCH",
            body: { addOns: addOnDetails },
        });
        console.log("Update payment intent response:", response);
        return response.booking || {};
    } catch (error) {
        console.error("Error updating payment intent with add-ons:", error);
        throw error;
    }
};

/**
 * Create payment order for Razorpay
 * @param {string} bookingId - The booking ID
 * @param {Object} paymentDetails - Payment details
 * @returns {Promise<Object>} - Order details including Razorpay order ID
 */
export const createPaymentOrder = async (bookingId, paymentDetails) => {
    try {
        const response = await fetchAPI(`/bookings/${bookingId}/payment`, {
            method: "POST",
            body: paymentDetails,
        });

        console.log("Payment order created:", response);
        return response;
    } catch (error) {
        console.error("Error creating payment order:", error);
        throw error;
    }
};

/**
 * Verify payment with backend
 * @param {Object} paymentData - Payment verification data
 * @returns {Promise<Object>} - Verification result
 */
export const verifyPayment = async (paymentData) => {
    try {
        const response = await fetchAPI("/bookings/verify-payment", {
            method: "POST",
            body: paymentData,
        });

        return response;
    } catch (error) {
        console.error("Payment verification error:", error);
        throw error;
    }
};
