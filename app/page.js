import StayCard from "./components/StayCard";
import Header from "./modules/Header";
import Hero from "./modules/Hero/Hero";
import Locations from "./modules/Locations";

export default function Home() {
    return (
        <>
            <Header />
            <Hero />
            <div style={{ padding: "30px 20px 280px" }}>
                <StayCard />
            </div>
            <Locations />
        </>
    );
}
