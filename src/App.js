import { useRef, useState } from "react";
import { Routes, Route, useNavigate, useParams, useSearchParams } from "react-router-dom";
import CardList from "./components/cardList";

import logoImage from "./assets/images/oneclickstays.svg";
import easyBooking from "./assets/images/easy.png";
import lowestPrice from "./assets/images/reduce-cost.png";
import hotDeals from "./assets/images/hot-sale.png";
import support from "./assets/images/customer-service.png";
import stars from "./assets/images/stars.png";
import signature from "./assets/images/signature.svg";

function App() {
    const navigate = useNavigate();
    const { location } = useParams();
    const [searchParams] = useSearchParams();
    const guests = searchParams.get("guests");

    const [formData, setFormData] = useState({
        city: location,
        checkInDate: "",
        checkOutDate: "",
        guests: guests && guests !== "" ? +guests : 2,
    });

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const villaHeadingRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`${formData.city}?guests=${formData.guests}`);
        if (villaHeadingRef.current) {
            villaHeadingRef.current.scrollIntoView({
                behavior: "smooth", // Enables smooth scrolling
                block: "start", // Aligns the element at the top
            });
        }
    };

    return (
        <div className="App">
            <div className="hero">
                <img src={logoImage} alt="OneClick Stays" className="hero__image--logo" />
                <h1 className="hero__title">
                    India’s{" "}
                    <span>
                        1<sup>st</sup> Intelligent
                    </span>{" "}
                    Booking Platform
                </h1>
                <p className="hero__desc">
                    We redefine how you plan your stay. With intelligent booking and seamless access to the best stay options and services, OneClick
                    Stays ensures comfort and convenience at your fingertips.
                </p>

                <img src={signature} alt="" className="signature" />

                <div className="pills">
                    <div className="pill">Manual Search</div>
                    <div className="pill disabled">
                        <img src={stars} alt="AI" />
                        AI Search (Coming Soon)
                    </div>
                </div>
                <div className="form">
                    <form onSubmit={handleSubmit}>
                        {/* City Selection */}
                        <div>
                            <label htmlFor="city">Location</label>
                            <select id="city" name="city" value={formData.city} onChange={handleChange}>
                                <option value="">Select Location</option>
                                <optgroup label="Indonesia">
                                    <option value="bali">Bali (93 Stays)</option>
                                </optgroup>
                                <optgroup label="Thailand">
                                    <option value="phuket">Phuket (41 Stays)</option>
                                    <option value="koh_samui">Koh Samui (13 Stays)</option>
                                </optgroup>
                                <optgroup label="India">
                                    <option value="goa">Goa (155 Stays)</option>
                                    <option value="alibaug">Alibaug (17 Stays)</option>
                                    <option value="jaipur">Jaipur (1 Stays)</option>
                                    <option value="udaipur">Udaipur (12 Stays)</option>
                                </optgroup>
                                <optgroup label="Maldives">
                                    <option value="maldives">Maldives (8 Stays)</option>
                                </optgroup>
                            </select>
                        </div>
                        {/* Check-in Date */}
                        <div>
                            <label htmlFor="checkInDate">Check-in Date</label>
                            <input id="checkInDate" name="checkInDate" type="date" value={formData.checkInDate} onChange={handleChange} />
                        </div>
                        {/* Check-out Date */}
                        <div>
                            <label htmlFor="checkOutDate">Check-out Date</label>
                            <input id="checkOutDate" name="checkOutDate" type="date" value={formData.checkOutDate} onChange={handleChange} />
                        </div>
                        {/* Number of Guests */}
                        <div>
                            <label htmlFor="guests">Number of Guests</label>
                            <input id="guests" name="guests" type="number" value={formData.guests} onChange={handleChange} />
                        </div>
                        {/* Submit Button */}
                        <div>
                            <button type="submit">Search</button>
                        </div>
                    </form>
                </div>
            </div>
            <h2 className="services__heading">Why book with us?</h2>
            <div className="services">
                <div className="services__card">
                    <img src={easyBooking} alt="Easy Booking Icon" className="services__card--icon" />
                    <h4 className="services__card--title">Easy Booking</h4>
                    <p className="services__card--desc">We offer easy and convenient stay bookings with attractive offers.</p>
                </div>
                <div className="services__card">
                    <img src={lowestPrice} alt="Easy Booking Icon" className="services__card--icon" />
                    <h4 className="services__card--title">Lowest Price</h4>
                    <p className="services__card--desc">We guarantee lowest price on all stays, if you find a lower price we will match it!</p>
                </div>
                <div className="services__card">
                    <img src={hotDeals} alt="Easy Booking Icon" className="services__card--icon" />
                    <h4 className="services__card--title">Exciting Deals</h4>
                    <p className="services__card--desc">Enjoy exiting offers on Stays, Flights, Car Rentals, Clubs and much more!</p>
                </div>
                <div className="services__card">
                    <img src={support} alt="Easy Booking Icon" className="services__card--icon" />
                    <h4 className="services__card--title">Easy Booking</h4>
                    <p className="services__card--desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, sunt!</p>
                </div>
            </div>
            <h2 className="villas__heading" ref={villaHeadingRef}>
                Available Stay Options
            </h2>
            <Routes>
                <Route path="/" element={<CardList />} />
                <Route path=":location" element={<CardList />} />
            </Routes>
        </div>
    );
}

export default App;
