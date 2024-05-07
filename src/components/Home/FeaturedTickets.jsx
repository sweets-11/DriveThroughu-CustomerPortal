import { Button } from "@mui/material";
import React, { Fragment, useContext, useState, useEffect } from "react";
import axios from "axios";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import Loader from "../Layout/Loader";
import TicketCard from "../Layout/TicketCard";
import { Context } from "../../main";

import { Navigate } from "react-router-dom";
import { getConfig } from "../../config";
const config = getConfig();
export const FeaturedTickets = () => {
  const { isAuthorized } = useContext(Context);

  const [loading, setLoading] = useState(true);

  const [tickets, setTickets] = useState([]);

  const token = localStorage.getItem("token");
  const fetchTickets = async () => {
    try {
      const response = await axios.post(
        `${config.BACKEND_URL}/featuredTickets`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            authorization: "bearer " + token,
          },
        }
      );

      console.log("response.data.responseData", response.data);
      console.log("token", token);
      setTickets(response.data.ticket);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  if (!isAuthorized) {
    return <Navigate to={"/"} />;
  }
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="featuredBanner">
            <p>Welcome to Drive Thru</p>
            <h1>FIND ALL SUPPORT BELOW</h1>

            <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>

          <h2 className="homeHeading">Featured Tickets</h2>

          <div className="homecontainer" id="container">
            {tickets &&
              tickets.map((Ticket) => (
                <TicketCard key={Ticket._id} ticket={Ticket} />
              ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default FeaturedTickets;
