import Header from "./modules/Header";
import Hero from "./modules/Hero/Hero";
import Locations from "./modules/Locations";
import StayCarousel from "./modules/StayCarousel";
// import { availableCategories } from "./services/mockData";

import styles from "./Home.module.scss";
import CTASection from "./modules/CTASection";
import FooterWithoutTabs from "./modules/Footer/FooterWithoutTabs";
import axios from "@/app/services/axios";

export default async function Home() {
    let availableCategories = [];

    try {
        const result = await axios.get(`/search/home`);
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

            {/* <div>
                <iframe
                    src={
                        "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d28011.676449949693!2d77.1879552!3d28.6459555!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d029ea9c0b709%3A0x7cae20c190b1766f!2sHotel%20Emperor%20Palms%20Karol%20Bagh!5e0!3m2!1sen!2sin!4v1733312409536!5m2!1sen!2sin"
                    }
                    width="100%"
                    height={400}
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={"Google Maps"}
                ></iframe>
            </div> */}
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
