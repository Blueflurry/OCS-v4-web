export const formatToIndianRupee = (amount) => {
    if (isNaN(amount)) return "Invalid amount";

    // Convert number to string and format as per Indian numbering system
    const formattedAmount = amount
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",") // Add commas for thousands
        .replace(/(\d+)(\d{3},)/, "$1,"); // Handle lakhs and crores formatting

    return `₹${formattedAmount}`;
};

export const parseThousands = (number) => {
    if (typeof number !== "number" || number < 1000) return number.toString();
    const formatted = (number / 1000).toFixed(number % 1000 === 0 ? 0 : 1); // Remove decimals for whole k-values
    return `${formatted}k`;
};
