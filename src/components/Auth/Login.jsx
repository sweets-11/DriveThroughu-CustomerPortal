import React, { useContext, useState } from "react";
import { RiLock2Fill } from "react-icons/ri";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";
import { getConfig } from "../../config";
const config = getConfig();

const Login = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const { isAuthorized, setIsAuthorized, setUser } = useContext(Context);
  const [otp, setOtp] = useState("");

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
      setMobileNumber("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setShowOtpInput(true);
    setIsAuthorized(true);
    try {
      const { data } = await axios.post(
        `${config.BACKEND_URL}/login`,
        {
          mobileNumber,
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
      setToken(data.token);
      setMobileNumber("");
    } catch (error) {
      console.log(error);
    }
  };
  if (isAuthorized && verified) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <section className="authPage">
        <div className="container">
          <div className="header">
            <img src="/Delivery address-pana.png" alt="logo" />
          </div>
          <div className="header">
            <h3>Login to your account</h3>
          </div>
          {!showOtpInput ? (
            <form onSubmit={handleLogin}>
              <div className="inputTag">
                <label>Mobile Number</label>
                <div>
                  <input
                    type="text"
                    placeholder="Your Phone Number"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                  />
                  <RiLock2Fill />
                </div>
              </div>
              <button type="submit">Login</button>
              <Link to={"/register"}>Register Now</Link>
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
                  <RiLock2Fill />
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
          <img
            className="bannerImage"
            src="/Data report-cuate.png"
            alt="login"
          />
          <h5>
            <b>Welcome to Zipcart Support Care</b>
          </h5>
        </div>
        <div className="banner">
          <img src="/Contact us-pana.png" alt="login" />
        </div>
      </section>
    </>
  );
};

export default Login;
