import Header from "./modules/Header";
import Hero from "./modules/Hero/Hero";
import Locations from "./modules/Locations";
import StayCarousel from "./modules/StayCarousel";

export default function Home() {
    return (
        <>
            <Header />
            <Hero />
            <Locations />
            <StayCarousel />
        </>
    );
}
