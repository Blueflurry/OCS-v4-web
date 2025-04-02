export const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
};

// export const formatDateRange = (dateRange) => {
//     if (!Array.isArray(dateRange)) throw new Error("dateRange must be an array of Date objects");
//     return `${dateRange[0] ? formatDate(dateRange[0]) : "Check-In"} → ${dateRange[1] ? formatDate(dateRange[1]) : "Check-Out"}`;
// };

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
