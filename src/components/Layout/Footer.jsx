import React, { useContext } from "react";
import { Context } from "../../main";
import { Link } from "react-router-dom";
import { FaFacebookF, FaYoutube, FaLinkedin } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

export const Footer = () => {
  const { isAuthorized } = useContext(Context);

  return (
    <footer className={isAuthorized ? "footerShow" : "footerHide"}>
      <div>&copy; All Rights Reserved By Technoid LLC USA .</div>
      <div className="logofooter">
        <img src="/logo-no-background.png" alt="logo" />
      </div>
      <div>
        <Link to={""} target="_blank">
          <FaFacebookF />
        </Link>
        <Link to={""} target="_blank">
          <FaYoutube />
        </Link>
        <Link to={""} target="_blank">
          <FaLinkedin />
        </Link>
        <Link to={""} target="_blank">
          <RiInstagramFill />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;