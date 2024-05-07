import React, { useContext, useEffect } from "react";
import "./App.css";
import { Context } from "./main";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import MyAssignedTickets from "./components/Layout/MyAssignedTickets";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import Home from "./components/Home/Home";
import Search from "./components/Home/Search";
import NotFound from "./components/NotFound/NotFound";
import TicketDetails from "./components/Layout/TicketDetails";
import Tickets from "./components/Layout/Tickets";
import Chat from "./components/Layout/Chat";
import HeroSection from "./components/Home/HeroSection";
import MyTickets from "./components/Home/MyTickets";
import { getConfig } from "./config";
const config = getConfig();
const App = () => {
  const token = localStorage.getItem("token");
  console.log("local storge token", token);
  const { isAuthorized, setIsAuthorized, setUser, user } = useContext(Context);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${config.BACKEND_URL}/getuser`, {
          headers: {
            "Content-Type": "application/json",
            authorization: "bearer " + token,
          },
        });

        console.log("user", response.data);
        setUser(response.data.customer);
        setIsAuthorized(true);
      } catch (error) {
        setIsAuthorized(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route exact path="/ticket/:id" element={<TicketDetails />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/assignedTickets" element={<MyAssignedTickets />} />
          <Route path="/tickets" element={<MyTickets />} />
          <Route path="/tickets/:keyword" element={<MyTickets />} />
          <Route exact path="/chat/:id" element={<Chat />} />
          <Route path="/aboutus" element={<HeroSection />} />
          <Route path="/mytickets" element={<Tickets />} />
        </Routes>
        <Footer />
        <Toaster />
      </BrowserRouter>
    </>
  );
};

export default App;
