import { fetchAPI } from "./config";

/**
 * Fetches stays by category for carousel display
 * @returns {Promise<Object>} - Object containing stays array and carousel metadata
 */
export const fetchHomePageStays = async () => {
    try {
        const response = await fetchAPI("/search/home", {
            headers: {
                next: { revalidate: 0 },
            },
        });

        console.log("home response", response);

        return response || [];
    } catch (error) {
        console.error("Error in fetchHomePageStays:", error);
        return [];
    }
};

/**
 * Get filters from API
 * @returns {Promise<Object>} - Object of filters
 */
export const getFilters = async () => {
    try {
        // Fetch catalog filters
        const response = await fetchAPI("/catalog");
        // console.log("Raw API filters response:", response);

        // For debugging - check the structure of the response
        // if (response) {
        // console.log("Response structure check:", {
        //     isObject: typeof response === "object" && response !== null,
        //     hasData: response.data ? true : false,
        //     keys: Object.keys(response),
        // });
        // }

        // If the API response is nested under a 'data' property, extract it
        // Otherwise return the response as is
        const filterData = response?.data || response;

        // Return empty object if response is not valid
        if (!filterData || typeof filterData !== "object") {
            console.error("Invalid filter data format received");
            return {};
        }

        return filterData;
    } catch (error) {
        console.error("Error fetching filters:", error);
        return {};
    }
};

const removeEmptyValues = (obj) => {
    return Object.fromEntries(
        Object.entries(obj).filter(([_, value]) => {
            if (Array.isArray(value)) return value.length > 0;
            if (typeof value === "string") return value !== "";
            return true;
        })
    );
};

/**
 * Get filtered stays from API with pagination support
 * @param {Object} filters - Filter parameters
 * @returns {Promise<Array>} - Array of stay objects
 */
export const getFilteredStays = async (filters) => {
    console.log("filters", filters);
    try {
        const guests =
            (Number(filters.men) || 0) +
            (Number(filters.women) || 0) +
            (Number(filters.children) || 0);

        // Handle multi-select filter objects - convert them to arrays of selected codes
        const amenityCodes = filters.amenities ? filters.amenities : [];

        const stayTypeCodes = filters.stayType
            ? Object.keys(filters.stayType).filter(
                  (key) => filters.stayType[key]
              )
            : [];

        const stayVibeCodes = filters.stayVibe
            ? Object.keys(filters.stayVibe).filter(
                  (key) => filters.stayVibe[key]
              )
            : [];

        // Handle "5+" value for room filters
        if (filters.bedrooms === "5+") filters.bedrooms = 5;
        // if (filters.beds === "5+") filters.beds = "5+";
        if (filters.bathrooms === "5+") filters.bathrooms = 5;

        // no need to send
        // const addOnServiceCodes = filters.addOnService
        //     ? Object.keys(filters.addOnService).filter(
        //           (key) => filters.addOnService[key]
        //       )
        //     : [];

        // Pre-process special filter fields if needed
        const processedFilters = {
            // NEED TO UPDATE
            location: filters.location || "",
            checkIn: filters.checkin || new Date().toISOString().split("T")[0],
            checkOut:
                filters.checkout ||
                new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
                    .toISOString()
                    .split("T")[0],
            guests: guests === 0 ? 2 : guests,

            page: filters.page || 1,
            limit: filters.limit || 10,

            // Single select filters
            luxuryLevel: filters.luxuryLevel || "",

            // Multi-select filters as arrays of codes
            amenities: amenityCodes,
            stayTypes: stayTypeCodes,
            vibes: stayVibeCodes,
            // addOnServices: addOnServiceCodes,

            // Price range
            minPrice: filters.priceMin || 3000,
            maxPrice: filters.priceMax || 500000,

            // Room configuration
            bathrooms:
                filters?.rooms?.bathrooms !== "Any"
                    ? Number(filters?.rooms?.bathrooms)
                    : 0,
            bedrooms:
                filters?.rooms?.bedrooms !== "Any"
                    ? Number(filters?.rooms?.bedrooms)
                    : 0,
            // beds: filters.beds !== "Any" ? Number(filters.beds) : 0,
        };

        // console.log("body", processedFilters);
        const cleanFilters = removeEmptyValues(processedFilters);
        console.log("cleanFilters", cleanFilters);

        const response = await fetchAPI("/search", {
            method: "POST",
            body: cleanFilters,
        });

        console.log("RESPONSE", response);
        console.log("RESPONSE", response.pagination);
        return response || [];
    } catch (error) {
        console.error("Error fetching filtered stays:", error);
        return [];
    }
};

/**
 * Get details for a specific stay
 * @param {string} stayId - The ID of the stay to fetch
 * @returns {Promise<Object>} - Stay details object
 */
export const getStayDetails = async (stayId) => {
    try {
        const response = await fetchAPI(`/stay/${stayId}`);
        // console.log("Stay details response:", response);
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
        const response = await fetchAPI(`/stay/${stayId}/addons`);
        // console.log("Add-ons response:", response);
        return response || [];
    } catch (error) {
        console.error(`Error fetching add-ons for stay ${stayId}:`, error);
        return [];
    }
};
