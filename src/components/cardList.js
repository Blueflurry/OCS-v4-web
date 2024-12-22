import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import ReactPaginate from "react-paginate";

import Card from "./card";
import { useParams, useSearchParams } from "react-router-dom";

function CardList() {
    const { location } = useParams();
    const [searchParams] = useSearchParams();
    const guests = +searchParams.get("guests");

    const itemsPerPage = 9;
    const [loading, setLoading] = useState(false);
    const [itemOffset, setItemOffset] = useState(0);
    const [currentItems, setCurrentItems] = useState([]);
    const [filteredVillas, setFilteredVillas] = useState([]); // To store filtered data
    const [pageCount, setPageCount] = useState(0); // To store filtered data

    // Calculate the end offset and page count dynamically
    const endOffset = itemOffset + itemsPerPage;

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const fileName = !location ? "all" : location;
            const importedData = (await import(`../locations/data_${fileName}.js`)).default;

            console.log(fileName, importedData);

            const guestFilter = guests && guests !== "" ? +guests : 2;
            const newFilteredVillas = importedData.filter((villa) => +villa.guests >= guestFilter);

            setPageCount(Math.ceil(newFilteredVillas.length / itemsPerPage));
            setFilteredVillas(newFilteredVillas);
        }
        fetchData();
    }, [guests, location]);

    // Update current items whenever filteredVillas or itemOffset changes
    useEffect(() => {
        setCurrentItems(filteredVillas.slice(itemOffset, endOffset));
        setTimeout(() => setLoading(false), 1000);
    }, [filteredVillas, itemOffset, endOffset]);

    const handlePageClick = (event) => {
        setLoading(true);
        const newOffset = event.selected * itemsPerPage;
        setItemOffset(newOffset);
    };

    return (
        <>
            {currentItems.length > 0 && <p className="results">Showing {filteredVillas.length} results</p>}
            <div className="card-grid">
                {!loading && (
                    <>{currentItems.length > 0 ? currentItems.map((villa, i) => <Card villa={villa} key={i} />) : <p>No villas found.</p>}</>
                )}

                {loading && (
                    <>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((key) => (
                            <>
                                <Skeleton width={360} height={300} />
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
        </>
    );
}

export default CardList;
