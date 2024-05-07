import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { Context } from "../../main";
import { Navigate } from "react-router-dom";
import HeroSection from "./HeroSection";
import FeaturedTickets from "./FeaturedTickets";

const Home = () => {
  const { isAuthorized } = useContext(Context);

  console.log("isAuthorized", isAuthorized);

  if (!isAuthorized) {
    return <Navigate to={"/login"} />;
  }
  return (
    <>
      <section className="homePage page">
        {/* <HeroSection /> */}

        <FeaturedTickets />
      </section>
    </>
  );
};

export default Home;
