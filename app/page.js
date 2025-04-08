import Header from "./modules/Header";
import Hero from "./modules/Hero/Hero";
import Locations from "./modules/Locations";
import StayCarousel from "./modules/StayCarousel";

import styles from "./Home.module.scss";
import CTASection from "./modules/CTASection";
import FooterWithoutTabs from "./modules/Footer/FooterWithoutTabs";

export default async function Home() {
    let availableCategories = [];

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASEURL}/search/home`,
            {
                next: { revalidate: 3600 },
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            }
        );

        const result = await response.json();
        console.log("Response from server:", result);

        availableCategories = result.data;
        console.log("Available categories:", availableCategories);
    } catch (error) {
        console.error("Failed to fetch stays:", error);
        // Return null or error state
        return <div>Failed to load stays</div>;
    }

    return (
        <>
            <Header />
            <Locations />
            <Hero />

            <div className={styles["main"]}>
                {availableCategories.map((category) => (
                    <StayCarousel key={category._id} category={category} />
                ))}
            </div>

            <CTASection />
            <FooterWithoutTabs />
        </>
    );
}
