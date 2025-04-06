"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "./StaysFilter.module.scss";
import { ChevronDown, ChevronUp, X, Bed, Bath, DoorOpen } from "lucide-react";
import {
    amenitiesList,
    managementTypes,
    propertyTypes,
    numericOptions,
} from "../../services/mockData";

const StaysFilter = ({
    isOpen,
    onClose,
    onApplyFilters,
    initialFilters = {},
}) => {
    // Filter states
    const [filters, setFilters] = useState({
        managementType: "everything", // Default selection
        priceRange: {
            min: 0,
            max: 2500000, // 25 lakh
        },
        rooms: {
            bedrooms: "Any",
            beds: "Any",
            bathrooms: "Any",
        },
        amenities: {},
        propertyType: "",
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

    // Accordion state - set all to open as requested
    const [expandedSections, setExpandedSections] = useState({
        managementType: true,
        priceRange: true,
        rooms: true,
        amenities: true,
        propertyType: true,
    });

    // Show all amenities state
    const [showAllAmenities, setShowAllAmenities] = useState(false);

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

    // Handle management type selection
    const handleManagementTypeSelect = (typeId) => {
        setFilters({
            ...filters,
            managementType: typeId,
        });
    };

    // Handle property type selection
    const handlePropertyTypeSelect = (typeId) => {
        setFilters({
            ...filters,
            propertyType: typeId,
        });
    };

    // Handle price range change
    const handlePriceRangeChange = (type, value) => {
        let newValue = parseInt(value, 10);

        // Handle NaN
        if (isNaN(newValue)) {
            newValue = type === "min" ? 0 : 2500000;
        }

        // Enforce limits
        if (type === "min") {
            newValue = Math.max(0, Math.min(newValue, filters.priceRange.max));
        } else {
            newValue = Math.max(
                filters.priceRange.min,
                Math.min(newValue, 2500000)
            );
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

    // Handle amenity selection
    const handleAmenityToggle = (amenityId) => {
        setFilters({
            ...filters,
            amenities: {
                ...filters.amenities,
                [amenityId]: !filters.amenities[amenityId],
            },
        });
    };

    // Reset all filters
    const resetFilters = () => {
        setFilters({
            managementType: "everything",
            priceRange: {
                min: 0,
                max: 2500000,
            },
            rooms: {
                bedrooms: "Any",
                beds: "Any",
                bathrooms: "Any",
            },
            amenities: {},
            propertyType: "",
        });
        setShowAllAmenities(false);
    };

    // Apply filters
    const applyFilters = () => {
        // Create a clean object of only selected amenities
        const selectedAmenities = Object.keys(filters.amenities)
            .filter((key) => filters.amenities[key])
            .reduce((obj, key) => {
                obj[key] = true;
                return obj;
            }, {});

        // Prepare the final filters object for the parent component
        const finalFilters = {
            ...filters,
            amenities: selectedAmenities,
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
                    {/* Management Type */}
                    <div className={styles.filterSection}>
                        <div
                            className={styles.sectionHeader}
                            onClick={() => toggleSection("managementType")}
                        >
                            <div>
                                <h3>Management Type</h3>
                                <p>How are the properties managed</p>
                            </div>
                            {expandedSections.managementType ? (
                                <ChevronUp size={20} />
                            ) : (
                                <ChevronDown size={20} />
                            )}
                        </div>

                        {expandedSections.managementType && (
                            <div className={styles.sectionContent}>
                                <div className={styles.boxOptions}>
                                    {managementTypes.map((type) => (
                                        <div
                                            key={type.id}
                                            className={`${styles.boxOption} ${
                                                filters.managementType ===
                                                type.id
                                                    ? styles.selected
                                                    : ""
                                            }`}
                                            onClick={() =>
                                                handleManagementTypeSelect(
                                                    type.id
                                                )
                                            }
                                        >
                                            <div
                                                className={styles.boxOptionIcon}
                                            >
                                                {type.icon}
                                            </div>
                                            <div
                                                className={
                                                    styles.boxOptionContent
                                                }
                                            >
                                                <h4>{type.title}</h4>
                                                <p>{type.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Price Range */}
                    <div className={styles.filterSection}>
                        <div
                            className={styles.sectionHeader}
                            onClick={() => toggleSection("priceRange")}
                        >
                            <div>
                                <h3>Price Range</h3>
                                <p>Nightly prices before fees and taxes</p>
                            </div>
                            {expandedSections.priceRange ? (
                                <ChevronUp size={20} />
                            ) : (
                                <ChevronDown size={20} />
                            )}
                        </div>

                        {expandedSections.priceRange && (
                            <div className={styles.sectionContent}>
                                <div className={styles.priceRange}>
                                    {/* Single price range slider container */}
                                    <div className={styles.sliderContainer}>
                                        <div className={styles.sliderTrack}>
                                            <div
                                                className={
                                                    styles.sliderProgress
                                                }
                                                style={{
                                                    left: `${
                                                        (filters.priceRange
                                                            .min /
                                                            2500000) *
                                                        100
                                                    }%`,
                                                    width: `${
                                                        ((filters.priceRange
                                                            .max -
                                                            filters.priceRange
                                                                .min) /
                                                            2500000) *
                                                        100
                                                    }%`,
                                                }}
                                            ></div>
                                        </div>

                                        <input
                                            ref={minPriceRangeRef}
                                            type="range"
                                            min="0"
                                            max="2500000"
                                            step="10000"
                                            value={filters.priceRange.min}
                                            onChange={(e) =>
                                                handlePriceRangeChange(
                                                    "min",
                                                    e.target.value
                                                )
                                            }
                                            className={`${styles.priceSlider} ${styles.minPriceSlider}`}
                                        />

                                        <input
                                            ref={maxPriceRangeRef}
                                            type="range"
                                            min="0"
                                            max="2500000"
                                            step="10000"
                                            value={filters.priceRange.max}
                                            onChange={(e) =>
                                                handlePriceRangeChange(
                                                    "max",
                                                    e.target.value
                                                )
                                            }
                                            className={`${styles.priceSlider} ${styles.maxPriceSlider}`}
                                        />
                                    </div>

                                    <div className={styles.priceInputs}>
                                        <div className={styles.priceInput}>
                                            <label>Min Price</label>
                                            <div
                                                className={
                                                    styles.inputWithSymbol
                                                }
                                            >
                                                <span>₹</span>
                                                <input
                                                    type="number"
                                                    value={
                                                        filters.priceRange.min
                                                    }
                                                    onChange={(e) =>
                                                        handlePriceRangeChange(
                                                            "min",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className={styles.priceInput}>
                                            <label>Max Price</label>
                                            <div
                                                className={
                                                    styles.inputWithSymbol
                                                }
                                            >
                                                <span>₹</span>
                                                <input
                                                    type="number"
                                                    value={
                                                        filters.priceRange.max
                                                    }
                                                    onChange={(e) =>
                                                        handlePriceRangeChange(
                                                            "max",
                                                            e.target.value
                                                        )
                                                    }
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
                        <div
                            className={styles.sectionHeader}
                            onClick={() => toggleSection("rooms")}
                        >
                            <div>
                                <h3>Rooms and Beds</h3>
                                <p>Select your preferred room configuration</p>
                            </div>
                            {expandedSections.rooms ? (
                                <ChevronUp size={20} />
                            ) : (
                                <ChevronDown size={20} />
                            )}
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
                                                    className={`${
                                                        styles.chip
                                                    } ${
                                                        filters.rooms
                                                            .bedrooms === option
                                                            ? styles.selected
                                                            : ""
                                                    }`}
                                                    onClick={() =>
                                                        handleRoomSelect(
                                                            "bedrooms",
                                                            option
                                                        )
                                                    }
                                                >
                                                    {option}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

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

                                    <div className={styles.roomTypeRow}>
                                        <label>
                                            <Bath size={16} />
                                            Bathrooms
                                        </label>
                                        <div className={styles.chipOptions}>
                                            {numericOptions.map((option) => (
                                                <div
                                                    key={`bathroom-${option}`}
                                                    className={`${
                                                        styles.chip
                                                    } ${
                                                        filters.rooms
                                                            .bathrooms ===
                                                        option
                                                            ? styles.selected
                                                            : ""
                                                    }`}
                                                    onClick={() =>
                                                        handleRoomSelect(
                                                            "bathrooms",
                                                            option
                                                        )
                                                    }
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

                    {/* Amenities */}
                    <div className={styles.filterSection}>
                        <div
                            className={styles.sectionHeader}
                            onClick={() => toggleSection("amenities")}
                        >
                            <div>
                                <h3>Amenities</h3>
                                <p>Select amenities that matter to you</p>
                            </div>
                            {expandedSections.amenities ? (
                                <ChevronUp size={20} />
                            ) : (
                                <ChevronDown size={20} />
                            )}
                        </div>

                        {expandedSections.amenities && (
                            <div className={styles.sectionContent}>
                                <h4 className={styles.subHeading}>
                                    Essentials
                                </h4>
                                <div className={styles.amenitiesList}>
                                    {amenitiesList
                                        .slice(
                                            0,
                                            showAllAmenities
                                                ? amenitiesList.length
                                                : 6
                                        )
                                        .map((amenity) => (
                                            <div
                                                key={amenity.id}
                                                className={styles.amenityItem}
                                            >
                                                <label
                                                    className={styles.checkbox}
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={
                                                            !!filters.amenities[
                                                                amenity.id
                                                            ]
                                                        }
                                                        onChange={() =>
                                                            handleAmenityToggle(
                                                                amenity.id
                                                            )
                                                        }
                                                    />
                                                    <span
                                                        className={
                                                            styles.checkmark
                                                        }
                                                    ></span>
                                                    <div
                                                        className={
                                                            styles.amenityLabel
                                                        }
                                                    >
                                                        {amenity.icon && (
                                                            <span
                                                                className={
                                                                    styles.amenityIcon
                                                                }
                                                            >
                                                                {amenity.icon}
                                                            </span>
                                                        )}
                                                        {amenity.name}
                                                    </div>
                                                </label>
                                            </div>
                                        ))}
                                </div>

                                {!showAllAmenities &&
                                    amenitiesList.length > 6 && (
                                        <button
                                            className={styles.showMoreButton}
                                            onClick={() =>
                                                setShowAllAmenities(true)
                                            }
                                        >
                                            SHOW {amenitiesList.length - 6} MORE
                                            AMENITIES
                                        </button>
                                    )}
                            </div>
                        )}
                    </div>

                    {/* Property Type */}
                    <div className={styles.filterSection}>
                        <div
                            className={styles.sectionHeader}
                            onClick={() => toggleSection("propertyType")}
                        >
                            <div>
                                <h3>Property Type</h3>
                                <p>Select your preferred stay type</p>
                            </div>
                            {expandedSections.propertyType ? (
                                <ChevronUp size={20} />
                            ) : (
                                <ChevronDown size={20} />
                            )}
                        </div>

                        {expandedSections.propertyType && (
                            <div className={styles.sectionContent}>
                                <div className={styles.boxOptions}>
                                    {propertyTypes.map((type) => (
                                        <div
                                            key={type.id}
                                            className={`${styles.boxOption} ${
                                                filters.propertyType === type.id
                                                    ? styles.selected
                                                    : ""
                                            }`}
                                            onClick={() =>
                                                handlePropertyTypeSelect(
                                                    type.id
                                                )
                                            }
                                        >
                                            <div
                                                className={styles.boxOptionIcon}
                                            >
                                                {type.icon}
                                            </div>
                                            <div
                                                className={
                                                    styles.boxOptionContent
                                                }
                                            >
                                                <h4>{type.title}</h4>
                                                <p>{type.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className={styles.actionButtons}>
                    <button
                        className={styles.resetButton}
                        onClick={resetFilters}
                    >
                        Reset All
                    </button>
                    <button
                        className={styles.applyButton}
                        onClick={applyFilters}
                    >
                        Apply Filters
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StaysFilter;
