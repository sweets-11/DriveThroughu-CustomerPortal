import React from "react";
import "./Message.css";

function formatDate(dateString) {
  const date = new Date(dateString);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}
const Message = ({ message, classs, timing }) => {
  if (message && classs == "left") {
    return (
      <div className={`messageBox ${classs}`}>
        {`${"Customer"}: ${message}`}
        <div className="messageTime">{`${formatDate(timing)}`}</div>
      </div>
    );
  } else {
    return (
      <div className={`messageBox ${classs}`}>
        {`You: ${message}`}
        <div className="messageTime">{`${formatDate(timing)}`}</div>
      </div>
    );
  }
};

export default Message;
