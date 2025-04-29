"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "./StaysFilter.module.scss";
import {
    ChevronDown,
    ChevronUp,
    X,
    Bed,
    Bath,
    DoorOpen,
    Crown,
    Star,
    Diamond,
    CheckCircle,
    Waves,
    Music,
    Users,
    Home,
    Wind,
    Mountain,
    Heart,
    DogIcon,
    Building,
    UtensilsCrossed,
    Car,
    Flame,
    Plane,
    PartyPopper,
    LucideIcon,
} from "lucide-react";
import { numericOptions } from "../../services/mockData";
import { getFilters } from "@/app/services/staysService";
import Image from "next/image";

const StaysFilter = ({ isOpen, onClose, onApplyFilters, initialFilters = {} }) => {
    // Filter states
    const [filters, setFilters] = useState({
        luxuryLevel: "", // This remains single select
        priceRange: {
            min: 3000,
            max: 500000, // 5 lakh
        },
        rooms: {
            bedrooms: "Any",
            // beds: "Any",
            bathrooms: "Any",
        },
        amenities: {}, // Multi-select as object {code: true/false}
        stayType: {}, // Changed to multi-select object
        stayVibe: {}, // Changed to multi-select object
        addOnService: {}, // Changed to multi-select object
    });

    // Store API filter options
    const [filterOptions, setFilterOptions] = useState({
        luxuryLevel: [],
        stayType: [],
        stayVibe: [],
        amenities: [],
        addOnService: [],
    });

    // Initialize with any existing filters
    useEffect(() => {
        if (Object.keys(initialFilters).length > 0) {
            setFilters((prev) => ({
                ...prev,
                ...initialFilters,
            }));
        }
    }, [initialFilters]);

    // GET filters from API
    useEffect(() => {
        let isMounted = true;

        const fetchFilters = async () => {
            try {
                const response = await getFilters();
                // console.log("Raw filters response:", response);

                if (isMounted && response) {
                    // Check if we need to log more details about the structure
                    // console.log("Response keys:", Object.keys(response));

                    // Set filters with proper fallbacks
                    setFilterOptions({
                        luxuryLevel: response.luxury_level || [],
                        stayType: response.stay_type || [],
                        stayVibe: response.stay_vibe || [],
                        amenities: response.amenity || [],
                        // addOnService: response.add_on_service || [],
                    });

                    // Log the filter options after setting
                    // console.log("Filter options set:", {
                    //     luxuryLevel: response.luxury_level?.length || 0,
                    //     stayType: response.stay_type?.length || 0,
                    //     stayVibe: response.stay_vibe?.length || 0,
                    //     amenities: response.amenity?.length || 0,
                    //     addOnService: response.add_on_service?.length || 0,
                    // });
                } else {
                    console.error("Invalid response from getFilters:", response);

                    // Set some fallback mock data temporarily so we can see the UI
                    setFilterOptions({
                        luxuryLevel: [
                            {
                                _id: "1",
                                code: "ultra_luxury",
                                name: "Ultra Luxury",
                                description: "The finest accommodations with exceptional service",
                            },
                            {
                                _id: "2",
                                code: "premium",
                                name: "Premium",
                                description: "High-end accommodations with great amenities",
                            },
                            {
                                _id: "3",
                                code: "luxury",
                                name: "Luxury",
                                description: "Quality accommodations with premium features",
                            },
                            {
                                _id: "4",
                                code: "standard",
                                name: "Standard",
                                description: "Comfortable accommodations with essential amenities",
                            },
                        ],
                        stayType: [
                            {
                                _id: "1",
                                code: "villa",
                                name: "Villa",
                                description: "Luxurious independent houses with private spaces",
                            },
                            {
                                _id: "2",
                                code: "cottage",
                                name: "Cottage",
                                description: "Charming and cozy accommodations",
                            },
                            {
                                _id: "3",
                                code: "apartment",
                                name: "Apartment",
                                description: "Modern apartments in residential buildings",
                            },
                            {
                                _id: "4",
                                code: "suite",
                                name: "Suite",
                                description: "Elegant suites with separate living areas",
                            },
                        ],
                        stayVibe: [
                            {
                                _id: "1",
                                code: "beachfront",
                                name: "Beachfront",
                                description: "Properties with direct beach access",
                            },
                            {
                                _id: "2",
                                code: "entertainment_ready",
                                name: "Entertainment Ready",
                                description: "Perfect for hosting gatherings",
                            },
                            {
                                _id: "3",
                                code: "family_friendly",
                                name: "Family Friendly",
                                description: "Great for families with children",
                            },
                            {
                                _id: "4",
                                code: "luxury_living",
                                name: "Luxury Living",
                                description: "Sophisticated accommodations with refined aesthetics",
                            },
                        ],
                        amenities: [
                            {
                                _id: "1",
                                code: "tv",
                                name: "TV",
                                category: "Entertainment",
                            },
                            {
                                _id: "2",
                                code: "wifi",
                                name: "WiFi",
                                category: "Essentials",
                            },
                            {
                                _id: "3",
                                code: "pool",
                                name: "Pool",
                                category: "Recreation",
                            },
                            {
                                _id: "4",
                                code: "gym",
                                name: "Gym",
                                category: "Fitness",
                            },
                        ],
                        addOnService: [
                            {
                                _id: "1",
                                code: "private_chef",
                                name: "Private Chef",
                                description: "Enjoy meals prepared by a personal chef",
                            },
                            {
                                _id: "2",
                                code: "chauffeur",
                                name: "Chauffeur Service",
                                description: "Dedicated driver for your stay",
                            },
                            {
                                _id: "3",
                                code: "bonfire",
                                name: "Bonfire Setup",
                                description: "Enjoy evenings around a private bonfire",
                            },
                            {
                                _id: "4",
                                code: "airport_pickup",
                                name: "Airport Pickup",
                                description: "Hassle-free transportation from the airport",
                            },
                        ],
                    });
                }
            } catch (error) {
                console.error("Error fetching filters:", error);

                // Set fallback data in case of error
                setFilterOptions({
                    luxuryLevel: [
                        {
                            _id: "1",
                            code: "ultra_luxury",
                            name: "Ultra Luxury",
                            description: "The finest accommodations with exceptional service",
                        },
                        {
                            _id: "2",
                            code: "premium",
                            name: "Premium",
                            description: "High-end accommodations with great amenities",
                        },
                        {
                            _id: "3",
                            code: "luxury",
                            name: "Luxury",
                            description: "Quality accommodations with premium features",
                        },
                        {
                            _id: "4",
                            code: "standard",
                            name: "Standard",
                            description: "Comfortable accommodations with essential amenities",
                        },
                    ],
                    stayType: [
                        {
                            _id: "1",
                            code: "villa",
                            name: "Villa",
                            description: "Luxurious independent houses with private spaces",
                        },
                        {
                            _id: "2",
                            code: "cottage",
                            name: "Cottage",
                            description: "Charming and cozy accommodations",
                        },
                        {
                            _id: "3",
                            code: "apartment",
                            name: "Apartment",
                            description: "Modern apartments in residential buildings",
                        },
                        {
                            _id: "4",
                            code: "suite",
                            name: "Suite",
                            description: "Elegant suites with separate living areas",
                        },
                    ],
                    stayVibe: [
                        {
                            _id: "1",
                            code: "beachfront",
                            name: "Beachfront",
                            description: "Properties with direct beach access",
                        },
                        {
                            _id: "2",
                            code: "entertainment_ready",
                            name: "Entertainment Ready",
                            description: "Perfect for hosting gatherings",
                        },
                        {
                            _id: "3",
                            code: "family_friendly",
                            name: "Family Friendly",
                            description: "Great for families with children",
                        },
                        {
                            _id: "4",
                            code: "luxury_living",
                            name: "Luxury Living",
                            description: "Sophisticated accommodations with refined aesthetics",
                        },
                    ],
                    amenities: [
                        {
                            _id: "1",
                            code: "tv",
                            name: "TV",
                            category: "Entertainment",
                        },
                        {
                            _id: "2",
                            code: "wifi",
                            name: "WiFi",
                            category: "Essentials",
                        },
                        {
                            _id: "3",
                            code: "pool",
                            name: "Pool",
                            category: "Recreation",
                        },
                        {
                            _id: "4",
                            code: "gym",
                            name: "Gym",
                            category: "Fitness",
                        },
                    ],
                    addOnService: [
                        {
                            _id: "1",
                            code: "private_chef",
                            name: "Private Chef",
                            description: "Enjoy meals prepared by a personal chef",
                        },
                        {
                            _id: "2",
                            code: "chauffeur",
                            name: "Chauffeur Service",
                            description: "Dedicated driver for your stay",
                        },
                        {
                            _id: "3",
                            code: "bonfire",
                            name: "Bonfire Setup",
                            description: "Enjoy evenings around a private bonfire",
                        },
                        {
                            _id: "4",
                            code: "airport_pickup",
                            name: "Airport Pickup",
                            description: "Hassle-free transportation from the airport",
                        },
                    ],
                });
            }
        };

        fetchFilters();

        return () => {
            isMounted = false;
        };
    }, []);

    // Accordion state - set all to open as requested
    const [expandedSections, setExpandedSections] = useState({
        luxuryLevel: true,
        stayVibe: true,
        priceRange: true,
        rooms: true,
        amenities: true,
        stayType: true,
        addOnService: true,
    });

    // Show all amenities state
    const [showAllAmenities, setShowAllAmenities] = useState(false);

    // Show all stay vibes state
    const [showAllStayVibes, setShowAllStayVibes] = useState(false);

    // Handle drawer click outside to close
    const drawerRef = useRef(null);

    // References for the price range sliders
    const minPriceRangeRef = useRef(null);
    const maxPriceRangeRef = useRef(null);

    // Toggle accordion sections
    const toggleSection = (section) => {
        setExpandedSections({
            ...expandedSections,
            [section]: !expandedSections[section],
        });
    };

    // Handle luxury level selection (remains single select)
    const handleLuxuryLevelSelect = (code) => {
        setFilters({
            ...filters,
            luxuryLevel: code === filters.luxuryLevel ? "" : code,
        });
    };

    // Handle stay type selection (now multi-select)
    const handleStayTypeToggle = (code) => {
        setFilters({
            ...filters,
            stayType: {
                ...filters.stayType,
                [code]: !filters.stayType[code],
            },
        });
    };

    // Handle stay vibe selection (now multi-select)
    const handleStayVibeToggle = (code) => {
        setFilters({
            ...filters,
            stayVibe: {
                ...filters.stayVibe,
                [code]: !filters.stayVibe[code],
            },
        });
    };

    // Handle add-on service selection (now multi-select)
    const handleAddOnServiceToggle = (code) => {
        setFilters({
            ...filters,
            addOnService: {
                ...filters.addOnService,
                [code]: !filters.addOnService[code],
            },
        });
    };

    // Handle price range change
    const handlePriceRangeChange = (type, value) => {
        let newValue = parseInt(value, 10);

        // Handle NaN
        if (isNaN(newValue)) {
            newValue = type === "min" ? 3000 : 500000;
        }

        // Enforce limits
        if (type === "min") {
            newValue = Math.max(3000, Math.min(newValue, filters.priceRange.max));
        } else {
            newValue = Math.max(filters.priceRange.min, Math.min(newValue, 500000));
        }

        setFilters({
            ...filters,
            priceRange: {
                ...filters.priceRange,
                [type]: newValue,
            },
        });

        // Update slider positions visually
        if (type === "min" && minPriceRangeRef.current) {
            minPriceRangeRef.current.value = newValue;
        } else if (type === "max" && maxPriceRangeRef.current) {
            maxPriceRangeRef.current.value = newValue;
        }
    };

    // Handle room selection
    const handleRoomSelect = (roomType, value) => {
        setFilters({
            ...filters,
            rooms: {
                ...filters.rooms,
                [roomType]: value,
            },
        });
    };

    // Handle amenity selection (changed to chip style)
    const handleAmenityToggle = (amenityCode) => {
        setFilters({
            ...filters,
            amenities: {
                ...filters.amenities,
                [amenityCode]: !filters.amenities[amenityCode],
            },
        });
    };

    // Reset all filters
    const resetFilters = () => {
        setFilters({
            luxuryLevel: "",
            priceRange: {
                min: 3000,
                max: 500000,
            },
            rooms: {
                bedrooms: "Any",
                // beds: "Any",
                bathrooms: "Any",
            },
            amenities: {},
            stayType: {},
            stayVibe: {},
            addOnService: {},
        });
        setShowAllAmenities(false);
        setShowAllStayVibes(false);
    };

    // Get luxury level icon based on level code
    const getLuxuryLevelIcon = (code) => {
        switch (code) {
            case "ultra_luxury":
                return <Crown size={20} />;
            case "premium":
                return <Diamond size={20} />;
            case "luxury":
                return <Star size={20} />;
            case "standard":
                return <CheckCircle size={20} />;
            default:
                return <Diamond size={20} />;
        }
    };

    // Get stay vibe icon based on vibe code
    const getStayVibeIcon = (code) => {
        switch (code) {
            case "beachfront":
                return <Waves size={20} />;
            case "entertainment_ready":
                return <PartyPopper size={20} />;
            case "family_friendly":
                return <Users size={20} />;
            case "luxury_living":
                return <Diamond size={20} />;
            case "peaceful":
                return <Wind size={20} />;
            case "mountain_view":
                return <Mountain size={20} />;
            case "romantic":
                return <Heart size={20} />;
            case "pet_friendly":
                return <DogIcon size={20} />;
            default:
                return <Star size={20} />;
        }
    };

    // Get stay type icon based on type code
    const getStayTypeIcon = (code) => {
        switch (code) {
            case "villa":
                return <Home size={20} />;
            case "cottage":
                return <Home size={20} />;
            case "apartment":
                return <Building size={20} />;
            case "suite":
                return <DoorOpen size={20} />;
            case "penthouse":
                return <Building size={20} />;
            default:
                return <Home size={20} />;
        }
    };

    // Get add-on service icon based on service code
    const getAddOnServiceIcon = (code) => {
        switch (code) {
            case "private_chef":
                return <UtensilsCrossed size={20} />;
            case "chauffeur_cab":
                return <Car size={20} />;
            case "bonfire":
                return <Flame size={20} />;
            case "taxi_pickup_drop":
                return <Plane size={20} />;
            default:
                return <Star size={20} />;
        }
    };

    // Apply filters
    const applyFilters = () => {
        // Create a clean objects of only selected items for all multi-select filters
        const selectedAmenities = Object.keys(filters.amenities)
            .filter((key) => filters.amenities[key])
            .reduce((obj, key) => {
                obj[key] = true;
                return obj;
            }, {});

        const selectedStayTypes = Object.keys(filters.stayType)
            .filter((key) => filters.stayType[key])
            .reduce((obj, key) => {
                obj[key] = true;
                return obj;
            }, {});

        const selectedStayVibes = Object.keys(filters.stayVibe)
            .filter((key) => filters.stayVibe[key])
            .reduce((obj, key) => {
                obj[key] = true;
                return obj;
            }, {});

        const selectedAddOnServices = Object.keys(filters.addOnService)
            .filter((key) => filters.addOnService[key])
            .reduce((obj, key) => {
                obj[key] = true;
                return obj;
            }, {});

        // Prepare the final filters object for the parent component
        const finalFilters = {
            ...filters,
            amenities: selectedAmenities,
            stayType: selectedStayTypes,
            stayVibe: selectedStayVibes,
            addOnService: selectedAddOnServices,
        };

        if (onApplyFilters) {
            onApplyFilters(finalFilters);
        }

        if (onClose) {
            onClose();
        }
    };

    return (
        <div className={`${styles.filterOverlay} ${isOpen ? styles.open : ""}`}>
            <div className={styles.filterDrawer} ref={drawerRef}>
                {/* Header with close button */}
                <div className={styles.filterHeader}>
                    <h2>Stays Filters</h2>
                    <p>Customize as per your need</p>
                    <button className={styles.closeButton} onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>

                {/* Filter Sections */}
                <div className={styles.filterSections}>
                    {/* Stay Type (replaced Property Type) */}
                    <div className={styles.filterSection}>
                        <div className={styles.sectionHeader} onClick={() => toggleSection("stayType")}>
                            <div>
                                <h3>Stay Type</h3>
                                <p>Select your preferred accommodation type</p>
                            </div>
                            {expandedSections.stayType ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </div>

                        {expandedSections.stayType && (
                            <div className={styles.sectionContent}>
                                {filterOptions.stayType && filterOptions.stayType.length > 0 ? (
                                    <div className={styles.boxOptions}>
                                        {filterOptions.stayType.map((item) => (
                                            <div
                                                key={item._id || item.code}
                                                className={`${styles.boxOption} ${filters.stayType[item.code] ? styles.selected : ""}`}
                                                onClick={() => handleStayTypeToggle(item.code)}
                                            >
                                                <div className={styles.boxOptionIcon}>{getStayTypeIcon(item.code)}</div>
                                                <div className={styles.boxOptionContent}>
                                                    <h4>{item.name}</h4>
                                                    <p>{item.description || `${item.name} accommodation`}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className={styles.emptySection}>
                                        <p>Loading stay type options...</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Luxury Level (replaced Management Type) */}
                    <div className={styles.filterSection}>
                        <div className={styles.sectionHeader} onClick={() => toggleSection("luxuryLevel")}>
                            <div>
                                <h3>Luxury Level</h3>
                                <p>Choose your preferred luxury experience</p>
                            </div>
                            {expandedSections.luxuryLevel ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </div>

                        {expandedSections.luxuryLevel && (
                            <div className={styles.sectionContent}>
                                {filterOptions.luxuryLevel && filterOptions.luxuryLevel.length > 0 ? (
                                    <div className={styles.boxOptions}>
                                        {filterOptions.luxuryLevel.map((item) => (
                                            <div
                                                key={item._id || item.code}
                                                className={`${styles.boxOption} ${filters.luxuryLevel === item.code ? styles.selected : ""}`}
                                                onClick={() => handleLuxuryLevelSelect(item.code)}
                                            >
                                                <div className={styles.boxOptionIcon}>{getLuxuryLevelIcon(item.code)}</div>
                                                <div className={styles.boxOptionContent}>
                                                    <h4>{item.name}</h4>
                                                    <p>{item.description || `${item.name} accommodations`}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className={styles.emptySection}>
                                        <p>Loading luxury level options...</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Stay Vibe (New Section) */}
                    <div className={styles.filterSection}>
                        <div className={styles.sectionHeader} onClick={() => toggleSection("stayVibe")}>
                            <div>
                                <h3>Stay Vibe</h3>
                                <p>Select the atmosphere you prefer</p>
                            </div>
                            {expandedSections.stayVibe ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </div>

                        {expandedSections.stayVibe && (
                            <div className={styles.sectionContent}>
                                {filterOptions.stayVibe && filterOptions.stayVibe.length > 0 ? (
                                    <>
                                        <div className={styles.boxOptions}>
                                            {filterOptions.stayVibe.slice(0, showAllStayVibes ? filterOptions.stayVibe.length : 6).map((item) => (
                                                <div
                                                    key={item._id || item.code}
                                                    className={`${styles.boxOption} ${filters.stayVibe[item.code] ? styles.selected : ""}`}
                                                    onClick={() => handleStayVibeToggle(item.code)}
                                                >
                                                    <div className={styles.boxOptionIcon}>{getStayVibeIcon(item.code)}</div>
                                                    <div className={styles.boxOptionContent}>
                                                        <h4>{item.name}</h4>
                                                        <p>{item.description || `${item.name} experience`}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        {filterOptions.stayVibe.length > 6 && (
                                            <button
                                                className={styles.showMoreButton}
                                                onClick={() => {
                                                    setShowAllStayVibes(!showAllStayVibes);
                                                }}
                                            >
                                                {showAllStayVibes ? "SHOW LESS" : `SHOW ${filterOptions.stayVibe.length - 6} MORE OPTIONS`}
                                            </button>
                                        )}
                                    </>
                                ) : (
                                    <div className={styles.emptySection}>
                                        <p>Loading stay vibe options...</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Price Range */}
                    <div className={styles.filterSection}>
                        <div className={styles.sectionHeader} onClick={() => toggleSection("priceRange")}>
                            <div>
                                <h3>Price Range</h3>
                                <p>Nightly prices before fees and taxes</p>
                            </div>
                            {expandedSections.priceRange ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </div>

                        {expandedSections.priceRange && (
                            <div className={styles.sectionContent}>
                                <div className={styles.priceRange}>
                                    {/* Single price range slider container */}
                                    <div className={styles.sliderContainer}>
                                        <div className={styles.sliderTrack}>
                                            <div
                                                className={styles.sliderProgress}
                                                style={{
                                                    left: `${(filters.priceRange.min / 500000) * 100}%`,
                                                    width: `${((filters.priceRange.max - filters.priceRange.min) / 500000) * 100}%`,
                                                }}
                                            ></div>
                                        </div>

                                        <input
                                            ref={minPriceRangeRef}
                                            type="range"
                                            min="3000"
                                            max="500000"
                                            step="2000"
                                            value={filters.priceRange.min}
                                            onChange={(e) => handlePriceRangeChange("min", e.target.value)}
                                            className={`${styles.priceSlider} ${styles.minPriceSlider}`}
                                        />

                                        <input
                                            ref={maxPriceRangeRef}
                                            type="range"
                                            min="3000"
                                            max="500000"
                                            step="2000"
                                            value={filters.priceRange.max}
                                            onChange={(e) => handlePriceRangeChange("max", e.target.value)}
                                            className={`${styles.priceSlider} ${styles.maxPriceSlider}`}
                                        />
                                    </div>

                                    <div className={styles.priceInputs}>
                                        <div className={styles.priceInput}>
                                            <label>Min Price</label>
                                            <div className={styles.inputWithSymbol}>
                                                <span>₹</span>
                                                <input
                                                    type="number"
                                                    value={filters.priceRange.min}
                                                    onChange={(e) => handlePriceRangeChange("min", e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className={styles.priceInput}>
                                            <label>Max Price</label>
                                            <div className={styles.inputWithSymbol}>
                                                <span>₹</span>
                                                <input
                                                    type="number"
                                                    value={filters.priceRange.max}
                                                    onChange={(e) => handlePriceRangeChange("max", e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Rooms and Beds */}
                    <div className={styles.filterSection}>
                        <div className={styles.sectionHeader} onClick={() => toggleSection("rooms")}>
                            <div>
                                <h3>Rooms and Beds</h3>
                                <p>Select your preferred room configuration</p>
                            </div>
                            {expandedSections.rooms ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </div>

                        {expandedSections.rooms && (
                            <div className={styles.sectionContent}>
                                <div className={styles.roomOptions}>
                                    <div className={styles.roomTypeRow}>
                                        <label>
                                            <DoorOpen size={16} />
                                            Bedrooms
                                        </label>
                                        <div className={styles.chipOptions}>
                                            {numericOptions.map((option) => (
                                                <div
                                                    key={`bedroom-${option}`}
                                                    className={`${styles.chip} ${filters.rooms.bedrooms === option ? styles.selected : ""}`}
                                                    onClick={() => handleRoomSelect("bedrooms", option)}
                                                >
                                                    {option}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Beds section commented out as requested
                                    <div className={styles.roomTypeRow}>
                                        <label>
                                            <Bed size={16} />
                                            Beds
                                        </label>
                                        <div className={styles.chipOptions}>
                                            {numericOptions.map((option) => (
                                                <div
                                                    key={`bed-${option}`}
                                                    className={`${
                                                        styles.chip
                                                    } ${
                                                        filters.rooms.beds ===
                                                        option
                                                            ? styles.selected
                                                            : ""
                                                    }`}
                                                    onClick={() =>
                                                        handleRoomSelect(
                                                            "beds",
                                                            option
                                                        )
                                                    }
                                                >
                                                    {option}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    */}

                                    <div className={styles.roomTypeRow}>
                                        <label>
                                            <Bath size={16} />
                                            Bathrooms
                                        </label>
                                        <div className={styles.chipOptions}>
                                            {numericOptions.map((option) => (
                                                <div
                                                    key={`bathroom-${option}`}
                                                    className={`${styles.chip} ${filters.rooms.bathrooms === option ? styles.selected : ""}`}
                                                    onClick={() => handleRoomSelect("bathrooms", option)}
                                                >
                                                    {option}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Amenities - Changed to chips instead of checkboxes */}
                    <div className={styles.filterSection}>
                        <div className={styles.sectionHeader} onClick={() => toggleSection("amenities")}>
                            <div>
                                <h3>Amenities</h3>
                                <p>Select amenities that matter to you</p>
                            </div>
                            {expandedSections.amenities ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </div>

                        {expandedSections.amenities && (
                            <div className={styles.sectionContent}>
                                {filterOptions.amenities && filterOptions.amenities.length > 0 ? (
                                    <>
                                        <div className={styles.chipOptions}>
                                            {filterOptions.amenities
                                                .slice(0, showAllAmenities ? filterOptions.amenities.length : 12)
                                                .map((amenity) => (
                                                    <div
                                                        key={amenity._id || amenity.code}
                                                        className={`${styles.chip} ${filters.amenities[amenity.code] ? styles.selected : ""}`}
                                                        onClick={() => handleAmenityToggle(amenity.code)}
                                                    >
                                                        {amenity.icon && (
                                                            <img
                                                                src={amenity.icon}
                                                                alt={amenity.name}
                                                                className={styles.amenityIcon}
                                                                width={16}
                                                                height={16}
                                                            />
                                                        )}
                                                        {amenity.name}
                                                    </div>
                                                ))}
                                        </div>

                                        {filterOptions.amenities.length > 12 && (
                                            <button className={styles.showMoreButton} onClick={() => setShowAllAmenities(!showAllAmenities)}>
                                                {showAllAmenities ? "SHOW LESS" : `SHOW ${filterOptions.amenities.length - 12} MORE AMENITIES`}
                                            </button>
                                        )}
                                    </>
                                ) : (
                                    <div className={styles.emptySection}>
                                        <p>Loading amenity options...</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Add-On Services (New Section) */}
                    {/* <div className={styles.filterSection}>
                        <div
                            className={styles.sectionHeader}
                            onClick={() => toggleSection("addOnService")}
                        >
                            <div>
                                <h3>Add-On Services</h3>
                                <p>Choose additional services you desire</p>
                            </div>
                            {expandedSections.addOnService ? (
                                <ChevronUp size={20} />
                            ) : (
                                <ChevronDown size={20} />
                            )}
                        </div>

                        {expandedSections.addOnService && (
                            <div className={styles.sectionContent}>
                                {filterOptions.addOnService &&
                                filterOptions.addOnService.length > 0 ? (
                                    <div
                                        className={`${styles.boxOptions} ${styles.addOnOptions}`}
                                    >
                                        {filterOptions.addOnService.map(
                                            (item) => (
                                                <div
                                                    key={item._id || item.code}
                                                    className={`${
                                                        styles.boxOption
                                                    } ${styles.addOnBox} ${
                                                        filters.addOnService[
                                                            item.code
                                                        ]
                                                            ? styles.selected
                                                            : ""
                                                    }`}
                                                    onClick={() =>
                                                        handleAddOnServiceToggle(
                                                            item.code
                                                        )
                                                    }
                                                >
                                                    {!item.image && (
                                                        <div
                                                            className={
                                                                styles.boxOptionIcon
                                                            }
                                                            style={{
                                                                backgroundImage:
                                                                    "none",
                                                                backgroundSize:
                                                                    "cover",
                                                                backgroundPosition:
                                                                    "center",
                                                                color: "inherit",
                                                            }}
                                                        >
                                                            {!item.image &&
                                                                (item.name?.charAt(
                                                                    0
                                                                ) ||
                                                                    "A")}
                                                        </div>
                                                    )}
                                                    {item.image && (
                                                        <Image
                                                            src={item.image}
                                                            width={300}
                                                            height={300}
                                                            style={{
                                                                objectFit:
                                                                    "cover",
                                                            }}
                                                            alt="Add-On Service"
                                                        />
                                                    )}
                                                    <div
                                                        className={
                                                            styles.boxOptionContent
                                                        }
                                                    >
                                                        <h4>{item.name}</h4>
                                                        <p>
                                                            {item.description ||
                                                                `${item.name} service`}
                                                        </p>
                                                    </div>
                                                </div>
                                            )
                                        )}
                                    </div>
                                ) : (
                                    <div className={styles.emptySection}>
                                        <p>Loading add-on service options...</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div> */}

                    {/* Action Buttons */}
                    <div className={styles.actionButtons}>
                        <button className={styles.resetButton} onClick={resetFilters}>
                            Reset All
                        </button>
                        <button className={styles.applyButton} onClick={applyFilters}>
                            Apply Filters
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StaysFilter;
