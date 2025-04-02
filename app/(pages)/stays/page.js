import Header from "@/app/modules/Header";
import React, { Suspense } from "react";
import Loading from "@/app/loading";
import Hero from "@/app/modules/Hero/Hero";
import StayCarousel from "@/app/modules/StayCarousel";
import styles from "./Stays.module.scss";
import ErrorBoundary from "@/app/components/ErrorBoundary";
import { dummyStaysCarouselData } from "@/app/constants/dummy";
import InfiniteScrollLoaderClient from "./InfiniteScrollLoaderClient";

// Number of carousels to load per page
const ITEMS_PER_PAGE = 2;

// Server component to fetch data and render the page
async function getStaysData(page = 1) {
    try {
        // MOCK DATA MODE - Comment this section out when real APIs are ready
        // Simulate API delay (this would be removed in production)
        await new Promise((resolve) => setTimeout(resolve, 100));

        // Get a single carousel with paginated stays
        const singleCarousel = dummyStaysCarouselData[0];
        const allStays = singleCarousel.stays || [];

        // Calculate start and end indices for the stays within the carousel
        const staysPerPage = 5;
        const startIdx = (page - 1) * staysPerPage;
        const endIdx = startIdx + staysPerPage;

        // Check if there are more stays to load
        const hasNextPage = endIdx < allStays.length;

        // Get the slice of stays for the current page
        const paginatedStays = allStays.slice(0, endIdx);

        // Create a copy of the carousel with the paginated stays
        const carouselWithPaginatedStays = {
            ...singleCarousel,
            stays: paginatedStays,
        };

        return {
            stayCarousel: carouselWithPaginatedStays,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(allStays.length / staysPerPage),
                hasNextPage,
            },
        };

        // REAL API MODE - Uncomment this section when your APIs are ready
        /*
    // Use absolute URLs for API routes when deploying to production
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
    
    const response = await fetch(`${baseUrl}/api/stays?page=${page}&limit=5`, {
      cache: "no-store",
      next: { tags: ["staysData"] },
    });
    
    // Handle potential API errors
    if (!response.ok) {
      throw new Error(`Failed to fetch stays: ${response.status}`);
    }
    
    const data = await response.json();
    
    return {
      stayCarousel: data.stayCarousel,
      pagination: data.pagination
    };
    */
    } catch (error) {
        console.error("Error fetching stays page data:", error);
        throw error;
    }
}

export default async function Stays({ searchParams }) {
    // Get page number from URL query params or default to 1
    const page = searchParams?.page ? parseInt(searchParams.page) : 1;

    // Fetch data for the page
    const { stayCarousel, pagination } = await getStaysData(page);

    return (
        <>
            <Header />

            <ErrorBoundary
                fallback={
                    <p className={styles.error}>Error loading hero section</p>
                }
            >
                <Suspense fallback={<Loading />}>
                    <Hero />
                </Suspense>
            </ErrorBoundary>

            <div className={styles["main"]}>
                <ErrorBoundary
                    fallback={
                        <p className={styles.error}>Error loading stays data</p>
                    }
                >
                    <Suspense fallback={<Loading />}>
                        <StayCarousel
                            key={stayCarousel.id}
                            stayCarousel={stayCarousel}
                            vertical={true}
                        />
                    </Suspense>
                </ErrorBoundary>

                {/* Client component for handling infinite scroll */}
                {pagination.hasNextPage && (
                    <InfiniteScrollLoaderClient
                        currentPage={pagination.currentPage}
                        hasNextPage={pagination.hasNextPage}
                    />
                )}

                {/* End of results message */}
                {!pagination.hasNextPage && (
                    <div className={styles["end-message"]}>
                        <p>You've seen all available stays</p>
                    </div>
                )}
            </div>
        </>
    );
}
