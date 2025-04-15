"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import styles from "./StayListings.module.scss";
import StayCard from "@/app/components/StayCard";
import { getFilteredStays } from "@/app/services/staysService";
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import emptyStateAnimation from "@/public/assets/animations/empty-state.json";
import LoadingAnimation from "@/public/assets/animations/load-more.json";

/**
 * StayListings Component with infinite scroll
 * @param {object} props - Component props
 * @param {array} props.initialStays - Initial stays data
 * @param {string} props.title - Title for the listings section
 * @param {string} props.description - Optional description
 * @param {object} props.filters - Filter parameters
 * @param {boolean} props.loading - Whether data is currently loading
 * @returns {JSX.Element} StayListings component
 */
const StayListings = ({
    initialStays,
    title,
    description,
    filters,
    loading = false,
}) => {
    const [animationFlag, setAnimationFlag] = useState(false);
    // Make sure we're initializing the stays array correctly
    const [stays, setStays] = useState(initialStays || []);
    const [page, setPage] = useState(1);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    // Default to assuming we have more pages unless we know otherwise
    const [paginationInfo, setPaginationInfo] = useState({
        totalPages: 10, // Default assumption
        totalResults: initialStays?.length || 0,
    });

    // Function to load more stays - defined before the callback that uses it
    const loadMoreStays = async () => {
        // Check if we're already loading or have no more to load
        if (isLoadingMore || !hasMore) return;

        console.log("Loading more stays, current page:", page);
        setIsLoadingMore(true);

        try {
            // Prepare filters with updated page number
            const nextPage = page + 1;
            const paginatedFilters = {
                ...filters,
                page: nextPage,
                limit: 10,
            };

            console.log(
                "Fetching page:",
                nextPage,
                "with filters:",
                paginatedFilters
            );

            // Fetch next batch of stays
            const nextBatch = await getFilteredStays(paginatedFilters);
            console.log("Received new batch:", nextBatch);

            // If no more stays are returned, we've reached the end
            if (!nextBatch || nextBatch.length === 0) {
                console.log("No more stays, setting hasMore to false");
                setHasMore(false);
            } else {
                // Add new stays to existing stays
                setStays((prevStays) => [...prevStays, ...nextBatch]);
                setPage(nextPage);

                // Check if we've received pagination info
                if (nextBatch.totalPages) {
                    setPaginationInfo({
                        totalPages: nextBatch.totalPages,
                        totalResults: nextBatch.totalResults || 0,
                    });
                    setHasMore(nextPage < nextBatch.totalPages);
                }
            }
        } catch (error) {
            console.error("Error loading more stays:", error);
            setHasMore(false);
        } finally {
            setIsLoadingMore(false);
        }
    };

    // Create a ref for the observer
    const observer = useRef();

    // Create a ref for the last element with useCallback to avoid unnecessary re-renders
    const lastStayElementRef = useCallback(
        (node) => {
            // Don't set up observer if we're already loading or have no more items
            if (loading || isLoadingMore) return;

            // Disconnect previous observer if exists
            if (observer.current) observer.current.disconnect();

            // Create new IntersectionObserver
            observer.current = new IntersectionObserver(
                (entries) => {
                    // If the last element is visible and we have more items to load
                    if (entries[0]?.isIntersecting && hasMore) {
                        console.log(
                            "Last element is visible, loading more stays"
                        );
                        loadMoreStays();
                    }
                },
                {
                    threshold: 0.5, // When element is 50% visible
                    rootMargin: "100px", // Start loading 100px before the element comes into view
                }
            );

            // Observe the node if it exists
            if (node) {
                console.log("Setting up observer for last element");
                observer.current.observe(node);
            }
        },
        [loading, isLoadingMore, hasMore] // Only recreate callback when these dependencies change
    );

    // Update stays when initialStays changes (e.g., when filters are applied)
    useEffect(() => {
        console.log("initialStays changed:", initialStays);
        if (initialStays) {
            // Reset to initial state when filters change
            setStays(initialStays);
            setPage(1);
            setHasMore(true); // Assume we have more until proven otherwise
        }
    }, [initialStays]);

    // Cleanup observer on component unmount
    useEffect(() => {
        return () => {
            if (observer.current) {
                observer.current.disconnect();
            }
        };
    }, []);

    const handleAnimationEnterFrame = () => {
        setTimeout(() => {
            setAnimationFlag(true);
        }, 800);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title}>{title}</h2>
                {description && (
                    <p className={styles.description}>{description}</p>
                )}
                {paginationInfo.totalResults > 0 && (
                    <p className={styles.results}>
                        {paginationInfo.totalResults} stays found
                    </p>
                )}
            </div>

            {/* Loading state for initial load */}
            {loading && (
                <div className={styles.loadingContainer}>
                    <Lottie
                        animationData={emptyStateAnimation}
                        loop={true}
                        style={{ height: 200 }}
                    />
                    <p>Finding the perfect stays for you...</p>
                </div>
            )}

            {/* Empty state when no stays match filters */}
            {!loading && (!stays || stays.length === 0) && (
                <div className={styles.emptyState}>
                    <Lottie
                        animationData={emptyStateAnimation}
                        loop={true}
                        onEnterFrame={handleAnimationEnterFrame}
                    />
                    <h3>No stays match your filters</h3>
                    <p>
                        Try adjusting your search filters or exploring a
                        different location
                    </p>
                </div>
            )}

            {/* Stays grid */}
            {!loading && stays && stays.length > 0 && (
                <>
                    <div className={styles.grid}>
                        {stays.map((stay, index) => {
                            // Add ref to last element for intersection observer
                            if (stays.length === index + 1) {
                                return (
                                    <div
                                        ref={lastStayElementRef}
                                        key={stay._id || index}
                                        className={styles.lastItem}
                                    >
                                        <StayCard stay={stay} />
                                    </div>
                                );
                            } else {
                                return (
                                    <StayCard
                                        key={stay._id || index}
                                        stay={stay}
                                    />
                                );
                            }
                        })}
                    </div>

                    {/* Loading more indicator */}
                    {isLoadingMore && (
                        <div className={styles.infiniteScrollLoading}>
                            <Lottie
                                animationData={LoadingAnimation}
                                loop={true}
                                style={{ height: 160 }}
                            />
                            <p>Loading more amazing stays...</p>
                        </div>
                    )}

                    {/* End of results message */}
                    {!hasMore && stays.length > 0 && (
                        <div className={styles.endMessage}>
                            <p>You've seen all available stays</p>
                        </div>
                    )}
                </>
            )}

            {/* Debug button - to help test if there's an issue with the observer */}
            <div className={styles.debugSection}>
                {hasMore && !isLoadingMore && stays?.length > 0 && (
                    <button
                        className={styles.debugButton}
                        onClick={loadMoreStays}
                    >
                        Load More (Debug)
                    </button>
                )}
            </div>
        </div>
    );
};

export default StayListings;
