import Header from "./modules/Header";
import Hero from "./modules/Hero/Hero";
import Locations from "./modules/Locations";
import StayCarousel from "./modules/StayCarousel";

import styles from "./Home.module.scss";
import CTASection from "./modules/CTASection";
import FooterWithoutTabs from "./modules/Footer/FooterWithoutTabs";
import { fetchHomePageStays } from "./services/staysService";

export default async function Home() {
    let availableCategories = [];

    try {
        const result = await fetchHomePageStays();
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
