// Home Page (Server Component)
import { Suspense } from "react";
import Header from "./modules/Header";
import Hero from "./modules/Hero/Hero";
import Locations from "./modules/Locations";
import StayCarousel from "./modules/StayCarousel";
import CTASection from "./modules/CTASection";
import styles from "./Home.module.scss";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorBoundary from "./components/ErrorBoundary";
import { dummyLocationsData, dummyStaysCarouselData } from "./constants/dummy";

// Mock data to use until APIs are available
const mockLocationsData = dummyLocationsData;

const mockStaysData = dummyStaysCarouselData;

// Get server-side data
async function getHomeData() {
    try {
        // Use mock data for now
        // Simulate a short delay to mimic API fetch
        await new Promise((resolve) => setTimeout(resolve, 300));

        return {
            locationsData: mockLocationsData,
            staysData: mockStaysData,
        };

        // UNCOMMENT THIS SECTION WHEN APIS ARE READY
        /*
    // Use absolute URLs for API routes when deploying to production
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";

    const [locationsRes, staysRes] = await Promise.all([
      fetch(`${baseUrl}/api/locations`, {
          cache: "no-store",
          next: { tags: ["locationsData"] },
      }),
      fetch(`${baseUrl}/api/stays`, {
          cache: "no-store",
          next: { tags: ["staysData"] },
      }),
    ]);

    // Handle potential API errors
    if (!locationsRes.ok || !staysRes.ok) {
        throw new Error("Failed to fetch some data");
    }

    const [locationsData, staysData] = await Promise.all([
        locationsRes.json(),
        staysRes.json(),
    ]);

    return {
        locationsData,
        staysData,
    };
    */
    } catch (error) {
        console.error("Error fetching home page data:", error);
        throw error; // Let the error boundary handle it
    }
}

export default async function Home() {
    // Using mock data until APIs are available
    const { locationsData, staysData } = await getHomeData();

    return (
        <>
            <Header />
            <ErrorBoundary
                fallback={
                    <p className={styles.error}>Error loading locations data</p>
                }
            >
                <Suspense fallback={<LoadingSpinner />}>
                    <Locations data={locationsData} />
                </Suspense>
            </ErrorBoundary>

            <ErrorBoundary
                fallback={
                    <p className={styles.error}>Error loading hero section</p>
                }
            >
                <Suspense fallback={<LoadingSpinner />}>
                    <Hero />
                </Suspense>
            </ErrorBoundary>

            <div className={styles["main"]}>
                <ErrorBoundary
                    fallback={
                        <p className={styles.error}>Error loading stays data</p>
                    }
                >
                    <Suspense fallback={<LoadingSpinner />}>
                        {staysData.map((stayCarousel, index) => (
                            <StayCarousel
                                key={index}
                                stayCarousel={stayCarousel}
                            />
                        ))}
                    </Suspense>
                </ErrorBoundary>
            </div>

            <CTASection />
        </>
    );
}
