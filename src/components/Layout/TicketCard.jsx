import React from "react";
import { Link } from "react-router-dom";
import car from "../../images/car.png";
import "./Tickets.css";
export const TicketCard = ({ ticket }) => {
  console.log("TicketCardnow", ticket.createdAt);
  let createdAt = ticket.createdAt;
  let newDate = new Date(createdAt).toISOString().split("T")[0];

  return (
    <Link className="productCard" to={`/ticket/${ticket._id}`}>
      <img src="/car.png" />

      <p>
        <span>Ticket Status : </span> {ticket.status}
      </p>
      <div>
        <p> {ticket.tripType}</p>
      </div>
      <div>
        <span className="productCardSpan">
          Customer Name : ( {ticket.customerName} ) ({ticket._id})
        </span>
      </div>
      <span>User Message : {ticket.chats[0].text}</span>

      <span>Ticket Created : ({newDate})</span>
    </Link>
  );
};

export default TicketCard;
