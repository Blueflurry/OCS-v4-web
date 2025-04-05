/**
 * Format a date to display format
 * @param {Date|string} date - The date to format
 * @returns {string} - Formatted date
 */
export const formatDate = (date) => {
    if (!date) return "";

    const dateObj = typeof date === "string" ? new Date(date) : date;

    // Format as "MMM DD, YYYY" (e.g., "Mar 24, 2025")
    return dateObj.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
};

/**
 * Format a date range for display in the UI
 * @param {Array} dateRange - Array containing [startDate, endDate] as Date objects or null
 * @returns {string} Formatted date range string
 */
export function formatDateRange(dateRange) {
    if (!dateRange || !dateRange[0]) {
        return "Select dates";
    }

    const startDate = dateRange[0];
    const endDate = dateRange[1];

    const options = { month: "short", day: "numeric" };

    if (startDate && endDate) {
        const start = startDate.toLocaleDateString("en-US", options);
        const end = endDate.toLocaleDateString("en-US", options);
        return `${start} - ${end}`;
    } else if (startDate) {
        return startDate.toLocaleDateString("en-US", options);
    }

    return "Select dates";
}

// /**
//  * Format date range as a string
//  * @param {Date|string} checkIn - Check-in date
//  * @param {Date|string} checkOut - Check-out date
//  * @returns {string} - Formatted date range
//  */
// export const formatDateRange = (checkIn, checkOut) => {
//     if (!checkIn || !checkOut) return "";

//     const formattedCheckIn = formatDate(checkIn);
//     const formattedCheckOut = formatDate(checkOut);

//     return `${formattedCheckIn} - ${formattedCheckOut}`;
// };

/**
 * Format a date as ISO string (YYYY-MM-DD)
 * @param {Date} date - Date object
 * @returns {string} Date in YYYY-MM-DD format
 */
export function formatISODate(date) {
    if (!date) return "";

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

/**
 * Format a number as currency without currency symbol
 * @param {number} amount - The amount to format
 * @returns {string} - Formatted amount
 */
export const formatCurrency = (amount) => {
    if (!amount && amount !== 0) return "";

    // Convert to number if it's a string
    const numAmount = typeof amount === "string" ? parseFloat(amount) : amount;

    // Format with commas for thousands separator
    return numAmount.toLocaleString("en-US");
};

/**
 * Calculate the number of nights between two dates
 * @param {Date|string} checkIn - Check-in date
 * @param {Date|string} checkOut - Check-out date
 * @returns {number} - Number of nights
 */
export const calculateNights = (checkIn, checkOut) => {
    if (!checkIn || !checkOut) return 0;

    const checkInDate =
        typeof checkIn === "string" ? new Date(checkIn) : checkIn;
    const checkOutDate =
        typeof checkOut === "string" ? new Date(checkOut) : checkOut;

    // Calculate the difference in milliseconds and convert to days
    const diffTime = Math.abs(checkOutDate - checkInDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
};
