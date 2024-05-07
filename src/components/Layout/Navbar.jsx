import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";
import { Navigate } from "react-router-dom";

import { FaSearch, FaSignInAlt, FaUser } from "react-icons/fa";
import { getConfig } from "../../config";
const config = getConfig();
export const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  const handleAboutUs = () => {
    navigateTo("/aboutus");
  };
  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`${config.BACKEND_URL}/logout`);
      toast.success(response.data.message);
      setIsAuthorized(false);
      localStorage.removeItem("token");
      return <Navigate to={"/login"} />;
    } catch (error) {
      console.log(error);
      setIsAuthorized(true);
    }
  };
  // if (!isAuthorized) {
  //   return <Navigate to={"/login"} />;
  // }
  {
    console.log("Navbar User", user);
  }
  return (
    <nav className={isAuthorized ? "navbarShow" : "navbarHide"}>
      <div className="container">
        <div className="logo">
          <img
            onClick={handleAboutUs}
            src="/logo-no-background.png"
            alt="logo"
          />
        </div>
        <ul className={!show ? "menu" : "show-menu menu"}>
          <li>
            <Link to={"/"} onClick={() => setShow(true)}>
              HOME
            </Link>
          </li>
          <li>
            <Link to={"/search"} onClick={() => setShow(false)}>
              <FaSearch />
            </Link>
          </li>
          <li>
            <Link to={"/tickets"} onClick={() => setShow(false)}>
              ALL TICKETS
            </Link>
          </li>
          <li>
            <Link to={""} onClick={() => setShow(false)}>
              {user?._id ? (
                <>
                  <p>{user.fullName}</p>
                </>
              ) : (
                <></>
              )}
            </Link>
          </li>
          <li>
            <Link to={"/assignedTickets"} onClick={() => setShow(false)}>
              Assigned TICKETS
            </Link>
          </li>
          <li>
            <Link to={"/mytickets"} onClick={() => setShow(false)}>
              Completed TICKETS
            </Link>
          </li>

          {!user?.id ? (
            <>
              <button onClick={handleLogout}>LOGOUT</button>
            </>
          ) : (
            <></>
          )}
        </ul>
        <div className="hamburger">
          <GiHamburgerMenu onClick={() => setShow(false)} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
