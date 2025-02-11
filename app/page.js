import StayCard from "./components/StayCard";
import Header from "./modules/Header";
import Hero from "./modules/Hero/Hero";
import Locations from "./modules/Locations";

export default function Home() {
    return (
        <>
            <Header />
            <Hero />
            <Locations />
            <div style={{ padding: "30px 0px 200px" }}>
                <StayCard />
            </div>
        </>
    );
}
