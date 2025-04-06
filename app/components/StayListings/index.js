"use client";
import React, { useState, useEffect } from "react";
import styles from "./StayListings.module.scss";
import StayCard from "@/app/components/StayCard";
import { getFilteredStays } from "@/app/services/staysService";
import { Loader, RefreshCw } from "lucide-react";
import Image from "next/image";

/**
 * StayListings Component - Displays a list of stay cards with pagination
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
    const [stays, setStays] = useState(initialStays || []);
    const [page, setPage] = useState(1);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    // Update stays when initialStays changes (e.g., when filters are applied)
    useEffect(() => {
        setStays(initialStays || []);
        setPage(1);
        setHasMore(true);
    }, [initialStays]);

    // Function to load more stays
    const loadMoreStays = async () => {
        if (isLoadingMore || !hasMore) return;

        setIsLoadingMore(true);
        try {
            // Prepare filters with updated page number
            const nextPage = page + 1;
            const paginatedFilters = {
                ...filters,
                page: nextPage,
                limit: 10,
            };

            // Fetch next batch of stays
            const nextBatch = await getFilteredStays(paginatedFilters);

            // If no more stays are returned, we've reached the end
            if (!nextBatch || nextBatch.length === 0) {
                setHasMore(false);
            } else {
                // Add new stays to existing stays
                setStays((prevStays) => [...prevStays, ...nextBatch]);
                setPage(nextPage);
            }
        } catch (error) {
            console.error("Error loading more stays:", error);
            setHasMore(false);
        } finally {
            setIsLoadingMore(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title}>{title}</h2>
                {description && (
                    <p className={styles.description}>{description}</p>
                )}
            </div>

            {/* Loading state */}
            {loading && (
                <div className={styles.loadingContainer}>
                    <Loader className={styles.loadingIcon} />
                    <p>Finding the perfect stays for you...</p>
                </div>
            )}

            {/* Empty state when no stays match filters */}
            {!loading && (!stays || stays.length === 0) && (
                <div className={styles.emptyState}>
                    <Image
                        src="/assets/images/empty-results.svg"
                        alt="No stays found"
                        width={120}
                        height={120}
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
                        {stays.map((stay) => (
                            <StayCard key={stay._id} stay={stay} />
                        ))}
                    </div>

                    {/* Load more button */}
                    {hasMore && (
                        <div className={styles.loadMoreContainer}>
                            <button
                                className={styles.loadMoreButton}
                                onClick={loadMoreStays}
                                disabled={isLoadingMore}
                            >
                                {isLoadingMore ? (
                                    <>
                                        <RefreshCw
                                            className={styles.spinIcon}
                                            size={16}
                                        />
                                        Loading more stays...
                                    </>
                                ) : (
                                    "Load more stays"
                                )}
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default StayListings;
