export const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
};

export const formatDateRange = (dateRange) => {
    if (!Array.isArray(dateRange)) throw new Error("dateRange must be an array of Date objects");
    return `${dateRange[0] ? formatDate(dateRange[0]) : "Check-In"} → ${dateRange[1] ? formatDate(dateRange[1]) : "Check-Out"}`;
};
