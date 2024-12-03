import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Card from "./components/card";

import villas from "./data/villas";
import cities from "./data/cities";

import logoImage from "./assets/images/oneclickstays.svg";
import Skeleton from "react-loading-skeleton";

function App() {
    const itemsPerPage = 9;
    const [loading, setLoading] = useState(false);
    const [itemOffset, setItemOffset] = useState(0);
    const [currentItems, setCurrentItems] = useState([]);
    const [filteredVillas, setFilteredVillas] = useState(villas); // To store filtered data
    const [formData, setFormData] = useState({
        city: "",
        checkInDate: "",
        checkOutDate: "",
        guests: 2,
    });

    // Calculate the end offset and page count dynamically
    const endOffset = itemOffset + itemsPerPage;
    const pageCount = Math.ceil(filteredVillas.length / itemsPerPage);

    const handlePageClick = (event) => {
        setLoading(true);
        const newOffset = event.selected * itemsPerPage;
        setItemOffset(newOffset);
    };

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // Filter villas based on formData
        const newFilteredVillas = villas.filter(
            (villa) => villa.location.toLowerCase().includes(formData.city.toLowerCase()) && +villa.guests >= +formData.guests
        );

        setFilteredVillas(newFilteredVillas);
        setItemOffset(0); // Reset offset for new filtered results

        // Reset form fields
        // setFormData({
        //     city: "",
        //     checkInDate: "",
        //     checkOutDate: "",
        //     guests: "",
        // });
    };

    // Update current items whenever filteredVillas or itemOffset changes
    useEffect(() => {
        setCurrentItems(filteredVillas.slice(itemOffset, endOffset));
        setTimeout(() => setLoading(false), 2000);
    }, [filteredVillas, itemOffset, endOffset]);

    return (
        <div className="App">
            <div className="hero">
                <img src={logoImage} alt="OneClick Stays" className="hero__image--logo" />
                <h1 className="hero__title">Affordable luxury stays hand-picked for your leisure.</h1>

                <div className="form">
                    <form onSubmit={handleSubmit}>
                        {/* City Selection */}
                        <div>
                            <label htmlFor="city">City</label>
                            <select id="city" name="city" value={formData.city} onChange={handleChange}>
                                <option value="">Select City</option>
                                <optgroup label="Goa">
                                    {cities.map((city) => (
                                        <option key={city} value={city}>
                                            {city}
                                        </option>
                                    ))}
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

                        <p className="results">Showing {filteredVillas.length} results</p>
                    </form>
                </div>
            </div>
            <div className="card-grid">
                {!loading && (
                    <>
                        {currentItems.length > 0 ? (
                            currentItems.map((villa, i) => <Card villa={villa} form={formData} key={i} />)
                        ) : (
                            <p>No villas found.</p>
                        )}
                    </>
                )}

                {loading && (
                    <>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((key) => (
                            <>
                                <Skeleton height={300} />
                                <Skeleton width={300} />
                                <Skeleton width={200} />
                                <Skeleton count={3} />
                            </>
                        ))}
                    </>
                )}
            </div>

            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={1}
                pageCount={pageCount}
                previousLabel="< prev"
                renderOnZeroPageCount={null}
                className="pagination"
                marginPagesDisplayed={1}
            />
        </div>
    );
}

export default App;
