import React, { Fragment, useContext, useState, useEffect } from "react";
import Pagination from "react-js-pagination";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Loader } from "../Layout/Loader";
import Typography from "@mui/material/Typography";
import TicketTable from "./TicketTable";
import { getConfig } from "../../config";
import "./TicketTable.css";
const config = getConfig();
const token = localStorage.getItem("token");

const MyTickets = () => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [category, setCategory] = useState("");
    const [loading, setLoading] = useState(true);
    const [searchKeyword, setSearchKeyword] = useState("");
    const searchSubmitHandler = (e) => {
        e.preventDefault();
        console.log("key", searchKeyword);
        if (searchKeyword.trim()) {
            navigate(`/tickets/${searchKeyword}`);
        } else {
            navigate("/tickets`");
        }
    };
    const params = useParams();

    const categories = [
        "Grocery Delivery",
        "Send Parcel",
        "Receive Parcel",
        "Car Rent",
    ];

    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
    };

    const count = 20;

    const resultPerPage = 8;

    const keyword = params.keyword;

    const [tickets, setTickets] = useState([]);

    const fetchTickets = async (keyword = "") => {
        let link = `${config.BACKEND_URL}/getAllSupportTickets?keyword=${keyword}&page=${currentPage}`;

        if (category) {
            link = `${config.BACKEND_URL}/getAllSupportTickets?keyword=${keyword}&page=${currentPage}&tripType=${category}`;
        }

        try {
            const response = await axios.post(
                link,
                {},
                {
                    headers: {
                        "Content-Type": "application/json",
                        authorization: "bearer " + token,
                    },
                }
            );

            console.log("response.data.responseData", response);
            setTickets(response.data.filterTickets);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchTickets(keyword);
    }, [keyword, category, currentPage]);

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <h2 className="productsHeading">Tickets</h2>
                    <div className="App">
                        <TicketTable data={tickets} />
                    </div>

                    <div>
                        <div className="filterBox">
                            <fieldset>
                                <Typography component="legend">Tickets Categories</Typography>
                                <ul className="categoryBox">
                                    {categories.map((category) => (
                                        <li
                                            className="category-link"
                                            key={category}
                                            onClick={() => setCategory(category)}
                                        >
                                            {category}
                                        </li>
                                    ))}
                                </ul>
                            </fieldset>
                        </div>
                    </div>
                    <div>
                        <form className="filterBoxSearch" onSubmit={searchSubmitHandler}>
                            <input
                                type="text"
                                placeholder="Search..."
                                onChange={(e) => setSearchKeyword(e.target.value)}
                            />
                            <input type="submit" value="Search" />
                        </form>
                    </div>

                    {resultPerPage < count && (
                        <div className="paginationBox">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={8}
                                totalItemsCount={count}
                                onChange={setCurrentPageNo}
                                nextPageText="Next"
                                prevPageText="Prev"
                                firstPageText="1st"
                                lastPageText="Last"
                                itemClass="page-item"
                                linkClass="page-link"
                                activeClass="pageItemActive"
                                activeLinkClass="pageLinkActive"
                            />
                        </div>
                    )}
                </Fragment>
            )}
        </Fragment>
    );
};

export default MyTickets;
