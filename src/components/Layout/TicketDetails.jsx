import React, { Fragment, useEffect, useContext, useState } from "react";
import "./TicketDetails.css";
import axios from "axios";
import { Context } from "../../main";
import { useParams } from "react-router-dom";
import { Loader } from "./Loader";
import { Navigate, Link } from "react-router-dom";
import { getConfig } from "../../config";
const config = getConfig();
const TicketDetails = ({ props }) => {
  const params = useParams();

  const { isAuthorized } = useContext(Context);
  const [ticketDetails, setTicketDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  function formatDate(dateString) {
    const date = new Date(dateString);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }

  const fetchTicketDetail = async () => {
    try {
      const response = await axios.post(
        `${config.BACKEND_URL}/getTicket`,
        {
          ticketId: params.id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: "bearer " + token,
          },
        }
      );

      setTicketDetails(response.data.ticket);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTicketDetail();
  }, []);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          {console.log("details", ticketDetails)}
          <div className="ProductDetails">
            <div>
              <img className="CarouselImage" src={"/car.png"} alt={`Slide`} />
            </div>

            <div>
              <div className="detailsBlock-1">
                <span>Support Ticket Type : </span>
                <div>
                  <h2>{ticketDetails.tripType}</h2>
                </div>
              </div>
              <div className="detailsBlock-1">
                <p>Ticket #ID {ticketDetails._id}</p>
              </div>
              <div className="detailsBlock-2">
                <span className="detailsBlock-1">
                  {"Customer Name : "}({ticketDetails.customerName} )
                </span>
              </div>
              <div className="detailsBlock-2">
                <span className="detailsBlock-1">{"Customer Id : "}</span>
                <p>{ticketDetails.customerId}</p>
                {/* <p>  {ticketDetails.customer.customerId}</p> */}
              </div>
              <div className="detailsBlock-2">
                <span className="detailsBlock-1">{"Ticket Created On : "}</span>
                <p> {formatDate(ticketDetails.createdAt)}</p>
              </div>
              <div className="detailsBlock-2">
                <span className="detailsBlock-1">{"Customer Message : "}</span>
                <p> {`${ticketDetails.chats[0].text}`}</p>
              </div>
              <div className="detailsBlock-2">
                <span className="detailsBlock-1">Ticket Current Status:</span>
                <p> {ticketDetails.status}</p>
              </div>

              <button className="submitReview">
                <Link className="chatbtn" to={`/chat/${ticketDetails._id}`}>
                  Chat
                </Link>
              </button>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default TicketDetails;
