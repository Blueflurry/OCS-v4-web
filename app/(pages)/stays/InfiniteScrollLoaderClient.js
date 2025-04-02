"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading";
import styles from "./Stays.module.scss";

export default function InfiniteScrollLoaderClient({
    currentPage,
    hasNextPage,
}) {
    const observerRef = useRef(null);
    const loaderRef = useRef(null);
    const router = useRouter();

    // Setup intersection observer for infinite scroll
    useEffect(() => {
        // Only setup observer if there's more content to load
        if (!hasNextPage) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (entry.isIntersecting && hasNextPage) {
                    // When element is visible, redirect to the next page
                    // This will be caught by the main page component and append data
                    const nextPage = currentPage + 1;
                    router.push(`?page=${nextPage}`, { scroll: false });
                }
            },
            { threshold: 0.5 }
        );

        observerRef.current = observer;

        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }

        return () => {
            if (loaderRef.current && observerRef.current) {
                observerRef.current.unobserve(loaderRef.current);
            }
        };
    }, [hasNextPage, currentPage, router]);

    return (
        <div ref={loaderRef} className={styles["loading-more"]}>
            <Loading />
        </div>
    );
}
