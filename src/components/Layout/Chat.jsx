import React, { Fragment, useEffect, useState, useContext } from "react";
import "./Chat.css";
import { Loader } from "./Loader";
import "./Chat.css";
import axios from "axios";
import { Context } from "../../main";
import sendLogo from "../../images/send.png";
import Message from "./Message";
import ReactScrollToBottom from "react-scroll-to-bottom";
import closeIcon from "../../images/closeIcon.png";
import { PiChatsCircleBold } from "react-icons/pi";
import { useNavigate, useParams } from "react-router-dom";
import { getConfig } from "../../config";
import toast from "react-hot-toast";
const config = getConfig();
const token = localStorage.getItem("token");

const Chat = () => {
  const { user } = useContext(Context);
  const [chat, setChat] = useState([""]);
  const params = useParams();
  const navigate = useNavigate();
  console.log("userrrrrrrr", user);

  const send = async () => {
    const message = document.getElementById("chatInput").value;
    const ticketId = params.id;
    const isUser = false;
    let link = `${config.BACKEND_URL}/updateChatSupportSide`;

    try {
      const response = await axios.post(
        link,
        {
          message,
          ticketId,
          isUser,
        },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: "bearer " + token,
          },
        }
      );

      console.log("response.data.responseData", response);
      //setMessages(...messages, response.data.message);

      document.getElementById("chatInput").value = "";
      fetchMessages();
    } catch (error) {
      console.log(error);
    }
  };

  const resolve = async () => {
    const ticketId = params.id;
    let link = `${config.BACKEND_URL}/toCloseTickets`;

    try {
      const response = await axios.post(
        link,
        {
          ticketId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: "bearer " + token,
          },
        }
      );
      console.log(response);
      toast.success(response.data.message);
      navigate("/mytickets");
    } catch (error) {
      console.log(error);
    }
  };
  const token = localStorage.getItem("token");

  const fetchMessages = async () => {
    try {
      const ticketId = params.id;
      const isUser = false;
      let link = `${config.BACKEND_URL}/getAllSupportSideChats`;
      const response = await axios.post(
        link,
        {
          ticketId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: "bearer " + token,
          },
        }
      );

      setChat(response.data.chats);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    fetchMessages();

    const interval = setInterval(() => {
      fetchMessages();
    }, 2 * 60 * 1000);

    return () => clearInterval(interval);
  }, [params.id]);

  console.log("chat", chat);

  return (
    <div className="chatPage">
      <div className="chatContainer">
        <div className="chatHeader">
          <h2>
            Customer Support <PiChatsCircleBold />
          </h2>

          <a href="/tickets">
            {" "}
            <img src={closeIcon} alt="Close" />
          </a>
        </div>
        <ReactScrollToBottom className="chatBox">
          {chat &&
            chat.map((msg) => (
              <Message
                message={msg.text}
                classs={msg.isUser === false ? "right" : "left"}
                timing={msg.createdAt}
              />
            ))}
        </ReactScrollToBottom>
        <div className="inputBox">
          <input
            onKeyPress={(event) => (event.key === "Enter" ? send() : null)}
            type="text"
            id="chatInput"
          />
          <button onClick={send} className="sendBtn">
            <img src={sendLogo} alt="Send" />
          </button>
          <button onClick={resolve} className="resolveBtn">
            Resolve
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
