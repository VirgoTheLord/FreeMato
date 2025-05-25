import React, { useState } from "react";
import "./LoginPopUp.css";
import { assets } from "../../assets/frontend_assets/assets";

const LoginPopUp = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Sign Up");
  return (
    <div className="login-popup">
      <form className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-input">
          {currState === "Login" ? (
            <></>
          ) : (
            <input type="text" placeholder="Your Name" required />
          )}

          <input type="email" placeholder="Your Email" required />
          <input type="password" placeholder="Password" required />
        </div>
        <button>{currState === "Sign Up" ? "Create Account" : "Login"}</button>
        {currState === "Sign Up" ? (
          <div className="login-popup-condition">
            <input type="checkbox" required />
            <p>
              By Continuing, I agree to the terms of use and privacy policy.
            </p>
          </div>
        ) : (
          <></>
        )}
        {currState === "Sign Up" ? (
          <p>
            Already Have an Account?{" "}
            <span onClick={() => setCurrState("Login")}>Login.</span>
          </p>
        ) : (
          <p>
            Create a new Account?{" "}
            <span onClick={() => setCurrState("Sign Up")}>Sign Up.</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopUp;
