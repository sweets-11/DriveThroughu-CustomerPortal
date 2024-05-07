import React, { useContext, useState, useEffect } from "react";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { FaPencilAlt } from "react-icons/fa";
import { FaPhoneFlip } from "react-icons/fa6";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";
import { MdOutlineDateRange } from "react-icons/md";
import { FaAddressCard } from "react-icons/fa6";
import { MdPassword } from "react-icons/md";
import { getConfig } from "../../config";
const config = getConfig();
const Register = () => {
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [dob, setDob] = useState("");
  const [otp, setOtp] = useState("");
  const [address, setAddress] = useState("");
  const [verified, setVerified] = useState(false);
  const { isAuthorized, setIsAuthorized, setUser } = useContext(Context);
  const handleVerified = async (e) => {
    e.preventDefault();
    setVerified(true);
    setIsAuthorized(true);

    try {
      const { data } = await axios.post(
        `${config.BACKEND_URL}/verifyCustomerCare`,
        {
          mobileNumber,
          otp,
        },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: "bearer " + token,
          },
        }
      );
      console.log("data", data);
      toast.success(data.message);
      setIsAuthorized(true);
      setName("");
      setEmail("");
      setDob("");
      setMobileNumber("");
      setAddress("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    setShowOtpInput(true);

    try {
      const { data } = await axios.post(
        `${config.BACKEND_URL}/signup`,
        {
          mobileNumber,
          dob,
          email,
          address,
          fullName,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setUser(data.customer);
      toast.success(data.message);
      localStorage.setItem("token", data.token);
      setIsAuthorized(true);
      setToken(data.token);
      setName("");
      setEmail("");
      setDob("");
      setMobileNumber("");
      setAddress("");
    } catch (error) {
      console.log(error);
    }
  };
  console.log("isAuthorized && verified", isAuthorized, verified);
  if (isAuthorized && verified) {
    return <Navigate to={"/"} />;
  }
  return (
    <>
      <section className="authPage">
        <div className="container">
          <div className="Registerheader">
            <h4>Create a new account</h4>
          </div>
          <div className="Registerheader">
            <img src="/Coronavirus Delivery Preventions-amico.png" alt="logo" />
          </div>
          {!showOtpInput ? (
            <form className="registerForm" onSubmit={handleRegister}>
              <div className="inputTag">
                <label>FullName</label>
                <div>
                  <input
                    type="text"
                    placeholder="Rishabh"
                    value={fullName}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <FaPencilAlt />
                </div>
              </div>
              <div className="inputTag">
                <label>Email Address</label>
                <div>
                  <input
                    type="email"
                    placeholder="zipcart@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <MdOutlineMailOutline />
                </div>
              </div>
              <div className="inputTag">
                <label>Phone Number</label>
                <div>
                  <input
                    type="number"
                    placeholder="+919111818196"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                  />
                  <FaPhoneFlip />
                </div>
              </div>
              <div className="inputTag">
                <label>Date of Birth</label>
                <div>
                  <input
                    type="Date"
                    placeholder="Your DOB"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                  />
                  <MdOutlineDateRange />
                </div>
              </div>
              <div className="inputTag">
                <label>Address</label>
                <div>
                  <input
                    type="text"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <FaAddressCard />
                </div>
              </div>
              <button type="submit">Register</button>
              <Link to={"/login"}>Login Now</Link>
            </form>
          ) : (
            <form className="registerForm" onSubmit={handleVerified}>
              <div className="inputTag">
                <p>
                  <b>Enter Your One Time Password</b>{" "}
                </p>
                <div className="inpurTag">
                  <input
                    type="text"
                    placeholder="Enter otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                  <MdPassword />
                </div>

                <button className="otpButton" type="submit">
                  Verify
                </button>
                <br />
                <br />
                <br />
              </div>
            </form>
          )}
        </div>
        <div className="banner">
          <img className="registerBanner" src="/Contact.gif" alt="login" />
        </div>
        <div className="banner2">
          <span>
            <h2>Welcome to ZipCart Support</h2>
          </span>
        </div>
        <div className="banner3">
          <h6 className="Quote">
            We’re here to help. Looking for customer service contact
            information? Explore support resources for the relevant products
            below to find the best way to reach out about your issue.
          </h6>
        </div>
      </section>
    </>
  );
};

export default Register;
