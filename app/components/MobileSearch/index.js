"use client";
import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import Button from "../Button";
import DateRangePicker from "../DateRangePicker";
import styles from "./MobileSearch.module.scss";
import {
    ArrowLeft,
    ArrowRight,
    Calendar,
    MapPin,
    MousePointer2,
    Search,
    UserRound,
    Loader2,
} from "lucide-react";
import { formatDateRange, formatISODate } from "@/app/utils/formatter";
import { GUESTS } from "@/app/data/dummy";
import { useRouter, useSearchParams } from "next/navigation";
import { useLocationCache } from "@/app/hooks/useLocationCache";

const MobileSearch = ({ searchTxt }) => {
    const searchTxtRef = searchTxt || "Start your search";
    const router = useRouter();
    const searchParams = useSearchParams();
    // Use the location cache hook
    const { filterLocations } = useLocationCache(50, 3600000); // 50 entries, 1 hour expiry
    const [isOpen, setIsOpen] = useState(false);
    const [dateRange, setDateRange] = useState([null, null]);
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const [autocompleteVal, setAutocompleteVal] = useState("");
    const [locationDropdown, setLocationDropdown] = useState(false);
    const [filteredLocationOptions, setFilteredLocationOptions] = useState([]);
    const [locationOptions, setLocationOptions] = useState([]);
    const [guests, setGuests] = useState([...GUESTS]);
    const [isSearchDisabled, setIsSearchDisabled] = useState(true);
    const [isLoadingLocation, setIsLoadingLocation] = useState(false);
    const [isLoadingLocations, setIsLoadingLocations] = useState(false);

    // Function to fetch location options from API
    const fetchLocationOptions = async () => {
        setIsLoadingLocations(true);
        try {
            const response = await fetch(
                "https://api.oneclickstays.com/api/locations?search=India"
            );
            if (!response.ok) {
                throw new Error("Failed to fetch location options");
            }
            const data = await response.json();

            // Transform the API response to the format expected by the component
            const transformedOptions = data.map((item, index) => ({
                key: index.toString(),
                value: item.location,
                stays: item.stays,
            }));
            // console.log("Fetched location options:", transformedOptions);
            setLocationOptions(transformedOptions);
            return transformedOptions;
        } catch (error) {
            console.error("Error fetching locations:", error);
            return [];
        } finally {
            setIsLoadingLocations(false);
        }
    };

    // Function to fetch filtered location options for autocomplete
    const fetchFilteredLocationOptions = async (searchQuery) => {
        if (!searchQuery.trim()) {
            return fetchLocationOptions();
        }

        setIsLoadingLocations(true);
        try {
            const response = await fetch(
                `https://api.oneclickstays.com/api/locations?search=${encodeURIComponent(
                    searchQuery
                )}`
            );
            if (!response.ok) {
                throw new Error("Failed to fetch location options");
            }
            const data = await response.json();

            // Transform the API response to the format expected by the component
            const transformedOptions = data.map((item, index) => ({
                key: index.toString(),
                value: item.location,
                stays: item.stays,
            }));

            // console.log("Filtered locations:", transformedOptions);
            setFilteredLocationOptions(transformedOptions);
            return transformedOptions;
        } catch (error) {
            console.error("Error fetching filtered locations:", error);
            return [];
        } finally {
            setIsLoadingLocations(false);
        }
    };

    // Load all location options on component mount
    useEffect(() => {
        fetchLocationOptions();
    }, []);

    // Function to get city name from coordinates using reverse geocoding
    const getCityFromCoordinates = async (latitude, longitude) => {
        try {
            // Using Nominatim (OpenStreetMap) for reverse geocoding - doesn't require API key
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`,
                {
                    headers: {
                        "Accept-Language": "en", // Get results in English
                    },
                }
            );
            if (!response.ok) {
                throw new Error("Failed to get location information");
            }
            const data = await response.json();
            // Extract city from the response
            // The response structure can vary, but typically city is in address.city or address.town
            const city =
                data.address.city ||
                data.address.town ||
                data.address.village ||
                data.address.hamlet ||
                data.address.county;
            if (!city) {
                throw new Error("Could not determine city from coordinates");
            }
            return city;
        } catch (error) {
            console.error("Reverse geocoding error:", error);
            throw error;
        }
    };

    // Handle clicking "Use my current location"
    const handleCurrentLocationClick = () => {
        if (!navigator.geolocation) {
            alert(
                "Geolocation is not supported by your browser. Please enter your location manually."
            );
            return;
        }
        setIsLoadingLocation(true);
        const successCallback = async (position) => {
            try {
                const { latitude, longitude } = position.coords;
                const cityName = await getCityFromCoordinates(
                    latitude,
                    longitude
                );
                setAutocompleteVal(cityName);
                setLocationDropdown(false);
            } catch (error) {
                console.error("Error getting location:", error);
                alert(
                    "Could not determine your location. Please enter it manually."
                );
            } finally {
                setIsLoadingLocation(false);
            }
        };
        const errorCallback = (error) => {
            setIsLoadingLocation(false);
            console.error("Geolocation error:", error);
            // Handle different error scenarios with specific messages
            let message =
                "Could not determine your location. Please enter it manually.";
            if (error.code === 1) {
                // PERMISSION_DENIED
                message =
                    "Location permission denied. Please allow location access or enter location manually.";
            } else if (error.code === 2) {
                // POSITION_UNAVAILABLE
                message =
                    "Location information is unavailable. Please try again later.";
            } else if (error.code === 3) {
                // TIMEOUT
                message = "Location request timed out. Please try again.";
            }
            alert(message);
        };
        const options = {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
        };
        navigator.geolocation.getCurrentPosition(
            successCallback,
            errorCallback,
            options
        );
    };

    // Load values from URL parameters on mount
    useEffect(() => {
        // Extract parameters from URL
        const location = searchParams.get("location");
        const checkin = searchParams.get("checkin");
        const checkout = searchParams.get("checkout");
        const men = searchParams.get("men");
        const women = searchParams.get("women");
        const children = searchParams.get("children");
        const pets = searchParams.get("pets");
        // Set location from URL params or keep default empty
        if (location) {
            setAutocompleteVal(location);
        }
        // Set date range from URL params
        if (checkin && checkout) {
            try {
                setDateRange([new Date(checkin), new Date(checkout)]);
            } catch (e) {
                console.error("Error parsing dates:", e);
                // Keep default empty dates if parsing fails
            }
        }
        // Set guest counts from URL params
        const newGuests = [...guests];
        // Update Men count
        if (men !== null && !isNaN(men)) {
            const menIndex = newGuests.findIndex((g) => g.type === "Men");
            if (menIndex !== -1) {
                newGuests[menIndex].count = parseInt(men);
            }
        }
        // Update Women count
        if (women !== null && !isNaN(women)) {
            const womenIndex = newGuests.findIndex((g) => g.type === "Women");
            if (womenIndex !== -1) {
                newGuests[womenIndex].count = parseInt(women);
            }
        }
        // Update Children count
        if (children !== null && !isNaN(children)) {
            const childrenIndex = newGuests.findIndex(
                (g) => g.type === "Children"
            );
            if (childrenIndex !== -1) {
                newGuests[childrenIndex].count = parseInt(children);
            }
        }
        // Update Pets count
        if (pets !== null && !isNaN(pets)) {
            const petsIndex = newGuests.findIndex((g) => g.type === "Pets");
            if (petsIndex !== -1) {
                newGuests[petsIndex].count = parseInt(pets);
            }
        }
        setGuests(newGuests);
    }, [searchParams]); // Only run this effect when searchParams changes

    const handleLocationSelect = (option) => {
        setAutocompleteVal(option.value);
        setLocationDropdown(false);
    };

    const handleLocationChange = async (e) => {
        setLocationDropdown(true);
        const value = e.target.value;
        setAutocompleteVal(value);

        // Fetch filtered locations from API
        await fetchFilteredLocationOptions(value);
    };

    const decreaseCount = (index) => {
        const newGuests = [...guests];
        newGuests[index].count = Math.max(0, newGuests[index].count - 1);
        setGuests(newGuests);
    };

    const increaseCount = (index) => {
        const newGuests = [...guests];
        newGuests[index].count = newGuests[index].count + 1;
        setGuests(newGuests);
    };

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = ""; // Cleanup when component unmounts
            setLocationDropdown(false);
            setIsDatePickerOpen(false);
        };
    }, [isOpen]);

    useEffect(() => {
        const totalGuests = guests.reduce((sum, guest) => sum + guest.count, 0);
        if (totalGuests > 0 && dateRange[0] && dateRange[1]) {
            // Check if both check-in and check-out dates are selected
            // and at least one guest is selected
            setIsSearchDisabled(false);
        } else setIsSearchDisabled(true);
    }, [guests, dateRange]);

    // Handle search button click
    const handleSearch = () => {
        if (isSearchDisabled) {
            alert("Please select the dates & guests");
            return;
        }
        if (dateRange[0] - dateRange[1] == 2 || dateRange[0] >= dateRange[1]) {
            alert(
                "We are not taking bookings less than 2 days, please select atleast 3 days"
            );
            return;
        }
        // Extract guest counts by type
        const menCount = guests.find((g) => g.type === "Men")?.count || 0;
        const womenCount = guests.find((g) => g.type === "Women")?.count || 0;
        const childrenCount =
            guests.find((g) => g.type === "Children")?.count || 0;
        const petsCount = guests.find((g) => g.type === "Pets")?.count || 0;
        // Format dates as ISO strings if they exist
        const checkin = dateRange[0] ? formatISODate(dateRange[0]) : "";
        const checkout = dateRange[1] ? formatISODate(dateRange[1]) : "";
        // Create the query string for URL
        const queryParams = new URLSearchParams({
            location: autocompleteVal,
            checkin,
            checkout,
            men: menCount,
            women: womenCount,
            children: childrenCount,
            pets: petsCount,
        }).toString();
        // Navigate to stays page with search parameters
        router.push(`/stays?${queryParams}`);
        // Close the search modal
        setIsOpen(false);
    };

    // Get search button text - customize based on whether we have pre-filled values
    const getSearchButtonText = () => {
        if (autocompleteVal && dateRange[0] && dateRange[1]) {
            return `Search in ${autocompleteVal}`;
        }
        return "Search Stays";
    };

    // Check if we have active search criteria
    const hasSearchCriteria =
        autocompleteVal &&
        dateRange[0] &&
        dateRange[1] &&
        guests.some((guest) => guest.count > 0);

    return (
        <>
            <div style={{ padding: "0 16px" }}>
                <Button large onClick={() => setIsOpen(true)}>
                    <Image
                        src="/assets/images/search.svg"
                        alt="Search"
                        width={20}
                        height={20}
                    />
                    {/* Show a more informative search text if we have values */}
                    {hasSearchCriteria
                        ? `${autocompleteVal} · ${formatDateRange(dateRange)}`
                        : searchTxtRef}
                </Button>
            </div>
            <div
                className={`${styles["mobile-search"]} ${
                    isOpen ? styles["mobile-search--open"] : ""
                }`}
            >
                {/* BACK BUTTON */}
                <div
                    tabIndex="-1"
                    className={styles["back-button"]}
                    onClick={() => setIsOpen(false)}
                >
                    <span className={styles["back-button--icon"]}>
                        <ArrowLeft size={18} />
                    </span>
                    <h3>Search</h3>
                </div>
                <div className="container" style={{ marginTop: 80 }}>
                    {/* LOCATION */}
                    <div className={styles["autocomplete"]}>
                        <div className={styles["autocomplete--input-wrapper"]}>
                            <Search className={styles["search-icon"]} />
                            <input
                                type="text"
                                value={autocompleteVal}
                                onChange={handleLocationChange}
                                onClick={() => {
                                    setLocationDropdown(true);
                                    // Show all locations if input is empty
                                    if (!autocompleteVal.trim()) {
                                        fetchLocationOptions().then((options) =>
                                            setFilteredLocationOptions(options)
                                        );
                                    } else {
                                        // Otherwise fetch based on current input
                                        fetchFilteredLocationOptions(
                                            autocompleteVal
                                        );
                                    }
                                }}
                                className={styles["autocomplete--input"]}
                                style={{
                                    marginBottom: locationDropdown ? 0 : 20,
                                }}
                                placeholder="Location"
                            />
                        </div>
                        {locationDropdown && (
                            <div
                                className={styles.modal}
                                onClick={() => setLocationDropdown(false)}
                            >
                                <div
                                    className={styles.modalContent}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <ul
                                        className={
                                            styles["autocomplete--dropdown"]
                                        }
                                    >
                                        {/* "Use my current location" button */}
                                        <li
                                            className={
                                                styles["autocomplete--item"]
                                            }
                                            onClick={handleCurrentLocationClick}
                                        >
                                            {isLoadingLocation ? (
                                                <Loader2 className="animate-spin" />
                                            ) : (
                                                <MousePointer2 />
                                            )}
                                            <span>
                                                {isLoadingLocation
                                                    ? "Getting your location..."
                                                    : "Use my current location"}
                                            </span>
                                        </li>

                                        {/* Loading indicator for locations */}
                                        {isLoadingLocations && (
                                            <li
                                                className={
                                                    styles["autocomplete--item"]
                                                }
                                            >
                                                <Loader2 className="animate-spin" />
                                                <span>
                                                    Loading locations...
                                                </span>
                                            </li>
                                        )}

                                        {/* location suggestions list */}
                                        {!isLoadingLocations &&
                                        filteredLocationOptions.length > 0
                                            ? filteredLocationOptions.map(
                                                  (option) => (
                                                      <li
                                                          key={option.key}
                                                          className={
                                                              styles[
                                                                  "autocomplete--item"
                                                              ]
                                                          }
                                                          onClick={() =>
                                                              handleLocationSelect(
                                                                  option
                                                              )
                                                          }
                                                      >
                                                          <MapPin />
                                                          <span>
                                                              {option.value}
                                                              {option.stays && (
                                                                  <small
                                                                      style={{
                                                                          marginLeft:
                                                                              "4px",
                                                                          color: "#888",
                                                                      }}
                                                                  >
                                                                      (
                                                                      {
                                                                          option.stays
                                                                      }{" "}
                                                                      stays)
                                                                  </small>
                                                              )}
                                                          </span>
                                                      </li>
                                                  )
                                              )
                                            : !isLoadingLocations && (
                                                  <li
                                                      className={
                                                          styles[
                                                              "autocomplete--no-results"
                                                          ]
                                                      }
                                                  >
                                                      No results found
                                                  </li>
                                              )}
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                    {/* DATE PICKER BUTTON */}
                    <Button
                        large
                        type="input"
                        onClick={() => setIsDatePickerOpen(true)}
                    >
                        <Calendar />
                        {formatDateRange(dateRange)}
                    </Button>
                    {/* DATE PICKER */}
                    <DateRangePicker
                        onChange={setDateRange}
                        value={dateRange}
                        onOpen={setIsDatePickerOpen}
                        isOpen={isDatePickerOpen}
                        inputClassName={styles["mobile-search__input"]}
                    />
                    {/* guests */}
                    <div className={styles["mobile-search__guests"]}>
                        <div className={styles["mobile-search__guests--head"]}>
                            <UserRound />
                            <h4>Guests</h4>
                        </div>
                        {guests.map((guest, index) => (
                            <div
                                className={
                                    styles["mobile-search__guests--item"]
                                }
                                key={index}
                            >
                                <div>{guest.type}</div>
                                <div
                                    className={
                                        styles["mobile-search__guests--count"]
                                    }
                                >
                                    <div
                                        onClick={() => {
                                            decreaseCount(index);
                                        }}
                                    >
                                        -
                                    </div>
                                    <div>{guest.count}</div>
                                    <div
                                        onClick={() => {
                                            increaseCount(index);
                                        }}
                                    >
                                        +
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* CTA SEARCH BTN */}
                    <Button
                        large
                        type="primary"
                        onClick={handleSearch}
                        disabled={isSearchDisabled}
                    >
                        {getSearchButtonText()} <ArrowRight />
                    </Button>
                    {/* logo */}
                    <div style={{ marginTop: 0 }}>
                        <Image
                            src="/assets/images/logo.svg"
                            alt="OneClick Stays"
                            width={90}
                            height={90}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default MobileSearch;
