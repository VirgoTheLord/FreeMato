import React from "react";
import "./Footer.css";
import { assets } from "../../assets/frontend_assets/assets";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa"; // Import react-icons for GitHub, LinkedIn, and Instagram

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="Logo" />
          <p>
            FreeMato is your premier online restaurant, offering top-of-the-line
            dining experiences with fast and reliable delivery. Enjoy a curated
            menu of gourmet dishes, crafted with the finest ingredients,
            delivered straight to your door.
          </p>
          <div className="footer-social-icons">
            <a
              href="https://github.com/VirgoTheLord"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className="social-icon" size={25} />
            </a>
            <a
              href="https://www.linkedin.com/in/alwin-aby-mathew/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="social-icon" size={25} />
            </a>
            <a
              href="https://instagram.com/alwx.n"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="social-icon" size={25} />
            </a>
          </div>
        </div>
        <div className="footer-content-center">
          <h2>Company</h2>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>Get in Touch</h2>
          <ul>
            <li>+91 9947581345</li>
            <li>alwinabyofficial@gmail.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright 2025 @ AlwXn - All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
