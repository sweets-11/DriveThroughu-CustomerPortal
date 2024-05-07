import React, { Fragment, useContext, useState, useEffect } from "react";
import TicketCard from "../Layout/TicketCard";
import "./Tickets.css";
import Pagination from "react-js-pagination";
import Slider from "@mui/material/Slider";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Loader } from "./Loader";
import Typography from "@mui/material/Typography";
import { getConfig } from "../../config";
const config = getConfig();
const MyAssignedTickets = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);

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
  const token = localStorage.getItem("token");

  const fetchTickets = async (keyword = "") => {
    let link = `${config.BACKEND_URL}/myAssignedTickets`;

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
      setTickets(response.data.ticket);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTickets(keyword);
  }, [keyword, category, currentPage]);

  console.log("data", tickets);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <h2 className="productsHeading">Assigned Tickets</h2>

          <div className="products">
            {tickets &&
              tickets.map((ticket) => (
                <TicketCard key={ticket.id} ticket={ticket} />
              ))}
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

export default MyAssignedTickets;
