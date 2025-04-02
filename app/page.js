import Header from "./modules/Header";
import Hero from "./modules/Hero/Hero";
import Locations from "./modules/Locations";
import StayCarousel from "./modules/StayCarousel";
import { availableCategories } from "./services/mockData";

import styles from "./Home.module.scss";
import CTASection from "./modules/CTASection";

export default function Home() {
    return (
        <>
            <Header />
            <Locations />
            <Hero />
            <div className={styles["main"]}>
                {availableCategories.map((category) => (
                    <StayCarousel key={category} category={category} />
                ))}
            </div>
            <CTASection />
        </>
    );
}
