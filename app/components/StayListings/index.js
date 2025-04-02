"use client";

import { useState, useEffect, useRef } from "react";
import StayCard from "@/app/components/StayCard";
import styles from "./StayListings.module.scss";
import { getFilteredStays } from "@/app/services/staysService";
import { Loader, Search } from "lucide-react";

const ITEMS_PER_PAGE = 10;

export default function StayListings({
    initialStays = [],
    title,
    description,
    icon = <Search />,
    filters,
}) {
    // console.log(title);
    // console.log(description);
    // console.log(icon);

    const [stays, setStays] = useState(initialStays);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(
        initialStays.length >= ITEMS_PER_PAGE
    );
    const observer = useRef();
    const lastStayElementRef = useRef(null);

    // Function to load more stays
    const loadMoreStays = async () => {
        if (loading || !hasMore) return;

        setLoading(true);
        try {
            // Add pagination parameters to the filters
            const paginatedFilters = {
                ...filters,
                page: page + 1,
                limit: ITEMS_PER_PAGE,
            };

            const newStays = await getFilteredStays(paginatedFilters);

            if (newStays.length < ITEMS_PER_PAGE) {
                setHasMore(false);
            }

            setStays((prevStays) => [...prevStays, ...newStays]);
            setPage((prevPage) => prevPage + 1);
        } catch (error) {
            console.error("Error loading more stays:", error);
        } finally {
            setLoading(false);
        }
    };

    // Setup IntersectionObserver for infinite scrolling
    useEffect(() => {
        const currentObserver = observer.current;

        if (loading) return;

        if (lastStayElementRef.current) {
            if (currentObserver) currentObserver.disconnect();

            observer.current = new IntersectionObserver(
                (entries) => {
                    if (entries[0].isIntersecting && hasMore) {
                        loadMoreStays();
                    }
                },
                { threshold: 0.5 }
            );

            observer.current.observe(lastStayElementRef.current);
        }

        return () => {
            if (currentObserver) {
                currentObserver.disconnect();
            }
        };
    }, [loading, hasMore]);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                {icon && <div className={styles.icon}>{icon}</div>}
                <div className={styles.titleWrapper}>
                    <h2 className={styles.title}>{title}</h2>
                    {description && (
                        <p className={styles.description}>{description}</p>
                    )}
                </div>
            </div>

            {stays.length === 0 ? (
                <div className={styles.emptyState}>
                    <p>No stays found matching your criteria.</p>
                    <p>Try adjusting your search filters.</p>
                </div>
            ) : (
                <>
                    <div className={styles.staysGrid}>
                        {stays.map((stay, index) => {
                            // Apply ref to the last item for intersection observer
                            const isLastItem = index === stays.length - 1;
                            return (
                                <div
                                    key={index}
                                    ref={isLastItem ? lastStayElementRef : null}
                                >
                                    <StayCard stay={stay} />
                                </div>
                            );
                        })}
                    </div>

                    {loading && (
                        <div className={styles.loaderContainer}>
                            <Loader className={styles.loader} />
                            <p>Loading more stays...</p>
                        </div>
                    )}

                    {!hasMore && stays.length > 0 && (
                        <div className={styles.endMessage}>
                            <p>You've seen all available stays</p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
